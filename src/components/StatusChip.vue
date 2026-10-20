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

<style scoped>
.status-chip {
  display: inline-block;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 14px;
}
.status-obetald {
  background: #fff1f0;
  color: #b42318;
}
.status-betald {
  background: #ecfdf3;
  color: #067647;
}
</style>
