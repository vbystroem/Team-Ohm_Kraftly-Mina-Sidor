<template>
  <div>
    <h1>Flyttanmälan</h1>
    <div class="card" style="max-width: 560px">
      <p style="margin-bottom: 14px">
        Fyll i uppgifterna nedan så flyttar vi ditt elavtal.
      </p>

      <label for="move-address">Ny adress</label>
      <input
        id="move-address"
        v-model="form.address"
        type="text"
        placeholder="Ny adress"
      />

      <label for="move-zip">Postnummer</label>
      <input
        id="move-zip"
        v-model="form.zip"
        type="text"
        placeholder="Postnummer"
      />

      <label for="move-city">Ort</label>
      <input id="move-city" v-model="form.city" type="text" placeholder="Ort" />

      <label for="move-date">Inflyttningsdatum (ÅÅÅÅ-MM-DD)</label>
      <input
        id="move-date"
        v-model="form.date"
        type="text"
        placeholder="Inflyttningsdatum (ÅÅÅÅ-MM-DD)"
      />

      <label for="move-contract">Avtal</label>
      <select id="move-contract" v-model="form.contract">
        <option disabled value="">Välj avtal</option>
        <option>Rörligt pris</option>
        <option>Fast pris 1 år</option>
        <option>Fast pris 3 år</option>
      </select>

      <BaseButton @click="submit">Skicka flyttanmälan</BaseButton>

      <KButton @click="submit">Skicka flyttanmälan</KButton>
      <p class="hint" style="margin-top: 8px">
        Anmälan måste göras senast 14 dagar före flytt
      </p>

      <p v-if="reference" style="color: #12b76a; margin-top: 10px">
        Tack! Referensnummer: {{ reference }}
      </p>

      <p v-if="error" style="color: #f04438; margin-top: 10px">
        {{ error }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import KButton from '../components/KButton.vue'
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
```
