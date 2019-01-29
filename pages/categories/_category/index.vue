<template>
  <v-container fluid fill-height>
    <v-layout column>
        <v-btn @click="buttonClickBack" icon>
          <v-icon>keyboard_arrow_left</v-icon>
        </v-btn>
      <div class="title primary--text mb-3 text-xs-center text-uppercase accent--text">{{ category }}</div>
      <div class="display-3 primary--text mb-3 text-xs-center">All Worlds</div>
      <v-layout>
      <v-spacer></v-spacer>
      <v-flex xs6>
        <v-layout column justify-start fill-height>
          <v-flex xs12 class="mt-5">
            <v-layout column>
               <base-world-card
                v-for="(world,i) in filteredWorlds"
                :key="i"
                :world="world"
                class="mb-4"
               ></base-world-card>
            </v-layout>
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
import BaseWorldCard from '@/components/worlds/BaseWorldCard'

export default {
  components: {
    BaseWorldCard
  },
  data() {
    return {
    }
  },
  computed: {
    ...mapState({
      worlds: state => state.worlds.worlds,
      category: state => state.categories.category
    }),
    filteredWorlds: function() {
      return this.worlds.filter(world => world.kategorie == this.category)
    }
  },
  methods: {
    buttonClickBack: function() {
      this.$router.go(-1);
    }
  },
  async fetch ({ store, params }) {
    await store.dispatch('worlds/API_GET_ALL_WORLDS');
  }
}
</script>
