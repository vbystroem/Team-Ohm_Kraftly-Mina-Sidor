<template>
  <span
    :class="[
      'status-chip',
      status === 'Betald' ? 'status-betald' : 'status-obetald',
    ]"
    >{{ status }}</span
  >
</template>

<script setup>
defineProps({
  status: {
    type: String,
    required: true,
    validator: (value) => ['Betald', 'Obetald'].includes(value),
  },
})
</script>
