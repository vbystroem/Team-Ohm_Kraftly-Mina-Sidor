import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import InvoicesView from './InvoicesView.vue'

vi.mock('../services/api', () => ({
  fetchInvoices: vi.fn(),
}))

describe('InvoicesView', () => {
  it('shows error on API failure', async () => {
    const { fetchInvoices } = await import('../services/api')
    fetchInvoices.mockRejectedValue(new Error('API error'))
    const wrapper = mount(InvoicesView)
    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()
    expect(wrapper.find('[role="alert"]').exists()).toBe(true)
  })
})
