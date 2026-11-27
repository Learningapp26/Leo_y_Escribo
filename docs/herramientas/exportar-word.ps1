# Exporta con Microsoft Word para Windows los documentos locales de docs.
param([string]$Nombre)

$ErrorActionPreference = 'Stop'
$docs = Split-Path -Parent $PSScriptRoot
$wordDir = Join-Path $docs 'entregables/word'
$pdfDir = Join-Path $docs 'entregables/pdf'
[void](New-Item -ItemType Directory -Force -Path $pdfDir)

$app = New-Object -ComObject Word.Application
try {
    $app.Visible = $false
    $app.DisplayAlerts = 0
    $app.AutomationSecurity = 3
    Get-ChildItem -LiteralPath $wordDir -Filter '*.docx' -File | Where-Object {
        -not $Nombre -or $_.BaseName -eq $Nombre
    } | ForEach-Object {
        $doc = $null
        try {
            $doc = $app.Documents.Open($_.FullName, $false, $false, $false)
            $doc.Repaginate()
            foreach ($toc in $doc.TablesOfContents) {
                $toc.Update()
                $toc.Range.Font.Name = 'Times New Roman'
                $toc.Range.Font.Size = 10.5
                $toc.Range.ParagraphFormat.SpaceBefore = 0
                $toc.Range.ParagraphFormat.SpaceAfter = 1
                $toc.Range.ParagraphFormat.LineSpacingRule = 0
            }
            $doc.Repaginate()
            foreach ($toc in $doc.TablesOfContents) {
                $toc.UpdatePageNumbers()
            }
            $doc.Save()
            $destination = Join-Path $pdfDir ($_.BaseName + '.pdf')
            $doc.ExportAsFixedFormat(
                $destination, 17, $false, 0, 0, 1, 1, 0, $true, $false, 1, $true, $true, $false
            )
            Write-Output "$($_.BaseName): $($doc.ComputeStatistics(2)) páginas"
        } finally {
            if ($doc) { $doc.Close(0) }
        }
    }
} finally {
    $app.Quit(0)
}

