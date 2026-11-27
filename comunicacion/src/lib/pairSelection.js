const cardId = (card) => card && typeof card === 'object' ? card.id : card

// Una tarjeta ocupa un solo lugar; al tocarla otra vez se deselecciona.
export function togglePairSelection(selection, card) {
  const selected = selection.filter((item, index, items) =>
    item != null && items.findIndex((other) => cardId(other) === cardId(item)) === index,
  )
  const id = cardId(card)

  if (selected.some((item) => cardId(item) === id)) {
    return selected.filter((item) => cardId(item) !== id)
  }

  return selected.length < 2 ? [...selected, card] : selected
}

export function isDistinctPair(first, second, matchedIds = []) {
  const firstId = cardId(first)
  const secondId = cardId(second)

  return firstId != null && secondId != null && firstId !== secondId &&
    !matchedIds.includes(firstId) && !matchedIds.includes(secondId)
}
