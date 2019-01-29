<template>
  <v-card>
    <v-container fluid class="pa-0 ma-0 pa-4">
      <v-layout column>
        <div class="display-1 primary--text">
          {{ world.weltname }}
        </div>
        <div class="caption text-uppercase secondary--text">
          {{ world.kategorie }}
        </div>
        <div class="subheading primary--text">
          {{ world.beschreibung }}
        </div>
        <div class="body-1 accent--text font-weight-medium"><span class="primary--text font-weight-regular">by </span>{{ world.ersteller }}</div>
        <v-layout>
          <v-spacer></v-spacer>
          <v-flex text-xs-right> 
            <v-btn v-if="mod" @click="buttonClickDelete" icon>
              <v-icon>delete</v-icon>
            </v-btn>
            <v-btn @click="cardClick" icon class="accent--text"><v-icon>keyboard_arrow_right</v-icon></v-btn>
          </v-flex>
        </v-layout>
      </v-layout>
        <!-- <the-fullscreen-modal
          v-if="showContinueModal"
          :show="showContinueModal"
          :kapitelnameContinue="chapter.kapitelname"
          v-on:buttonRightClick="setShowContinueModal"
        ></the-fullscreen-modal> -->
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
    world: {
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
    }
  },
  computed: {
    ...mapState({
      user: state => state.user.user,
      mod: state => state.mod.mod
    }),
    modals: function() {
      return [
         {
          type: 'worldDelete',
          value: this.showModalDelete,
          cb: this.modalDeleteCb
        }
      ]
    }
  },
  methods: {
    cardClick: function() {
      this.$router.push(`/worlds/${this.world.weltname}`);
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
    modalDeleteCb: function(value) {
      if (value) {
        this.$store.dispatch('worlds/API_DELETE_WORLD', this.world.weltname)
        .then(responseMessage => {
          this.$store.dispatch('snackbar/setSnackbar', {
            type: 'info',
            message: responseMessage
          })
          this.$router.push('/');
          setTimeout(() => this.$router.push('/worlds/all'))
        })
      }
      this.setShowModalDelete(false)
    },
    buttonClickDelete: function() {
      this.setShowModalDelete(true);
    }
  }
}
</script>
