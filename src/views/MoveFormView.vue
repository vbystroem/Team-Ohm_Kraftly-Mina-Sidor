<template>
  <div>
    <h1>Flyttanmälan</h1>
    <div class="card" style="max-width: 560px">
      <p style="margin-bottom: 14px">
        Fyll i uppgifterna nedan så flyttar vi ditt elavtal.
      </p>

      <KField
        v-model="form.address"
        label="Ny adress"
        autocomplete="street-address"
        :error="errors.address"
      />

      <KField
        v-model="form.zip"
        label="Postnummer"
        inputmode="numeric"
        autocomplete="postal-code"
        :error="errors.zip"
      />

      <KField
        v-model="form.city"
        label="Ort"
        autocomplete="address-level2"
        :error="errors.city"
      />

      <KField
        v-model="form.date"
        label="Inflyttningsdatum (ÅÅÅÅ-MM-DD)"
        :error="errors.date"
      />

      <label for="move-contract">Avtal</label>
      <select id="move-contract" v-model="form.contract">
        <option disabled value="">Välj avtal</option>
        <option>Rörligt pris</option>
        <option>Fast pris 1 år</option>
        <option>Fast pris 3 år</option>
      </select>

      <KButton type="submit" @click="submit">Skicka flyttanmälan</KButton>
      <p class="hint" style="margin-top: 8px">
        Anmälan måste göras senast 14 dagar före flytt
      </p>

      <p v-if="reference" style="color: #067647; margin-top: 10px">
        Tack! Referensnummer: {{ reference }}
      </p>

      <p v-if="error" style="color: #b42318; margin-top: 10px">
        {{ error }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import KButton from '../components/KButton.vue'
import KField from '../components/KField.vue'
import { submitMove } from '../services/api'
import { validateMove } from '../utils/validateMove'

const form = reactive({
  address: '',
  zip: '',
  city: '',
  date: '',
  contract: '',
})

const errors = reactive({ address: '', zip: '', city: '', date: '' })

const reference = ref(null)
const error = ref(null)

const submit = async () => {
  error.value = null
  const valid = validateMove(form)

  errors.address = valid.address ? '' : 'Fyll i ny adress'
  errors.zip = valid.zip ? '' : 'Postnummer ska vara fem siffror'
  errors.city = valid.city ? '' : 'Fyll i ort'
  errors.date = valid.date ? '' : 'Fyll i inflyttningsdatum'

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
