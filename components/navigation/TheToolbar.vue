<template>
  <v-toolbar
      color="accent"
      dark
      app
      :clipped-left="$vuetify.breakpoint.mdAndUp"
      fixed
    >
      <v-toolbar-title style="width: 300px" class="ml-0 pl-3">
        <v-toolbar-side-icon @click.stop="drawerClick"></v-toolbar-side-icon>
        <span class="hidden-sm-and-down"><v-icon size="20px" class="pr-2">compare</v-icon>{{ title }}</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-layout align-center v-if="user || mod">
        <v-spacer></v-spacer>
          <v-avatar size="30px">
            <img
              src="https://cdn.vuetifyjs.com/images/john.jpg"
              alt="John"
              @click="goToUserProfile"
            >
          </v-avatar>
          <span @click="goToUserProfile" class="pl-2 subheading font-weight-medium">{{ mod ? mod.modId : user.userid }}</span>
      </v-layout>
  </v-toolbar>
</template>
<script>
import { mapState } from 'vuex';
export default {
  data() {
    return {
      drawer: false,
      title: "Textory",
    }
  },
  computed: {
    ...mapState({
      user: state => state.user.user,
      mod: state => state.mod.mod
    })
  },
  methods: {
    drawerClick: function() {
      this.drawer = !this.drawer;
      this.$emit('drawerClick', this.drawer);
    },
    goToUserProfile: function() {
      this.$router.push(`/users/${this.user.userid}/profile`);
    },
  }
}
</script>
