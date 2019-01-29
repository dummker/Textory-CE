<template>
  
</template>
<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      mod: state => state.mod.mod
    })
  },
  mounted() {
    this.$store.dispatch('snackbar/setSnackbar', {
      message: 'You successfully logged out!',
      type: 'info'
    });
    this.$store.dispatch('user/logout');
    if (this.mod) this.$store.dispatch('mod/logout');
    setTimeout(() => {
      this.$router.push('/');
    }, 1500)
  }
}
</script>
