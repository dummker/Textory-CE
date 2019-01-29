<template>
  <v-container>
    <the-chapters-list
      :chapters="chapters"
    ></the-chapters-list>
  </v-container>
</template>
<script>
import { mapState } from 'vuex'
import TheChaptersList from '@/components/shared/chapters/TheChaptersList'

export default {
  props: {
  },
  computed: {
    ...mapState({
      chapters: state => state.user.user.kapitel
    })
  },
  components: {
    TheChaptersList
  }
}
</script>
