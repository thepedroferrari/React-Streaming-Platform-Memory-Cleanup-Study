import { render, screen } from "@testing-library/react"
import { App } from "./App"

test("Renders the app component", () => {
  render(<App />)
  const linkElement = screen.getByText(/- - -/i)
  expect(linkElement).toBeInTheDocument()
})
