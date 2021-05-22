// form testing
// http://localhost:3000/login

import * as React from 'react'
import {build, fake} from '@jackfranklin/test-data-bot'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Login from '../../components/login'

const loginFormBuilder = build({
  fields: {
    username: fake(f => f.internet.userName()),
    password: fake(f => f.internet.password()),
  },
})

test('submitting the form calls onSubmit with username and password', () => {
  const handleSubmit = jest.fn()

  render(<Login onSubmit={handleSubmit} />)

  let {username, password} = loginFormBuilder({overrides: {password: 'test'}})
  userEvent.type(screen.getByLabelText(/username/i), username)
  userEvent.type(screen.getByLabelText(/password/i), password)

  userEvent.click(screen.getByRole('button', {name: /submit/i}))

  expect(handleSubmit).toHaveBeenCalledWith({username, password})
  expect(handleSubmit).toHaveBeenCalledTimes(1)
})
