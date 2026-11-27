import assert from 'node:assert/strict'
import test from 'node:test'
import { isDistinctPair, togglePairSelection } from './pairSelection.js'

const first = { id: 'first', name: 'luna' }
const second = { id: 'second', name: 'lápiz' }
const third = { id: 'third', name: 'lana' }

test('deselecting either card never leaves a duplicate pair', () => {
  for (const sequence of [[first, second, first, second], [first, second, second, first]]) {
    let selected = []
    for (const card of sequence) {
      selected = togglePairSelection(selected, card)
      assert.equal(new Set(selected.map((item) => item.id)).size, selected.length)
    }
    assert.deepEqual(selected, [])
  }
})

test('all short click sequences keep at most two distinct cards', () => {
  function check(selected, depth) {
    assert.ok(selected.length <= 2)
    assert.equal(new Set(selected.map((item) => item.id)).size, selected.length)
    if (!depth) return
    for (const card of [first, second, third]) check(togglePairSelection(selected, card), depth - 1)
  }
  check([], 6)
})

test('a third card cannot replace a full pair', () => {
  assert.deepEqual(togglePairSelection([first, second], third), [first, second])
})

test('duplicate, incomplete and already matched pairs cannot be checked', () => {
  assert.equal(isDistinctPair(first, { ...first }), false)
  assert.equal(isDistinctPair(first, null), false)
  assert.equal(isDistinctPair(null, second), false)
  assert.equal(isDistinctPair(first, second, [first.id]), false)
  assert.equal(isDistinctPair(first, second, [second.id]), false)
  assert.equal(isDistinctPair(first, second), true)
})

test('different cards with the same word remain selectable', () => {
  const other = { id: 'other', name: first.name }
  assert.equal(isDistinctPair(first, other), true)
  assert.deepEqual(togglePairSelection([first], other), [first, other])
})

test('ID selections and previously inconsistent selections stay unique', () => {
  assert.deepEqual(togglePairSelection(['first', 'second'], 'second'), ['first'])
  assert.deepEqual(togglePairSelection([null, second], first), [second, first])
  assert.deepEqual(togglePairSelection([first, { ...first }], second), [first, second])
  assert.equal(isDistinctPair('first', 'first'), false)
})
