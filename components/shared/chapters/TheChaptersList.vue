<template>
  <v-layout column fill-height>
    <base-chapter-card
      v-for="(k) in chapters"
      class="mb-5"
      :key="k.id"
      v-on:chapterDelete="setChapterDelete"
      :chapter="k"
      :showDelete="showDelete"
      :clickRedirect="clickRedirect"
    ></base-chapter-card>
    <the-modal-small
      v-for="(modal,i) in modals"
      :key="i"
      v-model="modal.value"
      :showModal="modal.value"
      :type="modal.type"
      v-on:modalCallback="modal.cb"
    ></the-modal-small>
  </v-layout>
</template>
<script>
import { mapState } from 'vuex'
import BaseChapterCard from '@/components/shared/chapters/BaseChapterCard'
import TheModalSmall from '@/components/shared/modal/TheModalSmall'

export default {
  props: {
    chapters: {
      type: Array,
      required: true
    },
    showDelete: {
      type: Boolean,
      default: false
    },
    clickRedirect: {
      type: Boolean,
      default: false
    }
  },
  components: {
    BaseChapterCard,
    TheModalSmall
  },
  data() {
    return {
      showModalDelete: false,
      chapterNameDeleteTemp: '' 
    }
  },
  computed: {
    modals: function() {
      return [
         {
          type: 'chapterDelete',
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
    setChapterDelete: function(chapterName) {
      this.chapterNameDeleteTemp = chapterName;
      this.setShowModalDelete(true);
    },
    modalDeleteCb: function(value) {
      if (value) {
        this.$store.dispatch('chapters/API_DELETE_CHAPTER', this.chapterNameDeleteTemp)
        .then(responseMessage => {
          this.$store.dispatch('snackbar/setSnackbar', {
            type: 'info',
            message: responseMessage
          })
          this.$store.dispatch('user/chapterRemoveFromUser', this.chapterNameDeleteTemp);
          this.$store.dispatch('user/API_GET_USER_CHAPTERS');
        })
      }
      this.setShowModalDelete(false)
    }
  }
}
</script>
