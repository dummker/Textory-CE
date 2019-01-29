<template>
  <v-container fluid fill-height>
    <v-layout column fill-height>
      <div class="display-3 primary--text mb-3 text-xs-center">All Categories</div>
      <v-flex xs12>
        <v-list two-line subheader>
          <v-list-tile
            v-for="(category,i) in categories"
            :key="i"
          >
            <v-list-tile-content>
              <v-list-tile-title>{{ category.name }}</v-list-tile-title>
            </v-list-tile-content>

            <v-list-tile-action v-if="mod">
              <v-btn @click="buttonClickDeleteCategory(category.name)" icon ripple>
                <v-icon color="accent">delete</v-icon>
              </v-btn>
            </v-list-tile-action>
            <v-list-tile-action>
              <v-btn @click="buttonClickSelectCategory(category.name)" icon ripple>
                <v-icon color="accent">keyboard_arrow_right</v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>

          <v-divider inset></v-divider>
        </v-list>
      </v-flex>
    </v-layout>
    <the-modal-small
      v-for="(modal,i) in modals"
      :key="i"
      v-model="modal.value"
      :showModal="modal.value"
      :type="modal.type"
      v-on:modalCallback="modal.cb"
    ></the-modal-small>
  </v-container>
</template>
<script>
import axios from "axios"
import { mapState } from 'vuex'
import TheModalSmall from '@/components/shared/modal/TheModalSmall'

export default {
  components: {
    TheModalSmall
  },
  data() {
    return {
      showContinueModal: false,
      showModalDelete: false,
      categoryTempDelete: ''
    }
  },
  computed: {
    ...mapState({
      mod: state => state.mod.mod
    }),
    modals: function() {
      return [
         {
          type: 'categoryDelete',
          value: this.showModalDelete,
          cb: this.modalDeleteCb
        }
      ]
    }
  },
  methods: {
    setShowModalDelete: function(value) {
      this.showModalDelete = value;
    },
    modalDeleteCb: function(value) {
      if (value) {
        this.$store.dispatch('categories/API_DELETE_CATEGORY', this.categoryTempDelete)
        .then(responseMessage => {
          this.$store.dispatch('snackbar/setSnackbar', {
            type: 'info',
            message: responseMessage
          })
          this.$router.push('/');
          setTimeout(() => this.$router.push('/categories/all'))
        })
        .catch(errorMessage => {
          this.$store.dispatch('snackbar/setSnackbar', {
            type: 'error',
            message: errorMessage
          })
        })
      }
      this.setShowModalDelete(false)
    },
    buttonClickDeleteCategory: function(category) {
      this.categoryTempDelete = category;
      this.setShowModalDelete(true);
    },
    buttonClickSelectCategory: function(category) {
      this.$store.dispatch('categories/setCategory', category);
      this.$router.push(`/categories/${category}`)
    } 
  },
  asyncData ({}) {
    return axios.get('localhost:8080/Kategorie')
    .then((response) => {
      return { categories: response.data };
    })
  }
}
</script>
