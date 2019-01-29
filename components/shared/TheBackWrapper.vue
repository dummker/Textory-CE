<template>
  <v-layout>
    <v-flex xs12 text-xs-left>
      <v-btn @click="buttonClickBack" icon>
        <v-icon>keyboard_arrow_left</v-icon>
      </v-btn>
    </v-flex>
  </v-layout>
</template>
<script>
export default {
  methods: {
    buttonClickBack: function() {
      this.$router.go(-1);
    }
  }
}
</script>
