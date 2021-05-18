// simple test with ReactDOM
// http://localhost:3000/counter

import * as React from 'react'
import ReactDOM from 'react-dom'
import Counter from '../../components/counter'

beforeEach(() => {
  document.body.innerHTML = ''
})

const getNewClickEvent = () =>
  new MouseEvent('click', {
    cancelable: true,
    bubbles: true,
    button: 0, // left button click
  })

test('counter increments and decrements when the buttons are clicked', () => {
  const div = document.createElement('div')
  document.body.appendChild(div)
  ReactDOM.render(<Counter />, div)

  const [decrement, increment] = div.querySelectorAll('button')
  const message = div.firstChild.querySelector('div')

  expect(message.textContent).toBe('Current count: 0')
  increment.dispatchEvent(getNewClickEvent())
  expect(message.textContent).toBe('Current count: 1')
  decrement.dispatchEvent(getNewClickEvent())
  expect(message.textContent).toBe('Current count: 0')
})

/* eslint no-unused-vars:0 */
