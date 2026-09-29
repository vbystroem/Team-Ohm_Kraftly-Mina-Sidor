import { describe, it, expect, vi } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import MoveFormView from './MoveFormView.vue'
import { submitMove } from '../services/api'

vi.mock('../services/api', () => ({
  submitMove: vi.fn().mockResolvedValue({ ref: 'F-123' }),
}))

describe('MoveFormView', () => {
  it('skickar inte en tom flyttanmälan', async () => {
    const wrapper = mount(MoveFormView)
    await wrapper.find('button').trigger('click')
    await flushPromises()
    expect(submitMove).not.toHaveBeenCalled()
  })
})
