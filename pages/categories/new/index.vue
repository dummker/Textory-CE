<template>
  <v-container fluid fill-height class="pa-0 ma-0 pt-5">
    <v-layout column fill-height justify-center>
      <v-spacer></v-spacer>
      <v-flex>
        <v-layout column align-center fill-height>
          <div class="display-1 font-weight-bold primary--text pt-2">
            Neue Kategorie Hinzufügen
          </div>
        </v-layout>
      </v-flex>
      <v-flex>
        <v-layout align-center justify-center>
          <v-spacer></v-spacer>
          <v-flex xs8>
            <v-text-field v-model="category" label="Kategorie" color="accent"></v-text-field>
          </v-flex>
          <v-spacer></v-spacer>
        </v-layout>
      </v-flex>
      <v-flex>
        <v-layout justify-end>
          <v-spacer></v-spacer>
          <v-flex xs8 text-xs-right>
            <v-btn @click="buttonClickSubmit" color="accent">Submit</v-btn>
          </v-flex>
          <v-spacer></v-spacer>
        </v-layout>
      </v-flex>
      <v-spacer></v-spacer>
    </v-layout>
  </v-container>
</template>
<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      category: '',
    }
  },
  computed: {
    ...mapState({
      categories: state => state.categories.categories,
      mod: state => state.mod.mod
    }),
    items: function() {
      let defaultCategory = [ {name: 'Standartkategorie'} ];
      return this.categories.length == 0 ? defaultCategory : this.categories;
    }
  },
  methods: {
    setSnackbar: function(type, message) {
      this.$store.dispatch('snackbar/setSnackbar', 
      {
        type: type,
        message: message
      })
    },
    redirect: function(route) {
      setTimeout(() => {
        this.$router.push(route)
      }, 1500);
    },
    buttonClickSubmit: function() {
      if (this.category != '') {
        let category = {
          name: this.category
        }
        this.$store.dispatch('categories/API_POST_CATEGORY', category)
        .then((responseMessage) => {
          this.setSnackbar('info', responseMessage);
          this.redirect('/categories/all')
        })
        .catch((errorMessage) => {
          this.setSnackbar('error', errorMessage);
          this.redirect('/auth/signin')
        })
      }
    }
  },
  mounted: function(){
    if (!this.mod) {
      this.setSnackbar('error', 'Only moderators are allowed to add categories. Please sign in!')
      this.redirect('/auth/signin');
    }
  }
}
</script>
