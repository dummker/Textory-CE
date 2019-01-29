<template>
  <v-container fluid fill-height class="pa-0 ma-0">
    <v-layout justify-center fill-height>
      <v-spacer></v-spacer>
      <v-flex xs12 sm12 md6 lg4 xl3>
        <v-layout column fill-height class="">
          <v-spacer></v-spacer>
          <v-flex xs10>
            <div class="text-xs-center headline primary--text font-weight-medium">Welcome to</div>
            <v-layout align-center justify-center>
              <v-icon size="35px" color="accent" class="pr-3">compare</v-icon>
              <div class="display-3 accent--text font-weight-bold">Textory</div>
            </v-layout>
            <div class="subheading secondary--text font-weight-regular text-xs-center pt-4 pb-3">Use your email {{ signIn ? 'account to log in' : 'for registration' }}</div>
            <v-text-field
              :label="mod? 'Modname' : 'Username'"
              box
              color="accent"
              class="pa-0 ma-0"
              v-model="inputUserid"
            ></v-text-field>
            <v-text-field
              v-if="!mod"
              label="Email"
              box
              color="accent"
              class="pa-0 ma-0"
              v-model="inputEmail"
            ></v-text-field>
            <v-layout justify-end class="mb-4">
              <v-btn 
                class="body-1 mt-0 text-capitalize"
                color="accent"
                small
                flat 
                @click="buttonClickChangeUser">
                {{ signIn ? 'Sign In' : 'Sign Up'}} {{ mod ? 'user' : 'mod' }}
              </v-btn>
            </v-layout>
            <v-layout text-xs-center justify-center class="mt-3 mb-2 px-2">
              <v-btn 
                class="subheading px-5 text-capitalize" 
                color="accent"
                large
                @click="buttonClickSubmit">
                {{ signIn ? 'Sign in' : 'Sign up'}}
              </v-btn>
              <v-btn 
                class="subheading px-5 text-capitalize"
                color="accent"
                large 
                outline
                @click="buttonClickSecondary">
                {{ signIn ? 'Sign up' : 'Sign In'}}
              </v-btn>
            </v-layout>
          </v-flex>
        </v-layout>          
      </v-flex>
      <v-spacer></v-spacer>
    </v-layout>
  </v-container>
</template>
<script>
import { mapState } from 'vuex';

export default {
  props: {
    signIn: {
      type: Boolean, 
      required: true
    }
  },
  components: {
  },
  data() {
    return {
      inputUserid: '',
      inputEmail: '',
      mod: false
    }
  },
  computed: {
    ...mapState({
    }),
  },
  methods: {
    setSnackbar: function(message, type) {
      this.$store.dispatch('snackbar/setSnackbar', {
        type: type,
        message: message
      });
    },
    redirectTo: function(route, timeout) {
      if (timeout) {
        setTimeout(() => {
        this.$router.push(route);
      }, 1500)
      } else this.router.push(route);
    },
    resetInputForm: function() {
      this.inputUserid = '';
      this.inputEmail = '';
    },
    buttonClickSubmit: function() {
      if (this.mod) {
        let modData = {
          modId: this.inputUserid
        }
        let actionName = this.signIn ? 'mod/signIn' : 'mod/API_POST_MOD';
        this.$store.dispatch(actionName, modData)
        .then((responseMessage) => {
          this.setSnackbar(responseMessage, 'info');
          this.redirectTo('/', true);
          this.resetInputForm();
        })
        .catch((errorMessage) => {
          this.setSnackbar(errorMessage, 'error');
        })
      } else {
        let userData = {
          email: this.inputEmail,
          userid: this.inputUserid
        }
        let actionName = this.signIn ? 'user/signIn' : 'user/API_POST_USER';
        this.$store.dispatch(actionName, userData)
        .then((responseMessage) => {
          this.setSnackbar(responseMessage, 'info');
          this.redirectTo('/chapters/all', true);
          this.resetInputForm();
        })
        .catch((errorMessage) => {
          this.setSnackbar(errorMessage, 'error');
        })
      }
    },
    buttonClickSecondary: function() {
      if (this.signIn) this.redirectTo('/auth/signup', true);
      else  this.redirectTo('/auth/signin', true);
    },
    buttonClickChangeUser: function() {
      this.mod = !this.mod;
    }
  }
}
</script>
<style scoped>
</style>