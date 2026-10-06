import { describe, it, expect } from 'vitest'
import { validateMove } from './validateMove'

describe('test validateMove', () => {
  it('should return invalid if address is missing', () => {
    const moveForm = {
      address: '',
      zip: '80267',
      city: 'Gävle',
      date: '2026-10-01',
      contract: 'Rörligt pris',
    }

    const expected = {
      address: false,
      zip: true,
      city: true,
      date: true,
      contract: true,
    }

    const result = validateMove(moveForm, new Date())

    expect(result).toStrictEqual(expected)
  })

  // Varför det spelar roll: Utan det här testet kan ett formulär med en adress
  // som bara består av blanksteg gå igenom, och kunden kan då skicka in en
  // flytt utan någon riktig adress.
  it('should return invalid if address is only blank space', () => {
    const moveForm = {
      address: '   ',
      zip: '80267',
      city: 'Gävle',
      date: '2026-10-01',
      contract: 'Rörligt pris',
    }

    const expected = {
      address: false,
      zip: true,
      city: true,
      date: true,
      contract: true,
    }

    const result = validateMove(moveForm, new Date())

    expect(result).toStrictEqual(expected)
  })
})
