<template>
  <v-layout column fill-height>
    <v-spacer></v-spacer>
    <v-flex lg8>
      <v-layout column fill-height>
        <v-flex>
          <the-chapter-form-header
            :stepperMin="stepper.min"
            :stepperMax="stepper.max"
            :stepperCurrent="stepper.current"
          ></the-chapter-form-header>
        </v-flex>
        <v-flex lg12>
          <the-chapter-form-content
            :stepperCurrent="stepper.current"
            v-on:chapterNameChanged="chapterNameChanged"
            v-on:chapterTypeChanged="chapterTypeChanged"
            v-on:chapterTextChanged="chapterTextChanged"
            v-on:chapterWorldChanged="chapterWorldChanged"
          ></the-chapter-form-content>
        </v-flex>
        <v-flex>
          <v-layout>
            <v-spacer></v-spacer>
            <v-flex xs2 class="mx-2">
              <v-btn
                large 
                :flat="stepper.current == stepper.min"
                :class="{'secondary--text': stepper.current == stepper.min}"
                @click="buttonClickPrevious"
                block
                >
                Previous</v-btn>
            </v-flex>
            <v-flex xs2 class="mx-2">
               <v-btn large block @click="buttonClickNext" color="accent">{{ stepper.current != stepper.max ? 'Next' : 'Submit'}}</v-btn>
            </v-flex>
            <v-spacer></v-spacer>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-flex>
    <v-spacer></v-spacer>
  </v-layout>
</template>
<script>
import TheChapterFormHeader from '@/components/chapter/new/form/TheChapterFormHeader';
import TheChapterFormContent from '@/components/chapter/new/form/TheChapterFormContent';

export default {
  components: {
    TheChapterFormHeader,
    TheChapterFormContent
  },
  data() {
    return {
      stepper: {
        min: 1,
        max: 4,
        current: 1
      },
      chapterType: '',
      chapterName: '',
      chapterWorld: '',
      chapterText: ''
    }
  },
  methods: {
    validateField: function() {
      if (this.stepper.current == 1) return this.chapterType != '';
      else if (this.stepper.current == 2) return this.chapterName != '';
      else if (this.stepper.current == 4) return this.chapterText != '';
      return true
    },
    setSnackbar: function(message, type) {
      this.$store.dispatch('snackbar/setSnackbar', 
        { type: type,
          message: message }
      )
    },
    submitChapter: function() {
      let chapter = {
        kapitelname: this.chapterName,
        inhalt: this.chapterText,
        istEnde: this.chapterType.toLowerCase() == 'ende' ? true : false,
        weltname: this.chapterWorld == '' ? 'Standartwelt' : this.chapterWorld
      }

      this.$store.dispatch('chapters/API_POST_CHAPTER', chapter)
      .then(responseMessage => {
        this.setSnackbar(responseMessage, 'info');
        setTimeout(this.$router.push('/chapters/all'), 1500);
      })
      .catch(errorMessage => this.setSnackbar(errorMessage, 'error'));
    },
    buttonClickNext: function() {
      if (this.validateField()) {
        if (this.stepper.current < this.stepper.max) {
          this.stepper.current = this.stepper.current + 1;
        } else  this.submitChapter();
      } else this.setSnackbar('Bitte Form ausfüllen!', 'error');
    },
    buttonClickPrevious: function() {
      if (this.stepper.current > this.stepper.min) {
        this.stepper.current = this.stepper.current-1;
      }
    },
    chapterNameChanged: function(value) {
      this.chapterName = value;
    },
    chapterTextChanged: function(value) {
      this.chapterText = value;
    },
    chapterTypeChanged: function(value) {
      this.chapterType = value;
    },
    chapterWorldChanged: function(value) {
      this.chapterWorld = value;
    }
  }
}
</script>
