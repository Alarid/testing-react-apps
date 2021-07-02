// testing custom hooks
// http://localhost:3000/counter-hook

import * as React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import useCounter from '../../components/use-counter'

function UseCounterHookExample(hookProps) {
  const {count, increment, decrement} = useCounter(hookProps)
  return (
    <>
      <div>Current count: {count}</div>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
    </>
  )
}

test('exposes the count and increment/decrement functions', () => {
  const initialCount = 0
  const step = 1
  render(<UseCounterHookExample initialCount={initialCount} step={step} />)

  const currentCount = screen.getByText(/current count/i)
  const incrementButton = screen.getByRole('button', {name: /increment/i})
  const decrementButton = screen.getByRole('button', {name: /decrement/i})

  expect(currentCount).toHaveTextContent(`Current count: ${initialCount}`)
  userEvent.click(incrementButton)
  expect(currentCount).toHaveTextContent(
    `Current count: ${initialCount + step}`,
  )
  userEvent.click(decrementButton)
  expect(currentCount).toHaveTextContent(`Current count: ${initialCount}`)
})
