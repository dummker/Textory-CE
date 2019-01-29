<template>
  <v-container fluid fill-height>
    <v-layout fill-height>
      <div v-if="user.favoriten.length == 0" class="display-1 primary--text">Du hast noch keine Favoriten!</div>
      <v-layout v-else column fill-height>
        <div class="display-1 primary--text">Deine Favoriten</div>
        <the-chapters-list
        :chapters="user.favoriten"
      ></the-chapters-list>
      </v-layout>
    </v-layout>
  </v-container>
</template>
<script>
import { mapState } from 'vuex'
import TheChaptersList from '@/components/shared/chapters/TheChaptersList'

export default {
  components: {
    TheChaptersList
  },
  computed: {
    ...mapState({
      user: state => state.user.user
    })
  }
}
</script>
