"""Genera los manuales editables a partir de los Markdown de docs."""
import os
import re
import sys
from pathlib import Path
from zipfile import ZipFile

from docx import Document
from docx.enum.style import WD_STYLE_TYPE
from docx.enum.table import WD_TABLE_ALIGNMENT, WD_CELL_VERTICAL_ALIGNMENT
from docx.enum.text import WD_ALIGN_PARAGRAPH, WD_TAB_ALIGNMENT
from docx.oxml import OxmlElement
from docx.oxml.ns import qn
from docx.opc.constants import RELATIONSHIP_TYPE
from docx.shared import Inches, Pt, RGBColor
from lxml import etree
from PIL import Image

DOCS = Path(__file__).resolve().parents[1]
WORD = DOCS / "entregables" / "word"
INK, NAVY, MUTED = "20222A", "2B2D6E", "515A70"
FILES = {
    "manual-tecnico": ("Manual_Tecnico_Leo_y_Escribo", "Desarrollo y mantenimiento"),
    "manual-usuario": ("Manual_Usuario_Leo_y_Escribo", "Docentes, estudiantes y familias"),
    "manual-administrador": ("Manual_Administrador_Leo_y_Escribo", "Gestión escolar y continuidad"),
    "guia-rapida-estudiantes": ("Guia_Rapida_Estudiantes", "Guía rápida para estudiantes"),
}
FIGURE = re.compile(r"^!\[([^]]+)\]\(([^)]+)\)$")
INLINE = re.compile(r"(\[[^]]+\]\([^)]+\)|\*\*[^*]+\*\*|\*[^*]+\*|\x60[^\x60]+\x60)")
LINK = re.compile(r"^\[([^]]+)\]\(([^)]+)\)$")


def element(name, **attrs):
    node = OxmlElement("w:" + name)
    for key, value in attrs.items():
        node.set(qn("w:" + key), str(value))
    return node


def color(value):
    return RGBColor.from_string(value)


def style(doc, name, font, points, ink=INK, bold=False):
    styles = doc.styles
    if name not in styles:
        styles.add_style(name, WD_STYLE_TYPE.PARAGRAPH)
    model = styles[name]
    model.font.name = font
    model.font.size = Pt(points)
    model.font.color.rgb = color(ink)
    model.font.bold = bold
    props = model.element.get_or_add_rPr()
    props.append(element("lang", val="es-GT"))
    for attr in ("asciiTheme", "hAnsiTheme", "eastAsiaTheme", "cstheme"):
        props.rFonts.attrib.pop(qn("w:" + attr), None)
    if name == "Title":
        pprops = model.element.get_or_add_pPr()
        for border in pprops.findall(qn("w:pBdr")):
            pprops.remove(border)
    return model.paragraph_format


def field(paragraph, instruction):
    paragraph.add_run()._r.append(element("fldChar", fldCharType="begin"))
    text = element("instrText")
    text.set("{http://www.w3.org/XML/1998/namespace}space", "preserve")
    text.text = f" {instruction} "
    paragraph.add_run()._r.append(text)
    paragraph.add_run()._r.append(element("fldChar", fldCharType="separate"))
    paragraph.add_run(" ")
    paragraph.add_run()._r.append(element("fldChar", fldCharType="end"))


def hyperlink(paragraph, label, target):
    if not re.match(r"^https?://", target):
        target = os.path.relpath(DOCS / target, WORD).replace(os.sep, "/")
    rel = paragraph.part.relate_to(target, RELATIONSHIP_TYPE.HYPERLINK, is_external=True)
    link = element("hyperlink")
    link.set(qn("r:id"), rel)
    run = element("r")
    props = element("rPr")
    props.append(element("color", val=NAVY))
    props.append(element("u", val="single"))
    run.append(props)
    text = element("t")
    text.text = label
    run.append(text)
    link.append(run)
    paragraph._p.append(link)


def add_inline(paragraph, value):
    for part in INLINE.split(value):
        if not part:
            continue
        match = LINK.match(part)
        if match:
            hyperlink(paragraph, *match.groups())
        elif part.startswith("**") and part.endswith("**"):
            paragraph.add_run(part[2:-2]).bold = True
        elif part.startswith("*") and part.endswith("*"):
            paragraph.add_run(part[1:-1]).italic = True
        elif part.startswith(chr(96)) and part.endswith(chr(96)):
            run = paragraph.add_run(part[1:-1])
            run.font.name = "Consolas"
            run.font.size = Pt(10)
        else:
            paragraph.add_run(part)


def paragraph(parent, value, name=None):
    p = parent.add_paragraph(style=name)
    add_inline(p, value)
    return p


def setup(doc, title, audience, quick=False):
    doc.core_properties.title = title
    doc.core_properties.author = "Proyecto Leo y Escribo · Facultad de Ingeniería · UVG"
    doc.core_properties.subject = audience
    doc.core_properties.keywords = "Leo y Escribo, horas de extensión, UVG"
    sec = doc.sections[0]
    sec.page_width, sec.page_height = Inches(8.5), Inches(11)
    for attr in ("top_margin", "bottom_margin", "left_margin", "right_margin"):
        setattr(sec, attr, Inches(0.78 if quick else 1))
    sec.header_distance, sec.footer_distance = Inches(.48), Inches(.45)
    face = "Arial" if quick else "Times New Roman"
    base = style(doc, "Normal", face, 16 if quick else 12)
    base.space_after, base.line_spacing = Pt(5), 1.15
    base.widow_control = True
    sty = style(doc, "Title", face, 30 if quick else 34, NAVY if quick else INK, True)
    sty.space_before, sty.space_after, sty.line_spacing = Pt(0), Pt(12), 1.03
    sty.keep_with_next = True
    for level, size in [(1, 23 if quick else 17), (2, 20 if quick else 13)]:
        sty = style(doc, f"Heading {level}", face, size, NAVY, True)
        sty.space_before, sty.space_after, sty.line_spacing = Pt(12), Pt(5), 1.08
        sty.keep_with_next = True
        sty.keep_together = True
    sty = style(doc, "Caption", face, 10, MUTED)
    sty.space_before, sty.space_after, sty.line_spacing = Pt(4), Pt(10), 1.07
    sty.alignment = WD_ALIGN_PARAGRAPH.CENTER
    for name, size in [("Institution", 14), ("Cover Note", 12), ("Cover Label", 13),
                       ("Table Text", 10.5), ("Code Sample", 9), ("Manual Header", 10)]:
        sty = style(doc, name, "Consolas" if name == "Code Sample" else face, size,
                    MUTED if name == "Manual Header" else INK)
        sty.space_before, sty.space_after = Pt(0), Pt(3 if name == "Table Text" else 6)
        sty.line_spacing = 1.05 if name in {"Code Sample", "Table Text"} else 1.15
    sty = style(doc, "TOC 1", face, 11)
    sty.space_before, sty.space_after, sty.line_spacing = Pt(0), Pt(3), 1.0
    if not quick:
        sec.different_first_page_header_footer = True
        header = sec.header.paragraphs[0]
        header.style = "Manual Header"
        header.add_run(f"LEO Y ESCRIBO  /  {title.upper()}")
    footer = sec.footer.paragraphs[0]
    footer.style = "Manual Header"
    footer.add_run("Universidad del Valle de Guatemala" if quick else "Facultad de Ingeniería · UVG")
    footer.paragraph_format.tab_stops.add_tab_stop(
        Inches(6.94 if quick else 6.5), WD_TAB_ALIGNMENT.RIGHT
    )
    footer.add_run("\t")
    field(footer, "PAGE")


def cover(doc, title, metadata, audience):
    p = doc.add_paragraph("Universidad del Valle de Guatemala", "Institution")
    p.paragraph_format.space_before = Pt(48)
    paragraph(doc, "Facultad de Ingeniería", "Institution")
    p = paragraph(doc, "LEO Y ESCRIBO", "Cover Label")
    p.paragraph_format.space_before = Pt(57)
    p.runs[0].font.color.rgb = color(NAVY)
    doc.add_paragraph(title, "Title")
    paragraph(doc, audience, "Institution")
    p = paragraph(doc, metadata[1].split(" · ")[0], "Cover Note")
    p.paragraph_format.space_before = Pt(14)
    paragraph(doc, metadata[2], "Cover Note")
    p = paragraph(doc, "Equipo del proyecto", "Cover Label")
    p.paragraph_format.space_before = Pt(39)
    for author in metadata[3:]:
        paragraph(doc, author, "Cover Note")
    p = paragraph(doc, "Guatemala · 2026", "Cover Note")
    p.paragraph_format.space_before = Pt(57)


def toc(doc, version):
    p = doc.add_paragraph("Control de versiones", "Heading 2")
    p.paragraph_format.page_break_before = True
    tag, date = version.split(" · ", 1)
    table(doc, [["Versión", "Fecha", "Descripción"],
                [tag.replace("Versión ", ""), date,
                 "Edición de entrega del proyecto de horas de extensión."]], 1)
    p = doc.add_paragraph("Contenido", "Title")
    p.paragraph_format.space_before = Pt(15)
    field(doc.add_paragraph(), 'TOC \\o "1-1" \\h \\z')


def fill(cell, value):
    cell._tc.get_or_add_tcPr().append(element("shd", fill=value))


def table(doc, rows, number):
    label = doc.add_paragraph(f"Tabla {number}", "Caption")
    label.alignment = WD_ALIGN_PARAGRAPH.LEFT
    label.paragraph_format.keep_with_next = True
    label.paragraph_format.space_after = Pt(4)
    tab = doc.add_table(rows=0, cols=len(rows[0]))
    tab.style = "Table Grid"
    tab.alignment = WD_TABLE_ALIGNMENT.CENTER
    tab.autofit = False
    scores = [max(13, min(88, (len(rows[0][i]) + max(len(row[i]) for row in rows)) / 2))
              for i in range(len(rows[0]))]
    weights = [score ** .70 for score in scores]
    for column, weight in zip(tab.columns, weights):
        column.width = Inches(6.5 * weight / sum(weights))
    for i, values in enumerate(rows):
        row = tab.add_row()
        tr = row._tr.get_or_add_trPr()
        tr.append(element("cantSplit"))
        if i == 0:
            tr.append(element("tblHeader"))
        for column, cell, value in zip(tab.columns, row.cells, values):
            cell.width = column.width
            cell.vertical_alignment = WD_CELL_VERTICAL_ALIGNMENT.CENTER
            fill(cell, "E8EAF5" if i == 0 else ("F6F7FB" if i % 2 == 0 else "FFFFFF"))
            p = cell.paragraphs[0]
            p.style = "Table Text"
            p.paragraph_format.space_before = Pt(3)
            p.paragraph_format.keep_with_next = i == 0
            add_inline(p, value)
            if i == 0:
                for run in p.runs:
                    run.bold = True
    after = doc.add_paragraph()
    after.paragraph_format.space_after = Pt(2)
    after.paragraph_format.line_spacing = Pt(3)
    after.paragraph_format.keep_with_next = True


def picture(p, values, maximum_width, maximum_height, minimum_dpi=135):
    alt, name = values
    filename = DOCS / name
    with Image.open(filename) as current:
        width, height = current.size
    inches = min(maximum_width, maximum_height * width / height, width / minimum_dpi)
    item = p.add_run().add_picture(str(filename), width=Inches(inches))
    item._inline.docPr.set("descr", alt)
    p.alignment = WD_ALIGN_PARAGRAPH.CENTER


def figure(doc, values):
    alt, path = values
    p = doc.add_paragraph()
    p.paragraph_format.keep_with_next = True
    p.paragraph_format.space_before, p.paragraph_format.space_after = Pt(5), Pt(0)
    maximum_height = 3.4 if "diagramas/" in path else 3.35
    picture(p, values, 6.43, maximum_height)
    paragraph(doc, alt, "Caption")


def list_item(doc, text, marker):
    p = doc.add_paragraph()
    fmt = p.paragraph_format
    fmt.left_indent, fmt.first_line_indent = Inches(.25), Inches(-.25)
    fmt.space_after = Pt(3)
    fmt.tab_stops.add_tab_stop(Inches(.25))
    p.add_run(marker + "\t")
    add_inline(p, text)


def formal(doc, lines, title, audience):
    meta = [line[2:].strip() for line in lines if line.startswith("> ")]
    cover(doc, title, meta, audience)
    toc(doc, meta[2])
    start = next(i for i, line in enumerate(lines) if "fin-indice" in line)
    body = iter(lines[start + 1:])
    number, page_break = 1, True
    for line in body:
        if not line:
            continue
        if line == "<!-- nueva-pagina -->":
            page_break = True
        elif line.startswith("### "):
            doc.add_heading(line[4:], 2)
        elif line.startswith("## "):
            p = doc.add_heading(line[3:], 1)
            if page_break:
                p.paragraph_format.page_break_before = True
                page_break = False
        elif line.startswith(chr(96) * 3):
            block = []
            for next_line in body:
                if next_line.startswith(chr(96) * 3):
                    break
                block.append(next_line)
            p = doc.add_paragraph("\n".join(block), "Code Sample")
            fmt = p.paragraph_format
            fmt.left_indent, fmt.right_indent = Inches(.12), Inches(.12)
            fmt.space_before, fmt.space_after = Pt(5), Pt(7)
            fmt.keep_together = True
            p._p.get_or_add_pPr().append(element("shd", fill="F0F2F7"))
        elif line.startswith("|"):
            def cells(row):
                return [part.strip() for part in row.strip("|").split("|")]

            rows = [cells(line)]
            for row in body:
                if not row.startswith("|"):
                    if row:
                        raise ValueError("Se esperaba una línea vacía después de la tabla.")
                    break
                if not re.fullmatch(r"[\s|:\-]+", row):
                    rows.append(cells(row))
            number += 1
            table(doc, rows, number)
        elif (match := FIGURE.match(line)):
            figure(doc, match.groups())
        elif (match := re.match(r"^(\d+\.|-)\s+(.*)$", line)):
            list_item(doc, match.group(2), "•" if match.group(1) == "-" else match.group(1))
        else:
            paragraph(doc, line)


def guide_steps(lines):
    pages, step, mascot = [], None, None
    for line in lines:
        if line.startswith("## "):
            pages.append([line[3:], []])
        elif line.startswith("### "):
            step = [line[4:], "", None]
            pages[-1][1].append(step)
        elif (match := FIGURE.match(line)):
            if step[2]:
                mascot = match.groups()
            else:
                step[2] = match.groups()
        elif step and line:
            step[1] = line
    return pages, mascot


def guide(doc, lines, title):
    pages, mascot = guide_steps(lines)
    for index, (heading, steps) in enumerate(pages):
        p = doc.add_paragraph(title if index == 0 else heading, "Title")
        p.paragraph_format.page_break_before = index > 0
        if index == 0:
            paragraph(doc, lines[2], "Manual Header")
            picture(doc.add_paragraph(), mascot, 1.6, .6)
            doc.add_heading(heading, 1)
        tab = doc.add_table(rows=0, cols=2)
        tab.alignment = WD_TABLE_ALIGNMENT.CENTER
        tab.autofit = False
        tab.columns[0].width, tab.columns[1].width = Inches(2.84), Inches(4.09)
        for i, (name, instruction, shot) in enumerate(steps):
            row = tab.add_row()
            row._tr.get_or_add_trPr().append(element("cantSplit"))
            left, right = row.cells
            left.width, right.width = tab.columns[0].width, tab.columns[1].width
            for cell in row.cells:
                cell.vertical_alignment = WD_CELL_VERTICAL_ALIGNMENT.CENTER
                fill(cell, ["EFF8F3", "F7F4FF", "FFF5DF", "EFF4FB"][i])
            p = left.paragraphs[0]
            p.style = "Heading 2"
            p.paragraph_format.space_before = Pt(7)
            digit, name = name.split(". ", 1)
            p.add_run(digit + "  ").font.size = Pt(29)
            p.add_run(name)
            p = left.add_paragraph()
            p.paragraph_format.space_after, p.paragraph_format.line_spacing = Pt(9), 1.10
            add_inline(p, instruction)
            p = right.paragraphs[0]
            p.paragraph_format.space_before, p.paragraph_format.space_after = Pt(8), Pt(8)
            picture(p, shot, 3.82, 1.43 if index == 0 else 1.7, minimum_dpi=78)


def main():
    WORD.mkdir(parents=True, exist_ok=True)
    for source, (filename, audience) in FILES.items():
        lines = (DOCS / f"{source}.md").read_text(encoding="utf-8-sig").splitlines()
        title = lines[0][2:]
        quick = source.startswith("guia-")
        doc = Document()
        setup(doc, title, audience, quick)
        if quick:
            guide(doc, lines, title)
        else:
            formal(doc, lines, title, audience)
        doc.save(WORD / f"{filename}.docx")
        print(filename + ".docx")


def clean_editor():
    """Retira el nombre de la cuenta local que Word añade al guardar el índice."""
    for filename, _ in FILES.values():
        target = WORD / f"{filename}.docx"
        temporary = target.with_suffix(".limpio.docx")
        with ZipFile(target) as original, ZipFile(temporary, "w") as updated:
            for entry in original.infolist():
                content = original.read(entry.filename)
                if entry.filename == "docProps/core.xml":
                    core = etree.fromstring(content)
                    editor = core.find(
                        "{http://schemas.openxmlformats.org/package/2006/metadata/core-properties}lastModifiedBy"
                    )
                    if editor is not None:
                        editor.getparent().remove(editor)
                    content = etree.tostring(core, encoding="UTF-8", xml_declaration=True)
                updated.writestr(entry, content)
        temporary.replace(target)


if __name__ == "__main__":
    if sys.argv[1:] == ["--limpiar-metadatos"]:
        clean_editor()
    elif len(sys.argv) == 1:
        main()
    else:
        sys.exit("Uso: python generar.py [--limpiar-metadatos]")

