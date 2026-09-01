import { describe, it, expect } from 'vitest'
import { firstName } from './user'

describe('First Name tests', () => {
  const name = 'Anna Andersson'
  const result = firstName(name)
  const undefinedResult = firstName()

  it('renders first name out of full name', () => {
    expect(result).toBe('Anna')
  })

  it('renders empty string if parameter is undefined', () => {
    expect(undefinedResult).toBe('')
  })
})
