// Sellos del "Viaje al espacio": siluetas de UN solo color, como un sello de
// goma, dibujadas a mano en un viewBox de 100×100. Cada sello es una lista de
// partes que se pintan en orden:
//   { d }                 relleno con el color del sello
//   { d, cut: true }      recorte (calado) con el color del fondo
//   { d, stroke: n }      trazo grueso de n unidades con puntas redondas
//   { ..., transform }    transformación SVG opcional
// `lesson` liga el sello con la letra que lo entrega al completarse.

const circle = (cx, cy, r) => `M${cx - r} ${cy}a${r} ${r} 0 1 1 ${2 * r} 0a${r} ${r} 0 1 1 ${-2 * r} 0Z`
const ellipse = (cx, cy, rx, ry) => `M${cx - rx} ${cy}a${rx} ${ry} 0 1 1 ${2 * rx} 0a${rx} ${ry} 0 1 1 ${-2 * rx} 0Z`
const poly = (...pts) => `M${pts.reduce((out, value, index) => out + (index % 2 ? `${value}` : `${index ? 'L' : ''}${value} `), '')}Z`
const rect = (x, y, w, h, r = 0) => `M${x + r} ${y}h${w - 2 * r}a${r} ${r} 0 0 1 ${r} ${r}v${h - 2 * r}a${r} ${r} 0 0 1 ${-r} ${r}h${-(w - 2 * r)}a${r} ${r} 0 0 1 ${-r} ${-r}v${-(h - 2 * r)}a${r} ${r} 0 0 1 ${r} ${-r}Z`
const star = (cx, cy, outer, inner, points = 5, rotation = -90) => poly(...Array.from({ length: points * 2 }, (_, index) => {
  const angle = (rotation + index * 180 / points) * Math.PI / 180
  const radius = index % 2 ? inner : outer
  return [+(cx + radius * Math.cos(angle)).toFixed(1), +(cy + radius * Math.sin(angle)).toFixed(1)]
}).flat())
const around = (count, radius, make, cx = 50, cy = 50, start = -90) => Array.from({ length: count }, (_, index) => {
  const angle = (start + index * 360 / count) * Math.PI / 180
  return make(+(cx + radius * Math.cos(angle)).toFixed(1), +(cy + radius * Math.sin(angle)).toFixed(1), index)
})

const fill = (d, extra = {}) => ({ d, ...extra })
const cut = (d, extra = {}) => ({ d, cut: true, ...extra })
const line = (d, stroke, extra = {}) => ({ d, stroke, ...extra })
const round = (d) => ({ d, round: 7 })

const STAMP_ART = [
  // ── U0 · Planeta Burbuja ──────────────────────────────────
  [1, 'Burbuja', 0, null, [fill(circle(50, 50, 38)), cut(ellipse(37, 36, 9, 6), { transform: 'rotate(-35 37 36)' }), cut(circle(50, 26, 3))]],
  [2, 'Pez', 0, null, [fill(ellipse(44, 50, 28, 19)), fill(poly(64, 50, 92, 28, 88, 50, 92, 72)), cut(circle(30, 45, 4))]],
  [3, 'Ancla', 0, null, [fill(circle(50, 17, 10)), cut(circle(50, 17, 4.5)), fill(rect(45, 24, 10, 56, 4)), fill(rect(28, 34, 44, 9, 4.5)), line('M16 58 Q50 104 84 58', 10), fill(poly(8, 62, 18, 46, 26, 62)), fill(poly(74, 62, 82, 46, 92, 62))]],
  [4, 'Estrella de mar', 0, null, [round(star(50, 53, 44, 19))]],
  [5, 'Gota', 0, null, [fill('M50 8C50 8 18 46 18 64a32 32 0 0 0 64 0C82 46 50 8 50 8Z'), cut(ellipse(36, 64, 5, 10), { transform: 'rotate(15 36 64)' })]],
  [6, 'Concha', 0, null, [fill('M8 62A42 42 0 0 1 92 62L58 90H42Z'), cut(poly(49, 86, 22, 32, 28, 28)), cut(poly(50, 86, 47, 22, 53, 22)), cut(poly(51, 86, 72, 28, 78, 32))]],
  [7, 'Ballena', 0, null, [fill('M8 58Q10 30 44 30Q76 30 80 58Q46 84 8 58Z'), fill(poly(74, 54, 94, 34, 92, 62)), fill(circle(38, 20, 4.5)), fill(circle(46, 12, 4.5)), fill(circle(54, 20, 4.5)), cut(circle(24, 50, 3.5))]],
  [8, 'Abeja', 0, 'vocales', [fill(circle(30, 30, 15)), fill(circle(70, 30, 15)), fill(ellipse(50, 60, 22, 30)), cut(rect(27, 52, 46, 7, 3.5)), cut(rect(29, 66, 42, 7, 3.5)), fill(poly(46, 88, 54, 88, 50, 98))]],

  // ── U1 · Planeta Nube ─────────────────────────────────────
  [9, 'Mariposa', 1, 'm', [fill(circle(29, 36, 21)), fill(circle(71, 36, 21)), fill(circle(33, 72, 14)), fill(circle(67, 72, 14)), cut(rect(42, 20, 16, 70, 8)), fill(rect(46, 22, 8, 66, 4)), line('M48 24Q42 10 34 8', 4), line('M52 24Q58 10 66 8', 4)]],
  [10, 'Mano', 1, null, [fill(rect(26, 44, 50, 46, 16)), fill(rect(28, 16, 11, 40, 5.5)), fill(rect(41, 8, 11, 44, 5.5)), fill(rect(54, 10, 11, 42, 5.5)), fill(rect(66, 20, 11, 34, 5.5)), fill(rect(10, 46, 11, 32, 5.5), { transform: 'rotate(-40 16 62)' })]],
  [11, 'Luna', 1, 'l', [fill('M64 8A42 42 0 1 0 92 74A34 34 0 1 1 64 8Z')]],
  [12, 'León', 1, null, [...around(10, 32, (x, y) => fill(circle(x, y, 14))), fill(circle(50, 50, 30)), cut(circle(50, 50, 27)), fill(circle(50, 50, 23)), cut(circle(42, 46, 3.5)), cut(circle(58, 46, 3.5)), cut(poly(45, 55, 55, 55, 50, 61))]],
  [13, 'Sol', 1, 's', [...around(8, 0, (x, y, index) => line('M50 50L50 7', 11, { transform: `rotate(${index * 45} 50 50)` })), fill(circle(50, 50, 25))]],
  [14, 'Sandía', 1, null, [fill('M6 38A44 44 0 0 0 94 38Z'), cut('M15 42A35 35 0 0 0 85 42Z'), fill('M19 42A31 31 0 0 0 81 42Z'), cut(ellipse(38, 54, 3, 5)), cut(ellipse(50, 62, 3, 5)), cut(ellipse(62, 54, 3, 5))]],
  [15, 'Ratón', 1, 'r', [fill(ellipse(52, 62, 32, 22)), fill(circle(30, 36, 13)), fill(circle(50, 32, 13)), line('M82 64Q98 72 90 86Q82 94 72 88', 6), cut(circle(32, 58, 3.5))]],
  [16, 'Pato', 1, 'p', [fill(ellipse(56, 66, 32, 20)), fill(rect(24, 38, 18, 26, 8)), fill(circle(32, 32, 15)), fill(round(poly(16, 30, 4, 38, 18, 40)).d), fill(poly(82, 54, 98, 44, 92, 66)), cut(circle(30, 28, 3))]],

  // ── U2 · Planeta Volcán ───────────────────────────────────
  [17, 'Volcán', 2, null, [fill(poly(10, 92, 90, 92, 62, 44, 38, 44)), cut(poly(41, 44, 59, 44, 55, 51, 45, 51)), fill(circle(44, 30, 8)), fill(circle(57, 21, 10)), fill(circle(45, 10, 7))]],
  [18, 'Casa', 2, 'c', [fill(poly(10, 50, 50, 12, 90, 50, 80, 50, 80, 90, 20, 90, 20, 50)), cut(rect(42, 62, 16, 28, 4)), cut(rect(26, 56, 12, 12, 2)), cut(rect(62, 56, 12, 12, 2))]],
  [19, 'Queso', 2, 'q', [fill(poly(8, 76, 92, 32, 92, 82, 8, 82)), cut(circle(62, 66, 7)), cut(circle(80, 52, 5)), cut(circle(38, 76, 4))]],
  [20, 'Dado', 2, 'd', [fill(rect(14, 14, 72, 72, 16)), ...[[32, 32], [68, 32], [50, 50], [32, 68], [68, 68]].map(([x, y]) => cut(circle(x, y, 6.5)))]],
  [21, 'Dinosaurio', 2, null, [fill(ellipse(58, 62, 28, 18)), line('M38 56Q24 30 28 16', 13), fill(ellipse(30, 15, 11, 8)), fill(poly(82, 56, 98, 72, 76, 70)), ...[38, 50, 62, 72].map((x) => fill(rect(x, 70, 9, 20, 4)))]],
  [22, 'Plátano', 2, 'pl', [fill('M8 24Q20 96 92 72Q98 60 86 56Q40 74 28 20Z'), line('M18 24L12 10', 8)]],
  [23, 'Pluma', 2, null, [fill('M50 4Q88 40 54 84Q16 40 50 4Z', { transform: 'rotate(28 50 50)' }), cut('M50 14L52 78', { transform: 'rotate(28 50 50)', stroke: 3 }), line('M54 84L52 98', 5, { transform: 'rotate(28 50 50)' })]],
  [24, 'Flor', 2, 'pr', [line('M50 56L50 96', 7), fill(ellipse(64, 80, 12, 6), { transform: 'rotate(-30 64 80)' }), ...around(5, 21, (x, y) => fill(circle(x, y, 14)), 50, 36), cut(circle(50, 36, 10)), fill(circle(50, 36, 6.5))]],

  // ── U3 · Planeta Selva ────────────────────────────────────
  [25, 'Hoja', 3, null, [fill('M12 88Q12 18 88 12Q88 82 12 88Z'), cut('M20 80L76 24', { stroke: 4 }), cut('M38 62L36 44', { stroke: 3 }), cut('M56 44L54 30', { stroke: 3 }), cut('M38 62L56 64', { stroke: 3 }), cut('M56 44L72 46', { stroke: 3 })]],
  [26, 'Barco', 3, 'b', [fill(poly(8, 64, 92, 64, 76, 86, 24, 86)), fill(rect(47, 12, 6, 54, 3)), fill(poly(56, 14, 56, 58, 86, 58)), fill(poly(44, 22, 44, 58, 22, 58))]],
  [27, 'Ballena bebé', 3, null, [fill('M10 56A30 30 0 0 1 68 50Q76 48 82 38L94 32L88 52Q84 76 40 80A30 30 0 0 1 10 56Z'), cut(circle(28, 52, 3.5)), cut('M24 64Q32 70 40 66', { stroke: 3 })]],
  [28, 'Jirafa', 3, 'j', [fill(ellipse(60, 70, 24, 14)), fill(rect(42, 74, 8, 22, 4)), fill(rect(70, 74, 8, 22, 4)), line('M44 68L34 26', 13), fill(ellipse(30, 22, 15, 9), { transform: 'rotate(-15 30 22)' }), line('M26 14L23 5', 4), line('M35 13L37 4', 4), cut(circle(28, 21, 2.5))]],
  [29, 'Tren', 3, 'tr', [fill(rect(10, 38, 60, 34, 6)), fill(rect(52, 20, 28, 52, 5)), fill(rect(18, 18, 13, 22, 3)), fill(poly(78, 60, 94, 72, 78, 72)), cut(rect(57, 26, 18, 13, 3)), ...[26, 48, 70].map((x) => fill(circle(x, 80, 10))), ...[26, 48, 70].map((x) => cut(circle(x, 80, 3.5)))]],
  [30, 'Trébol', 3, 'tr', [...[0, 120, 240].map((angle) => fill('M50 50C28 36 28 10 43 12C48 13 50 17 50 20C50 17 52 13 57 12C72 10 72 36 50 50Z', { transform: `rotate(${angle} 50 50)` })), line('M50 54Q58 78 70 94', 6)]],
  [31, 'Brocha', 3, 'br', [fill(rect(44, 6, 12, 42, 6)), fill(rect(36, 44, 28, 12, 3)), fill(rect(30, 54, 40, 38, 5)), ...[40, 50, 60].map((x) => cut(`M${x} 66L${x} 88`, { stroke: 3 }))]],
  [32, 'Chancho', 3, 'ch', [fill(poly(20, 34, 26, 8, 44, 26)), fill(poly(56, 26, 74, 8, 80, 34)), fill(circle(50, 54, 33)), cut(ellipse(50, 64, 13, 9)), fill(circle(45, 64, 2.6)), fill(circle(55, 64, 2.6)), cut(circle(37, 46, 4)), cut(circle(63, 46, 4))]],

  // ── U4 · Planeta Miel ─────────────────────────────────────
  [33, 'Panal', 4, null, [fill(star(50, 50, 44, 44, 3, 0)), cut(star(50, 50, 32, 32, 3, 0)), fill(star(50, 50, 22, 22, 3, 0))]],
  [34, 'Clavo', 4, 'cl', [fill(rect(24, 8, 52, 13, 5)), fill(poly(43, 20, 57, 20, 57, 74, 50, 94, 43, 74))]],
  [35, 'Cometa', 4, 'cr', [fill(poly(50, 4, 80, 38, 50, 72, 20, 38)), cut('M50 10L50 66', { stroke: 3 }), cut('M26 38L74 38', { stroke: 3 }), line('M50 72Q38 80 50 86Q62 92 52 98', 4), fill(poly(38, 80, 46, 84, 38, 88)), fill(poly(64, 88, 56, 92, 64, 96))]],
  [36, 'Foca', 4, 'f', [fill(ellipse(44, 72, 36, 15)), fill(poly(58, 70, 66, 46, 82, 50, 80, 70)), fill(circle(74, 46, 13)), fill(circle(87, 50, 5)), fill(poly(30, 80, 16, 96, 42, 88)), fill(poly(12, 70, 2, 58, 2, 82)), fill(circle(80, 16, 10)), cut(circle(76, 42, 2.8))]],
  [37, 'Flor', 4, null, [...around(6, 25, (x, y) => fill(circle(x, y, 15))), cut(circle(50, 50, 13)), fill(circle(50, 50, 9))]],
  [38, 'Vaca', 4, 'v', [line('M30 34Q16 26 20 10', 7), line('M70 34Q84 26 80 10', 7), fill(ellipse(20, 44, 11, 6), { transform: 'rotate(-20 20 44)' }), fill(ellipse(80, 44, 11, 6), { transform: 'rotate(20 80 44)' }), fill(ellipse(50, 56, 25, 32)), cut(ellipse(50, 74, 15, 10)), fill(circle(44, 74, 2.8)), fill(circle(56, 74, 2.8)), cut(circle(40, 48, 4)), cut(circle(60, 48, 4))]],
  [39, 'Perro', 4, 'rr', [fill(circle(50, 52, 29)), fill(ellipse(20, 50, 11, 24), { transform: 'rotate(14 20 50)' }), fill(ellipse(80, 50, 11, 24), { transform: 'rotate(-14 80 50)' }), cut(circle(40, 46, 4)), cut(circle(60, 46, 4)), cut(ellipse(50, 62, 8, 5.5)), cut('M42 72Q50 78 58 72', { stroke: 3 })]],
  [40, 'Piña', 4, 'enie', [fill(poly(50, 34, 34, 4, 46, 20, 50, 2, 54, 20, 66, 4)), fill(ellipse(50, 64, 27, 32)), ...[[30, 50, 66, 86], [34, 40, 70, 76], [70, 50, 34, 86], [66, 40, 30, 76]].map(([x1, y1, x2, y2]) => cut(`M${x1} ${y1}L${x2} ${y2}`, { stroke: 3 }))]],

  // ── U5 · Planeta Cristal ──────────────────────────────────
  [41, 'Cristal', 5, null, [fill(poly(50, 4, 74, 46, 50, 96, 26, 46)), cut('M50 10L50 90', { stroke: 3 }), cut('M30 46L70 46', { stroke: 3 })]],
  [42, 'Dragón', 5, 'dr', [line('M18 82Q18 58 42 58Q68 58 68 36Q68 22 58 18', 14), fill(circle(58, 16, 11)), fill(poly(66, 12, 82, 8, 70, 22)), fill(poly(36, 54, 22, 30, 52, 48)), fill(poly(56, 54, 80, 34, 74, 62)), fill(poly(12, 82, 4, 96, 24, 90)), cut(circle(56, 13, 2.6))]],
  [43, 'Gato', 5, 'g', [fill(poly(24, 32, 28, 6, 46, 24)), fill(poly(54, 24, 72, 6, 76, 32)), fill(circle(50, 44, 27)), fill(ellipse(50, 82, 22, 15)), line('M70 86Q94 84 88 60', 7), cut(ellipse(40, 42, 3.5, 5)), cut(ellipse(60, 42, 3.5, 5)), cut(poly(46, 52, 54, 52, 50, 57))]],
  [44, 'Helado', 5, 'h', [fill(poly(32, 52, 68, 52, 50, 96)), cut('M40 60L56 80', { stroke: 3 }), cut('M60 60L44 80', { stroke: 3 }), fill(circle(50, 40, 18)), fill(circle(50, 18, 14))]],
  [45, 'Zapato', 5, 'z', [fill(poly(26, 8, 54, 8, 54, 54, 84, 62, 92, 80, 20, 80, 20, 58)), fill(rect(16, 78, 80, 10, 5)), cut('M34 24L48 28', { stroke: 3 }), cut('M34 36L48 40', { stroke: 3 })]],
  [46, 'Llave', 5, 'll', [fill(circle(26, 50, 19)), cut(circle(26, 50, 8)), fill(rect(40, 45, 54, 10, 4)), fill(rect(72, 53, 8, 15, 2)), fill(rect(84, 53, 8, 11, 2))]],
  [47, 'Grillo', 5, 'gr', [fill(ellipse(48, 56, 28, 13), { transform: 'rotate(-10 48 56)' }), fill(circle(20, 52, 10)), line('M54 58L72 32L90 76', 5), line('M40 62L50 44L62 82', 5), line('M16 46Q10 22 26 8', 3), line('M22 44Q22 22 40 12', 3)]],
  [48, 'Globo', 5, 'gl', [fill(ellipse(50, 40, 29, 35)), fill(poly(45, 74, 55, 74, 50, 81)), line('M50 81Q42 88 52 93Q58 97 50 100', 3), cut(ellipse(38, 27, 5, 10), { transform: 'rotate(20 38 27)' })]],

  // ── U6 · Planeta Dulce ────────────────────────────────────
  [49, 'Caramelo', 6, null, [fill(poly(32, 50, 6, 30, 12, 50, 6, 70)), fill(poly(68, 50, 94, 30, 88, 50, 94, 70)), fill(circle(50, 50, 22)), cut('M38 42Q50 34 62 46Q50 58 40 54', { stroke: 3.5 })]],
  [50, 'Xilófono', 6, 'x', [fill(rect(10, 30, 15, 54, 4)), fill(rect(31, 34, 15, 46, 4)), fill(rect(52, 38, 15, 38, 4)), fill(rect(73, 42, 15, 30, 4)), ...[[17.5, 38], [17.5, 76], [38.5, 41], [38.5, 73], [59.5, 45], [59.5, 69], [80.5, 49], [80.5, 65]].map(([x, y]) => cut(circle(x, y, 2.5))), line('M56 18L84 6', 4), fill(circle(54, 19, 5))]],
  [51, 'Yoyo', 6, 'y-letra', [fill(circle(50, 62, 32)), cut(circle(50, 62, 24)), fill(circle(50, 62, 18)), line('M50 60L50 4', 3)]],
  [52, 'Koala', 6, 'k', [fill(circle(20, 34, 17)), fill(circle(80, 34, 17)), cut(circle(20, 34, 8)), cut(circle(80, 34, 8)), fill(circle(50, 56, 29)), cut(ellipse(50, 62, 10, 13)), fill(ellipse(50, 62, 7, 10)), cut(circle(37, 50, 3.5)), cut(circle(63, 50, 3.5))]],
  [53, 'Kiwi', 6, 'w', [fill(circle(50, 50, 42)), cut(circle(50, 50, 37)), fill(circle(50, 50, 33)), ...around(10, 19, (x, y, index) => cut(ellipse(x, y, 2.4, 4.4), { transform: `rotate(${index * 36} ${x} ${y})` })), cut(circle(50, 50, 6))]],
  [54, 'Fresa', 6, 'fr', [fill('M50 94C20 72 8 46 22 32C32 22 44 26 50 32C56 26 68 22 78 32C92 46 80 72 50 94Z'), fill(poly(30, 28, 42, 14, 50, 26, 58, 14, 70, 28, 50, 34)), line('M50 22L52 6', 5), ...[[36, 46], [50, 50], [64, 46], [42, 64], [58, 64], [50, 78]].map(([x, y]) => cut(ellipse(x, y, 2.4, 3.6)))]],
  [55, 'Flecha', 6, 'fl', [round(poly(10, 40, 58, 40, 58, 22, 92, 50, 58, 78, 58, 60, 10, 60))]],
  [56, 'Pingüino', 6, 'gue-con-dieresis', [fill(ellipse(24, 58, 8, 20), { transform: 'rotate(20 24 58)' }), fill(ellipse(76, 58, 8, 20), { transform: 'rotate(-20 76 58)' }), fill(ellipse(50, 54, 25, 38)), cut(ellipse(50, 64, 15, 25)), cut(circle(43, 28, 3)), cut(circle(57, 28, 3)), cut(poly(45, 35, 55, 35, 50, 42)), fill(ellipse(40, 94, 9, 4.5)), fill(ellipse(60, 94, 9, 4.5))]],

  // ── U7 · Planeta Escritor ─────────────────────────────────
  [57, 'Lápiz', 7, null, [fill(poly(16, 36, 66, 36, 66, 64, 16, 64), { transform: 'rotate(-35 50 50)' }), fill(poly(66, 36, 94, 50, 66, 64), { transform: 'rotate(-35 50 50)' }), fill(rect(2, 36, 11, 28, 4), { transform: 'rotate(-35 50 50)' }), cut('M18 46L64 46', { stroke: 2.5, transform: 'rotate(-35 50 50)' }), cut('M18 54L64 54', { stroke: 2.5, transform: 'rotate(-35 50 50)' })]],
  [58, 'Libro abierto', 7, null, [fill('M50 28Q30 16 6 20V80Q30 76 50 88Z'), fill('M50 28Q70 16 94 20V80Q70 76 50 88Z'), cut('M50 28L50 88', { stroke: 3.5 }), cut('M14 34Q30 32 42 38', { stroke: 2.5 }), cut('M58 38Q70 32 86 34', { stroke: 2.5 })]],
  [59, 'Cohete', 7, null, [fill(poly(30, 46, 12, 78, 30, 70)), fill(poly(70, 46, 88, 78, 70, 70)), fill('M50 4Q74 24 70 70H30Q26 24 50 4Z'), fill(poly(38, 72, 62, 72, 50, 96)), cut(circle(50, 36, 9))]],
  [60, 'Estrella fugaz', 7, null, [round(star(64, 38, 27, 12)), line('M42 54L10 86', 6), line('M36 42L8 60', 6), line('M50 62L32 92', 6)]],
  [61, 'Planeta con anillo', 7, null, [fill(circle(50, 50, 27)), cut(ellipse(50, 52, 46, 12), { stroke: 12, transform: 'rotate(-20 50 50)' }), line(ellipse(50, 52, 46, 12), 6, { transform: 'rotate(-20 50 50)' })]],
  [62, 'Marcianito Leo', 7, null, [line('M50 34L56 10', 5), fill(circle(57, 8, 7)), fill(ellipse(50, 60, 36, 30)), cut(circle(37, 56, 8)), cut(circle(63, 56, 8)), fill(circle(38, 57, 3.5)), fill(circle(62, 57, 3.5)), cut('M40 74Q50 80 60 74', { stroke: 3.5 })]],
  [63, 'Corona', 7, null, [fill(poly(12, 66, 12, 30, 31, 50, 50, 22, 69, 50, 88, 30, 88, 66)), fill(rect(12, 64, 76, 18, 4)), fill(circle(12, 26, 7)), fill(circle(50, 18, 7)), fill(circle(88, 26, 7)), cut(circle(50, 73, 4))]],
  [64, 'Trofeo', 7, null, [line('M26 22Q8 22 10 36Q12 48 28 46', 6), line('M74 22Q92 22 90 36Q88 48 72 46', 6), fill('M24 12H76Q76 56 50 62Q24 56 24 12Z'), fill(rect(45, 60, 10, 16, 2)), fill(rect(30, 74, 40, 10, 3)), fill(rect(22, 84, 56, 10, 3)), cut(star(50, 32, 11, 5))]],

  // ── Sellos especiales (brillantes) ────────────────────────
  [65, 'Cometa dorado', 'shiny', null, [fill(poly(58, 22, 6, 72, 22, 72, 12, 90, 30, 80, 64, 46)), fill(circle(68, 32, 18)), cut(circle(62, 26, 4))]],
  [66, 'Ovni', 'shiny', null, [fill('M28 50A22 22 0 0 1 72 50Z'), fill(ellipse(50, 56, 44, 13)), ...[24, 50, 76].map((x) => cut(circle(x, x === 50 ? 59 : 56, 3.5)))]],
  [67, 'Constelación', 'shiny', null, [line('M20 72L50 28L82 62', 3), round(star(20, 72, 15, 7)), round(star(50, 28, 15, 7)), round(star(82, 62, 15, 7))]],
  [68, 'Medalla', 'shiny', null, [fill(poly(28, 4, 46, 4, 58, 42, 40, 42)), fill(poly(72, 4, 54, 4, 42, 42, 60, 42)), fill(circle(50, 64, 28)), cut(circle(50, 64, 21)), fill(star(50, 64, 15, 6.5))]],
]

export const STAMPS = STAMP_ART.map(([number, name, unit, lesson, parts]) => ({
  id: `sello-${number}`,
  number,
  name,
  unit: unit === 'shiny' ? null : unit,
  shiny: unit === 'shiny',
  lesson,
  parts,
}))

export function getStamp(id) {
  return STAMPS.find((stamp) => stamp.id === id) ?? null
}

export function getUnitStamps(unit) {
  return STAMPS.filter((stamp) => stamp.unit === unit)
}

// Rotación fija entre -10° y 10° por sello, para que se vea estampado a mano
// sin cambiar en cada render.
export function getStampRotation(id) {
  const hash = [...id].reduce((total, char) => (total * 31 + char.charCodeAt(0)) % 997, 7)
  return (hash % 21) - 10
}

// Sello que entrega una lección (o juego final) al completarse: el ligado a
// su letra o, si no tiene uno, el siguiente libre de su unidad en orden.
export function getStampForLesson(lessonId, unit, unitLessonIds = []) {
  const own = STAMPS.find((stamp) => stamp.lesson === lessonId)
  if (own) return own
  const free = getUnitStamps(unit).filter((stamp) => !stamp.lesson)
  const others = unitLessonIds.filter((id) => !STAMPS.some((stamp) => stamp.lesson === id))
  const index = Math.max(others.indexOf(lessonId), 0)
  return free[index % Math.max(free.length, 1)] ?? null
}

// Sellos brillantes: salen 1 de cada 8 veces y se guardan en este
// navegador (no en la base de datos).
const SHINY_KEY = 'leo-y-escribo:sellos-brillantes'

export function readShinyStamps() {
  try {
    return JSON.parse(localStorage.getItem(SHINY_KEY) ?? '[]')
  } catch {
    return []
  }
}

export function maybeAwardShinyStamp(random = Math.random()) {
  if (random >= 1 / 8) return null
  const owned = readShinyStamps()
  const next = STAMPS.find((stamp) => stamp.shiny && !owned.includes(stamp.id))
  if (!next) return null
  try {
    localStorage.setItem(SHINY_KEY, JSON.stringify([...owned, next.id]))
  } catch {
    return null
  }
  return next
}
