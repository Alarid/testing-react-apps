// testing custom hooks
// http://localhost:3000/counter-hook

import {renderHook, act} from '@testing-library/react-hooks'
import useCounter from '../../components/use-counter'

test('exposes the count and increment/decrement functions', () => {
  const {result} = renderHook(() => useCounter())
  expect(result.current.count).toBe(0)
  act(() => {
    result.current.increment()
  })
  expect(result.current.count).toBe(1)
  act(() => {
    result.current.decrement()
  })
  expect(result.current.count).toBe(0)
})

test('allows customization of the initial count', () => {
  const initialCount = 2
  const {result} = renderHook(() => useCounter({initialCount}))
  expect(result.current.count).toBe(initialCount)
})

test('allows customization of the step', () => {
  const step = 2
  const {result} = renderHook(() => useCounter({step}))
  expect(result.current.count).toBe(0)
  act(() => {
    result.current.increment()
  })
  expect(result.current.count).toBe(2)
  act(() => {
    result.current.decrement()
  })
  expect(result.current.count).toBe(0)
})
