import StatusChip from './StatusChip.vue'

export default {
  title: 'Komponenter/StatusChip',
  component: StatusChip,
  tags: ['autodocs'],
  argTypes: {
    status: { control: 'select', options: ['Betald', 'Obetald'] },
  },
  args: { status: 'Betald' },
}

export const Betald = {}

export const Obetald = { args: { status: 'Obetald' } }
