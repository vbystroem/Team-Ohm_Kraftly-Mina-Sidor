<template>
  <div>
    <h1>Flyttanmälan</h1>
    <div class="card" style="max-width: 560px">
      <p style="margin-bottom: 14px">
        Fyll i uppgifterna nedan så flyttar vi ditt elavtal.
      </p>
      <input v-model="form.address" type="text" placeholder="Ny adress" />
      <input v-model="form.zip" type="text" placeholder="Postnummer" />
      <input v-model="form.city" type="text" placeholder="Ort" />
      <input
        v-model="form.date"
        type="text"
        placeholder="Inflyttningsdatum (ÅÅÅÅ-MM-DD)"
      />
      <select v-model="form.contract">
        <option disabled value="">Välj avtal</option>
        <option>Rörligt pris</option>
        <option>Fast pris 1 år</option>
        <option>Fast pris 3 år</option>
      </select>
      <BaseButton @click="submit">Skicka flyttanmälan</BaseButton>
      <p class="hint" style="margin-top: 8px">
        Anmälan måste göras senast 14 dagar före flytt
      </p>
      <p v-if="reference" style="color: #12b76a; margin-top: 10px">
        Tack! Referensnummer: {{ reference }}
      </p>
      <p v-if="error" style="color: #f04438; margin-top: 10px">{{ error }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import BaseButton from '../components/BaseButton.vue'
import { submitMove } from '../services/api'
import { validateMove } from '../utils/validateMove'

const form = reactive({
  address: '',
  zip: '',
  city: '',
  date: '',
  contract: '',
})
const reference = ref(null)
const error = ref(null)

const submit = async () => {
  error.value = null
  const valid = validateMove(form)
  if (!Object.values(valid).every(Boolean)) {
    error.value = 'Fyll i alla uppgifter korrekt.'
    return
  }
  try {
    const res = await submitMove(form)
    reference.value = res.ref
  } catch (e) {
    error.value = 'Något gick fel, försök igen.'
    console.error(e)
  }
}
</script>
