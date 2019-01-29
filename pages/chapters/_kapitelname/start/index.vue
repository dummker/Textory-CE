<template>
  <v-container fluid class="pa-0 ma-0" fill-height>
    <v-layout column>
      <the-back-wrapper></the-back-wrapper>
      <v-layout fill-height class="mt-5">
        <v-spacer></v-spacer>
        <v-flex xs6>
          <base-chapter-card
            :chapter="chapter"
            :clickRedirect="true"
            ></base-chapter-card>
        </v-flex>
        <v-spacer></v-spacer>
      </v-layout>
    </v-layout>
  </v-container>
</template>
<script>
import { mapState } from 'vuex'
import BaseChapterCard from '@/components/shared/chapters/BaseChapterCard'
import TheBackWrapper from '@/components/shared/TheBackWrapper'

export default {
  components: {
    BaseChapterCard,
    TheBackWrapper
  },
  computed: {
    ...mapState({
      chapter: state => state.chapters.chapter
    })
  },
  async fetch ({ store, params }) {
    await store.dispatch('chapters/API_GET_CHAPTER_START', params.kapitelname);
  }
}
</script>
