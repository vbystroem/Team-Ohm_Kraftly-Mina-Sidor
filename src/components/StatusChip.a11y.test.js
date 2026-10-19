import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/vue'
import { axe } from 'jest-axe'
import StatusChip from './StatusChip.vue'

const renderChip = (status) => render(StatusChip, { props: { status } })

describe('StatusChip', () => {
  it.each(['Betald', 'Obetald'])('visar statusen %s som text', (status) => {
    renderChip(status)

    const chip = screen.getByText(status)
    expect(chip).toBeInTheDocument()
    expect(chip).toHaveClass(`status-${status.toLowerCase()}`)
  })

  it.each(['Betald', 'Obetald'])(
    'har inga axe-överträdelser (%s)',
    async (status) => {
      const { container } = renderChip(status)
      expect(await axe(container)).toHaveNoViolations()
    },
  )
})
