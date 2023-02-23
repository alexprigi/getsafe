import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

const emailValue = "john.doe@email.com"
const ageValue = "30"
const firstNameValue = "John"
const lastNameValue = "Doe"

test('renders learn react link', () => {
  render(<App />)
  const linkDevElement = screen.getByTestId("dev-link")
  expect(linkDevElement).toBeInTheDocument()

  const linkDesigrElement = screen.getByTestId("designr-link")
  expect(linkDesigrElement).toBeInTheDocument()
})

test('test dev insurance', async () => {
  render(<App />)
  const linkDevElement = screen.getByTestId("dev-link")
  await userEvent.click(linkDevElement)

  const emailInputElement = screen.getByTestId("email")
  expect(emailInputElement).toBeInTheDocument()
  await userEvent.type(emailInputElement, emailValue);

  let submitBtn = screen.getByTestId("submit")
  await userEvent.click(submitBtn)

  const ageInputElement = screen.getByTestId("age")
  expect(ageInputElement).toBeInTheDocument()
  await userEvent.type(ageInputElement, ageValue);

  submitBtn = screen.getByTestId("submit")
  await userEvent.click(submitBtn)

  const emailSpanElement = screen.getByTestId("email")
  expect(emailSpanElement).toHaveTextContent(emailValue)

  const ageSpanElement = screen.getByTestId("age")
  expect(ageSpanElement).toHaveTextContent(ageValue)

  const purchaseElement = screen.getByTestId("purchase-link")
  expect(purchaseElement).toBeInTheDocument()
  await userEvent.click(purchaseElement)
})


test('test designr insurance', async () => {
  render(<App />)
  const linkDesigrElement = screen.getByTestId("designr-link")
  await userEvent.click(linkDesigrElement)

  const emailInputElement = screen.getByTestId("email")
  expect(emailInputElement).toBeInTheDocument()
  await userEvent.type(emailInputElement, emailValue);

  let submitBtn = screen.getByTestId("submit")
  await userEvent.click(submitBtn)

  const ageInputElement = screen.getByTestId("age")
  expect(ageInputElement).toBeInTheDocument()
  await userEvent.type(ageInputElement, ageValue);

  submitBtn = screen.getByTestId("submit")
  await userEvent.click(submitBtn)

  const firstNameInputElement = screen.getByTestId("firstName")
  expect(firstNameInputElement).toBeInTheDocument()
  await userEvent.type(firstNameInputElement, firstNameValue);

  const lastNameInputElement = screen.getByTestId("lastName")
  expect(lastNameInputElement).toBeInTheDocument()
  await userEvent.type(lastNameInputElement, lastNameValue);

  submitBtn = screen.getByTestId("submit")
  await userEvent.click(submitBtn)

  const emailSpanElement = screen.getByTestId("email")
  expect(emailSpanElement).toHaveTextContent(emailValue)

  const ageSpanElement = screen.getByTestId("age")
  expect(ageSpanElement).toHaveTextContent(ageValue)

  const firstNameSpanElement = screen.getByTestId("firstName")
  expect(firstNameSpanElement).toHaveTextContent(firstNameValue)

  const lastNameSpanElement = screen.getByTestId("lastName")
  expect(lastNameSpanElement).toHaveTextContent(lastNameValue)

  const purchaseElement = screen.getByTestId("purchase-link")
  expect(purchaseElement).toBeInTheDocument()
  await userEvent.click(purchaseElement)
})