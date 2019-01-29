<template>
  <v-card>
    <v-container fluid class="pa-0 ma-0 pa-4">
      <v-layout column>
        <span @click="cardClick" class="body-2 text-uppercase secondary--text">
          {{ chapter.weltname }}
        </span>
        <div class="display-1 primary--text font-weight-bold text-capitalize">
          {{ chapter.kapitelname ? chapter.kapitelname : chapter.kapitelName }}
        </div>
        <div class="body-2 accent--text font-weight-medium text-capitalize pb-3">
          <span class="primary--text"> by</span> {{ chapter.author ? chapter.author : 'null' }}
        </div>
        <div class="subheading font-weight-regular primary--text text-capitalize">
          {{ chapter.inhalt }}
        </div>
      </v-layout>
      <v-layout class="mt-5">
        <v-spacer></v-spacer>
          <v-flex text-xs-right> 
            <v-btn @click.native="buttonClickContinue" :disabled="chapter.istEnde" class="white--text" color="accent">
              Continue Story
            </v-btn>
            <v-btn @click.native="buttonClickStart" :disabled="!goToStart || chapter.vorgaenger == null" class="accent--text" flat>
              Go To Start
            </v-btn>
          </v-flex>
          <v-spacer></v-spacer>
          <v-flex text-xs-right>
             <v-btn @click.native="buttonClickFavorite" v-if="user" icon>
              <v-icon color="yellow darken-2">{{ isUserFavorite ? 'star' : 'star_border'}}</v-icon>
            </v-btn>
            <v-btn @click.native="buttonClickDelete" :disabled="!(user != null && user.userid == chapter.author)" icon>
              <v-icon>delete</v-icon>
            </v-btn>
            <v-btn @click="cardClick" icon class="accent--text"><v-icon>keyboard_arrow_right</v-icon></v-btn>
          </v-flex>
        </v-layout>
        <the-fullscreen-modal
          v-if="showContinueModal"
          :show="showContinueModal"
          :kapitelnameContinue="chapter.kapitelname"
          v-on:buttonRightClick="setShowContinueModal"
        ></the-fullscreen-modal>
        <the-modal-small
          v-for="(modal,i) in modals"
          :key="i"
          v-model="modal.value"
          :showModal="modal.value"
          :type="modal.type"
          v-on:modalCallback="modal.cb"
        ></the-modal-small>
    </v-container>
  </v-card>
</template>
<script>
import { mapState } from 'vuex';
import TheFullscreenModal from '@/components/shared/modal/TheFullscreenModal';
import TheModalSmall from '@/components/shared/modal/TheModalSmall'

export default {
  props: {
    chapter: {
      type: Object,
      required: true
    },
    showDelete: {
      type: Boolean,
      default: false
    },
    clickRedirect: {
      type: Boolean,
      default: false
    },
    goToStart: {
      type: Boolean,
      default: false
    }
  },
  components: {
    TheFullscreenModal,
    TheModalSmall
  },
  data() {
    return {
      showContinueModal: false,
      showModalDelete: false,
      chapterNameDeleteTemp: '' 
    }
  },
  computed: {
    ...mapState({
      user: state => state.user.user,
    }),
    modals: function() {
      return [
         {
          type: 'chapterDelete',
          value: this.showModalDelete,
          cb: this.modalDeleteCb
        }
      ]
    },
    isUserFavorite: function() {
      if (this.user && this.user.favoriten) {
        return this.user.favoriten.some(favorite => favorite.kapitel.kapitelName == this.chapter.kapitelname);
      }
    }
  },
  methods: {
    buttonClickDelete: function() {
      this.setShowModalDelete(true);
    },
    cardClick: function() {
      if (this.clickRedirect) this.$router.push(`/chapters/${this.chapter.kapitelname}`);
    },
    buttonClickStart: function() {
      this.$store.dispatch('chapters/API_GET_CHAPTER_START', this.chapter.kapitelname)
      .then((result) => {
        this.$router.push(`/chapters/${result.kapitelname}`)
      })
    },
    buttonClickContinue: function() {
      if (!this.chapter.istEnde) this.showContinueModal = true;
    },
    setShowContinueModal: function(value) {
      this.showContinueModal = value;
    },
    setShowModalDelete: function(value) {
      this.showModalDelete = value;
    },
    setChapterDelete: function(chapterName) {
      this.chapterNameDeleteTemp = chapterName;
      this.setShowModalDelete(true);
    },
    setSnackbar: function(type, message) {
      let snackbar = {
        type: type,
        message: message
      }
      this.$store.dispatch("snackbar/setSnackbar", snackbar);
    },
    modalDeleteCb: function(value) {
      if (value) {
        this.$store.dispatch('chapters/API_DELETE_CHAPTER', this.chapter.kapitelname)
        .then(responseMessage => {
          this.setSnackbar('info', responseMessage);
          this.$store.dispatch('user/chapterRemoveFromUser', this.chapterNameDeleteTemp)
          .then(() => {
            this.$router.go('/chapters/all');
          })
          
        })
      }
      this.setShowModalDelete(false)
    },
    buttonClickFavorite: function() {
      if (this.isUserFavorite) {
        this.$store.dispatch('user/API_DELETE_FAVORITE', this.chapter.kapitelname)
        .then((responseMessage) => {
          this.setSnackbar('info', responseMessage);
        })
        .catch((errorMessage) => {
          this.setSnackbar('error', errorMessage);
        })
      } else {
        this.$store.dispatch('user/API_POST_FAVORITE', this.chapter.kapitelname)
        .then((responseMessage) => {
          this.setSnackbar('info', responseMessage);
        })
        .catch((errorMessage) => {
          this.setSnackbar('error', errorMessage);
        })
      }
    }
  }
}
</script>
