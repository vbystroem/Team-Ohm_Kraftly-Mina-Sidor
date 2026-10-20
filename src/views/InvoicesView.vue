<template>
  <div>
    <h1>Fakturor</h1>
    <div v-if="error" role="alert">{{ error }}</div>
    <div class="card">
      <table>
        <tr>
          <th>Faktura</th>
          <th>Period</th>
          <th>Belopp</th>
          <th>Förfaller</th>
          <th>Status</th>
          <th></th>
        </tr>
        <tr v-for="invoice in invoices" :key="invoice.id">
          <td>{{ invoice.id }}</td>
          <td>{{ invoice.period }}</td>
          <td>{{ formatCurrency(invoice.amount) }}</td>
          <td>{{ invoice.due }}</td>
          <td>
            <StatusChip :status="invoice.status" />
          </td>
          <td>
            <KButton variant="text" @click="downloadInvoice(invoice)">
              Ladda ner
            </KButton>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import KButton from '../components/KButton.vue'
import StatusChip from '../components/StatusChip.vue'
import { fetchInvoices } from '../services/api'
import { formatCurrency } from '../utils/format'

const invoices = ref([])
const error = ref(null)

onMounted(async () => {
  try {
    invoices.value = await fetchInvoices()
  } catch (err) {
    error.value = err.message
  }
})

const downloadInvoice = (invoice) => {
  console.log('download', invoice.id)
  alert('Nedladdning kommer snart')
}
</script>
