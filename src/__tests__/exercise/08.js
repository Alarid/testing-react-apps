// testing custom hooks
// http://localhost:3000/counter-hook

import * as React from 'react'
import {render, act} from '@testing-library/react'
import useCounter from '../../components/use-counter'

function setup(...args) {
  const returnVal = {}
  function TestComponent() {
    Object.assign(returnVal, useCounter(...args))
    return null
  }
  render(<TestComponent />)
  return returnVal
}

test('exposes the count and increment/decrement functions', () => {
  const result = setup()
  expect(result.count).toBe(0)
  act(() => {
    result.increment()
  })
  expect(result.count).toBe(1)
  act(() => {
    result.decrement()
  })
  expect(result.count).toBe(0)
})

test('allows customization of the initial count', () => {
  const initialCount = 2
  const result = setup({initialCount})
  expect(result.count).toBe(initialCount)
})

test('allows customization of the step', () => {
  const step = 2
  const result = setup({step})
  expect(result.count).toBe(0)
  act(() => {
    result.increment()
  })
  expect(result.count).toBe(2)
  act(() => {
    result.decrement()
  })
  expect(result.count).toBe(0)
})
