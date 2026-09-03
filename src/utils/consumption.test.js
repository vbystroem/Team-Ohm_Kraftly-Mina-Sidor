// consumption.test.js
import { it, expect, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useConsumptionStore } from '../stores/consumption'
import { fetchConsumption } from '../services/api'

vi.mock('../services/api', () => ({
  fetchConsumption: vi.fn(),
}))

setActivePinia(createPinia())

it('saves consumption data after load()', async () => {
  fetchConsumption.mockResolvedValue({ kwh: 150 })

  const store = useConsumptionStore()
  await store.load()

  expect(store.data).toEqual({ kwh: 150 })
})
