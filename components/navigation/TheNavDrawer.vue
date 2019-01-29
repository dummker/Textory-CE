<template>
  <v-navigation-drawer
      fixed
      :clipped="$vuetify.breakpoint.mdAndUp"
      app
      v-model="drawer"
    >
      <v-list dense>
        <template v-for="item in items">
          <v-layout
            row
            v-if="item.heading"
            align-center
            :key="item.heading"
          >
            <v-flex xs6>
              <v-subheader v-if="item.heading">
                {{ item.heading }}
              </v-subheader>
            </v-flex>
            <v-flex xs6 class="text-xs-center">
              <a href="#!" class="body-2 black--text">EDIT</a>
            </v-flex>
          </v-layout>
          <v-list-tile :to="item.to" append :key="item.text">
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>
                {{ item.text }}
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-list>
    </v-navigation-drawer>
</template>
<script>
import { mapState } from 'vuex';

export default {
  props: {
    drawer: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
    }
  },
  computed: {
    ...mapState({
      user: state => state.user.user,
      mod: state => state.mod.mod
    }),
    items: function() {
    
      let items =  [
        { icon: 'home', text: 'Home', to: '/' },
        { icon: 'create', text: 'Geschichte Schreiben', to: '/chapters/new' },
        { icon: 'create', text: 'Welt hinzufügen', to: '/worlds/new' },
        { icon: 'view_list', text: 'Alle Kapitel', to: '/chapters/all' },
        { icon: 'language', text: 'Alle Welten', to: '/worlds/all' },
        { icon: 'dns', text: 'Alle Kategorien', to: '/categories/all' },

      ]

      if (this.user || this.mod) {
        let route = this.user? `/users/${this.user.userid}/profile` : `/mods/${this.mod.id}/profile`
        items.push(
          { icon: 'person', text: 'Profil Editieren', to: route },
          { icon: 'exit_to_app', text: 'Logout', to: '/auth/logout' },
        )
      }
      if (this.mod) {
        items.push(
          { icon: 'person', text: 'Kategorie hinzufügen', to: '/categories/new' },
          { icon: 'people', text: 'Alle User', to: '/users/all' },
        )
      }
      else if (!this.user && !this.mod) {
        items.push(
          { icon: 'person', text: 'Registrieren', to: '/auth/signup' },
          { icon: 'vpn_key', text: 'Einloggen', to: '/auth/signin' }
        )
      }

      return items;
    }
  }
}
</script>
