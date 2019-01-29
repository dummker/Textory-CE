<template>
  <v-dialog 
    v-model="show" 
    persistent 
    max-width="1000px" 
    >
    <v-toolbar flat color="accent" :class="{'fixed': $vuetify.breakpoint.smAndDown}">
    <v-spacer></v-spacer>
    <v-toolbar-title class="display-1 white--text">{{ title }}</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-btn icon dark @click="buttonRightClick()">
        <v-icon>close</v-icon>
      </v-btn>
    </v-toolbar-items>
  </v-toolbar>
    <v-card class="">
      <v-container fluid class="ma-0 pa-0 pa-4">
        <v-layout>
          <v-spacer></v-spacer>
          <v-flex xs12 md10 lg8 xl6>
            <v-layout column>
              <div class="subheading font-weight-medium primary--text">Fortsetzung: {{ kapitelnameContinue }}</div>
              <v-text-field v-model="chapterName" class="mt-3" label="Neuer Kapitel Name" color="accent"></v-text-field>
              <v-textarea v-model="chapterText" class="mt-3" :rows="8" label="Neuer Kapitel Text" color="accent"></v-textarea>
              <v-switch
                label="Geschichte ist Ende"
                v-model="chapterIsEnd"
              ></v-switch>
              <v-layout class="mt-4 pb-2">
                <v-spacer></v-spacer>
                <v-flex text-xs-right>
                  <v-btn color="accent" @click="buttonClickSubmit">Submit</v-btn>
                </v-flex>
              </v-layout>
            </v-layout>
          </v-flex>
          <v-spacer></v-spacer>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  components: {

  },
  props: {
    show: {
      type: Boolean,
      required: true
    },
    kapitelnameContinue: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      title: "Fortsetzung schreiben",
      chapterName: '',
      chapterText: '',
      chapterIsEnd: false
    }
  },
  computed: {
  },
  methods: {
    buttonRightClick: function() {
      this.$emit('buttonRightClick', false);
    },
    buttonClickSubmit: function() {
      let newChapter = {
        kapitelname: this.chapterName,
        inhalt: this.chapterText,
        continue: this.kapitelnameContinue,
        istEnde: this.chapterIsEnd
      };
      this.$store.dispatch('chapters/API_POST_CHAPTER_CONTINUE', newChapter)
      .then((responseMessage) => {
        this.$store.dispatch('snackbar/setSnackbar', {
          type: 'info',
          message: responseMessage
        })
        this.buttonRightClick();
      })
      .catch((errorMessage) => {
         this.$store.dispatch('snackbar/setSnackbar', {
          type: 'error',
          message: errorMessage
        })
      })

    }
  }
}
</script>
