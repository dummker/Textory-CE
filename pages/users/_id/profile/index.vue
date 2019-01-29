<template>
  <the-user-profile></the-user-profile>
</template>
<script>
import TheUserProfile from '@/components/user/profile/TheUserProfile'

export default {
  components: {
    TheUserProfile
  },
  computed: {
  },
  methods: {
  },
  async fetch ({ store, params }) {
    await store.dispatch('user/API_GET_USER_CHAPTERS');
  }
}
</script>
