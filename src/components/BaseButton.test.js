import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/vue'
import '@testing-library/jest-dom/vitest'
import BaseButton from './BaseButton.vue'

describe("BaseButton", () => {
  it("renders with an accessible name from its label", () => {
    render(BaseButton, { slots: { default: 'Click' } })

    // getByRole throws if no element matches, and { name } asserts the
    // accessible name resolves to the slot content — i.e. the button has a label.
    const button = screen.getByRole('button', { name: 'Click' })
    expect(button).toBeInTheDocument()
  })
})
