<template>
  <v-snackbar 
    v-model="show"
    top
    :color="type"
    :timeout="3000"
    width="100%"
    class="subheading">
     {{ message }}
  </v-snackbar>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
      show: false,
    }
  },
  computed: {
    ...mapState({
      message: state => state.snackbar.message,
      type: state => state.snackbar.type,
    })
  },
  created: function () {
    this.$store.watch(state => state.snackbar.message, () => {
      if (this.message !== '') {
        this.show = true;
      }
    })
  },
  watch: {
    show: function(value) {
      if(!value) { 
        this.$store.dispatch('snackbar/resetSnackbar')
      }
    }
  }
}
</script>