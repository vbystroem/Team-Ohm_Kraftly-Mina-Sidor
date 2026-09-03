import { describe, it, expect } from 'vitest'
import { formatCurrency } from './format'

describe('Formatting numbers tests', () => {
  it.each([
    [1204, '1\u00a0204 kr'],
    [90.5, '90,5 kr'],
    [412, '412 kr'],
    [1234567, '1\u00a0234\u00a0567 kr'],
    [undefined, '-'],
    ['-', '-'],
  ])("formats %s correctly as '%s'", (input, expected) => {
    const amount = input //arrange
    const result = formatCurrency(amount) //act

    expect(result).toBe(expected)
  })
})
