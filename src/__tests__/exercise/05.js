// mocking HTTP requests
// http://localhost:3000/login-submission

import * as React from 'react'
import {rest} from 'msw'
import {setupServer} from 'msw/node'
import {build, fake} from '@jackfranklin/test-data-bot'

import {render, screen, waitForElementToBeRemoved} from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Login from '../../components/login-submission'
import {handlers} from 'test/server-handlers'

const buildLoginForm = build({
  fields: {
    username: fake(f => f.internet.userName()),
    password: fake(f => f.internet.password()),
  },
})

const server = setupServer(...handlers)

beforeAll(() => server.listen())
afterAll(() => server.close())

afterEach(() => server.resetHandlers())

async function submitFormWith({username = '', password = ''} = {}) {
  if (username.length > 0)
    userEvent.type(screen.getByLabelText(/username/i), username)
  if (password.length > 0)
    userEvent.type(screen.getByLabelText(/password/i), password)
  userEvent.click(screen.getByRole('button', {name: /submit/i}))
  await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i))
}

test(`logging in displays the user's username`, async () => {
  render(<Login />)
  const {username, password} = buildLoginForm()
  await submitFormWith({username, password})
  screen.getByText(username)
})

test('logging in without password displays an error', async () => {
  render(<Login />)
  const {username} = buildLoginForm()
  await submitFormWith({username})
  expect(screen.getByRole('alert').textContent).toMatchInlineSnapshot(
    `"password required"`,
  )
})

test('logging in without username displays an error', async () => {
  render(<Login />)
  const {password} = buildLoginForm()
  await submitFormWith({password})
  expect(screen.getByRole('alert').textContent).toMatchInlineSnapshot(
    `"username required"`,
  )
})

test('unkown server error displays the error message', async () => {
  const serverErrorMsg = 'Something went wrong'
  server.use(
    rest.post(
      // note that it's the same URL as our app-wide handler
      // so this will override the other.
      'https://auth-provider.example.com/api/login',
      async (req, res, ctx) => {
        return res(ctx.status(500), ctx.json({message: serverErrorMsg}))
      },
    ),
  )

  render(<Login />)
  const {username, password} = buildLoginForm()
  await submitFormWith({username, password})
  expect(screen.getByRole('alert')).toHaveTextContent(serverErrorMsg)
})
