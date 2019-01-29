<template>
  <v-container fluid class="pa-0 ma-0" fill-height>
    <v-layout column>
      <the-back-wrapper></the-back-wrapper>
      <v-layout class="mt-5">
        <v-spacer></v-spacer>
        <v-flex xs12 md6>
          <div class="display-2 primary--text text-xs-center">{{ world.weltname }}</div>
          <div class="subheading secondary--text text-xs-center text-uppercase">{{ world.kategorie }}</div>
          <div class="subheading accent--text text-xs-center font-weight-bold"><span class="primary--text font-weight-regular">By </span>{{ world.ersteller }}</div>
        </v-flex>
        <v-spacer></v-spacer>
      </v-layout>
      <v-layout fill-height class="mt-5">
        <v-spacer></v-spacer>
        <v-flex xs12 md6>
          <v-tabs
            slot="extension"
            v-model="tabs"
            centered
            color=""
            slider-color="accent"
            class="white--text"
          >
            <v-tab
              v-for="(header, i) in tabHeader"
              :key="i"
            >
              {{ tabHeader[i] }}
            </v-tab>
          </v-tabs>
          <v-tabs-items v-model="tabs" class="white--text">
            <v-tab-item
              class="white--text"
              v-for="(header,i) in tabHeader"
              :key="i"
            >
              <v-card>
                <v-container fluid fill-height>
                <v-layout column>
                  <base-chapter-card
                    v-for="(chapter,i) in tabContent"
                    :key="i"
                    :goToStart="true"
                    :clickRedirect="true"
                    :chapter="chapter"
                    class="mb-4"
                  ></base-chapter-card>
                </v-layout>
              </v-container>
              </v-card>
            </v-tab-item>
          </v-tabs-items>
        </v-flex>
        <v-spacer></v-spacer>
      </v-layout>
    </v-layout>
  </v-container>
</template>
<script>
import { mapState } from 'vuex'
import BaseWorldCard from '@/components/worlds/BaseWorldCard'
import TheBackWrapper from '@/components/shared/TheBackWrapper'
import BaseChapterCard from '@/components/shared/chapters/BaseChapterCard'

export default {
  components: {
    TheBackWrapper,
    BaseWorldCard,
    BaseChapterCard
  },
  data() {
    return {
      tabs: 0,
      tabHeader: ["Startkapitel", "Alle Kapitel"]
    }
  },
  computed: {
    ...mapState({
      world: state => state.worlds.world,
    }),
    tabContent: function() {
      return this.tabs == 0 ? this.world.startkapitel : this.world.kapitel;
    }
  },
  methods: {
  },
  async fetch ({ store, params }) {
    let weltname = params.weltname;
    let paramCapitalized = weltname[0].toUpperCase() + weltname.substring(1);
    await store.dispatch('worlds/API_GET_WORLD', paramCapitalized);
    await store.dispatch('worlds/API_GET_WORLD_STARTCHAPTER', paramCapitalized);
    await store.dispatch('worlds/API_GET_WORLD_CHAPTERS_ALL', paramCapitalized);
  }
}
</script>
