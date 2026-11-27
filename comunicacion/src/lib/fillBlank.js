// Solo cambia el texto visible; conserva el hueco hasta que haya una selección.
export function fillBlank(text, selection) {
  return selection ? text.replace(/_+/, () => selection) : text
}
