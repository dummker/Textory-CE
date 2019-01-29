<template>
  <v-layout fill-height>
    <v-spacer></v-spacer>
    <v-flex xl6 lg8>
      <the-chapter-form></the-chapter-form>
    </v-flex>
    <v-spacer></v-spacer>
  </v-layout>
</template>
<script>
import TheChapterForm from '@/components/chapter/new/form/TheChapterForm';

export default {
  components: {
    TheChapterForm
  },
  async fetch ({ store, params }) {
    await store.dispatch('worlds/API_GET_ALL_WORLDS');
  }
}
</script>
