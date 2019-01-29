<template>
  <v-container fluid fill-height>
    <v-layout column fill-height>
      <div class="display-3 primary--text mb-3 text-xs-center">Alle User</div>
      <v-flex xs12>
       <v-list two-line subheader>
          <v-list-tile
            v-for="user in users"
            :key="user.id"
            avatar
          >
            <v-list-tile-content>
              <v-list-tile-title>{{ user.userid }}</v-list-tile-title>
            </v-list-tile-content>

            <v-list-tile-action>
              <v-btn @click="buttonClickDeleteUser(user.userid)" icon ripple>
                <v-icon color="accent">delete</v-icon>
              </v-btn>
            </v-list-tile-action>
            <v-list-tile-action>
              <v-btn @click="buttonClickGoToUserProfile" icon ripple>
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
import TheModalSmall from '@/components/shared/modal/TheModalSmall'

export default {
  components: {
    TheModalSmall
  },
  data() {
    return {
      showContinueModal: false,
      showModalDelete: false,
      userIdTempDelete: ''
    }
  },
  computed: {
    modals: function() {
      return [
         {
          type: 'userDelete',
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
        this.$store.dispatch('user/API_DELETE_USER', this.userIdTempDelete)
        .then(responseMessage => {
          this.$store.dispatch('snackbar/setSnackbar', {
            type: 'info',
            message: responseMessage
          })
          this.$router.push('/');
          setTimeout(() => this.$router.push('/users/all'))
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
    buttonClickDeleteUser: function(userid) {
      this.userIdTempDelete = userid;
      this.setShowModalDelete(true);
    }
  },
  asyncData ({}) {
    return axios.get('localhost:8080/Users')
    .then((response) => {
      return { users: response.data };
    })
  }
}
</script>
