<template>
  <v-app>
    <the-snackbar></the-snackbar>
    <the-nav-drawer
      :drawer="drawer"
    ></the-nav-drawer>
    <the-toolbar 
      v-on:drawerClick="setDrawer"
    ></the-toolbar>
    <v-content>
      <v-container class="ma-0 pa-0" fill-height fluid>
        <nuxt/>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  import TheNavDrawer from '@/components/navigation/TheNavDrawer'
  import TheToolbar from '@/components/navigation/TheToolbar'
  import TheSnackbar from '@/components/shared/alert/TheSnackbar'

  export default {
    components: {
      TheNavDrawer,
      TheToolbar,
      TheSnackbar
    },
    data() {
      return {
        drawer: true
      }
    },
    methods: {
      setDrawer: function(value) {
        this.drawer = value;
      }
    }
  }
</script>
