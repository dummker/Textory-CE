<template>
  <v-container fluid fill-height class="">
    <v-layout>
      <v-spacer></v-spacer>
      <v-flex xs6>
        <v-layout column justify-start fill-height>
          <v-flex>
            <div class="display-3 primary--text mb-3 text-xs-center">All Worlds</div>
            <v-select
              autocomplete
              :loading="loading"
              :items="items"
              item-text="kapitelname"
              return-object
              :search-input.sync="search"
              v-model="select"
              cache-items
              class="subheading white--text pa-0 ma-0"
              :class="{'mx-2': this.$vuetify.breakpoint.mdAndUp}"
              hide-details
              hide-no-data
              label="Search for World"
              @click:append-outer="appendOuterIconClick"
              append-icon="search"
              solo
              ref="placesAutocomplete"
              color="accent"
            ></v-select>
          </v-flex>
          <v-flex xs12 class="mt-5">
            <v-layout column>
               <base-world-card
                v-for="(world,i) in worlds"
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
      loading: false,
      items: [],
      search: null,
      select: null,
      iconOuterAppend: 'search',
    }
  },
  computed: {
    ...mapState({
      worlds: state => state.worlds.worlds
    }),
    filteredChapters: function() {
      if (this.search == null) return this.chapters 
      else return this.items;
    }
  },
  methods: {
    setIconAppend: function() {
      this.iconOuterAppend = this.search ? 'clear': 'search' ;
    },
    drawerClick: function() {
      this.drawer = !this.drawer;
      this.$emit('drawerClick', this.drawer);
    },
    goToUserProfile: function() {
      this.$router.push(`/users/${this.user.userid}/profile`);
    },
    querySelections (searchQuery) {
      this.loading = true
      this.$store.dispatch('worlds/API_GET_ALL_WORLDS', searchQuery)
        .then((items) => {
          this.items = items;
          this.loading = false;
        })
    },
    setIconAppend: function() {
      this.iconOuterAppend = this.search ? 'clear': 'search' ;
    },
    appendOuterIconClick: function() {
      if (this.iconOuterAppend == 'clear') {
        this.search = null;
        this.$emit('clearPOI')
      } else {}
    }
  },
  watch: {
    search (searchQuery) {     
      this.setIconAppend();
      searchQuery && this.querySelections(searchQuery);
    },
    select (selected) {
      this.$refs.placesAutocomplete.blur();
      this.$store.dispatch('chapters/setChapter', selected);
      this.$router.push(`/chapters/${selected.kapitelname}`)
    },
  },
  async fetch ({ store, params }) {
    await store.dispatch('worlds/API_GET_ALL_WORLDS');
  }
}
</script>
