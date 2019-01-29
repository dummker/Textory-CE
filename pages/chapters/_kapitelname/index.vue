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
            :goToStart="true"
            ></base-chapter-card>
            <v-layout align-center class="pt-2">
              <v-flex>
                <v-btn 
                  :to="`/chapters/${chapter.vorgaenger}`"
                  :disabled="!chapter.vorgaenger">{{ chapter.vorgaenger ? `Go Back to  ${chapter.vorgaenger}` : 'There are no predecessors..'}}</v-btn>
              </v-flex>
              <v-spacer></v-spacer>
              <v-flex>
                <v-select
                  v-if="chapterContinue.length != 0"
                  placeholder="Continuations"
                  :items="chapterContinue"
                  item-text="kapitelname"
                  @input="inputChapterContinueSelected"
                ></v-select>
                <div v-else class="subheading font-weight-medium text-xs-right">There are no continuations..</div>
              </v-flex>
            </v-layout>
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
  data () {
    return {
    }
  },
  computed: {
    ...mapState({
      chapter: state => state.chapters.chapter,
      chapterContinue: state => state.chapters.chapterContinue
    })
  },
  methods: {
    inputChapterContinueSelected: function(value) {
      this.$router.push(`/chapters/${value}`)
    }
  },
  async fetch ({ store, params }) {
    await store.dispatch('chapters/API_GET_CHAPTER', params.kapitelname);
    await store.dispatch('chapters/API_GET_CHAPTER_CONTINUE', params.kapitelname);
  }
}
</script>
