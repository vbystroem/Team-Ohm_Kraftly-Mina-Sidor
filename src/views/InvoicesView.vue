<template>
  <div>
    <h1>Fakturor</h1>
    <div class="card">
      <table>
        <thead>
          <tr>
            <th scope="col">Faktura</th>
            <th scope="col">Period</th>
            <th scope="col">Belopp</th>
            <th scope="col">Förfaller</th>
            <th scope="col">Status</th>
            <th scope="col"><span class="visually-hidden">Åtgärd</span></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="invoice in invoices" :key="invoice.id">
            <td>{{ invoice.id }}</td>
            <td>{{ invoice.period }}</td>
            <td>{{ formatCurrency(invoice.amount) }}</td>
            <td>{{ invoice.due }}</td>
            <td>
              <StatusChip :status="invoice.status" />
            </td>
            <td>
              <KButton
                variant="text"
                :aria-label="`Ladda ner faktura ${invoice.id}`"
                @click="downloadInvoice(invoice)"
              >
                Ladda ner
              </KButton>
            </td>
          </tr>
        </tbody>
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
