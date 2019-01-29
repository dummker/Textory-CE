<template>
  <v-layout column align-center>
    <div class="body-2 text-uppercase secondary--text">
      {{ stepperCurrent }} / {{ stepperMax }}
    </div>
    <div class="display-1 font-weight-bold primary--text pt-2">
      {{ titles[stepperCurrent-1]}}
    </div>
  </v-layout>
</template>
<script>
export default {
  props: {
    stepperCurrent: {
      type: Number,
      required: true
    },
    stepperMin: {
      type: Number,
      required: true
    },
    stepperMax: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      titles: [
        'Was für einen Typ Geschichte schreibst du?', 
        'Wie soll dein Kapitel heißen?', 
        'Wie soll deine Welt heißen?',
        'Schreibe dein Kapitel!'
      ]
    }
  }
}
</script>
