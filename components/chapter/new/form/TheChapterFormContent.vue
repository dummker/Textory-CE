<template>
  <v-container fluid fill-height class="pa-0 ma-0 pt-5">
    <v-layout column fill-height>
      <v-spacer></v-spacer>
      <v-flex>
        <v-layout align-center justify-center v-if="stepperCurrent == 1">
          <base-chapter-type-card 
            v-for="(chapterType,i) in chapterTypes" 
            :key="i" 
            v-on:cardSelected="setChapterTypeSelectedIndex"
            :chapterType="chapterType"
            :index="i"
            :isSelected="i == chapterTypeSelectedIndex"
            class="mx-2"></base-chapter-type-card>
        </v-layout>
        <v-layout align-center justify-center v-if="stepperCurrent == 2">
          <v-spacer></v-spacer>
          <v-flex xs8>
            <v-text-field v-model="chapterName" @input="chapterNameChanged" label="Kapitel Name" color="accent"></v-text-field>
          </v-flex>
          <v-spacer></v-spacer>
        </v-layout>
        <v-layout align-center justify-center v-if="stepperCurrent == 3">
          <v-spacer></v-spacer>
          <v-flex xs8>
            <v-select
                placeholder="Worlds"
                :items="worlds"
                item-text="weltname"
                @input="inputWorldnameSelected"
              ></v-select>
          </v-flex>
          <v-spacer></v-spacer>
        </v-layout>
        <v-layout align-center justify-center v-if="stepperCurrent == 4">
          <v-spacer></v-spacer>
          <v-flex xs8>
            <v-textarea v-model="chapterText" @input="chapterTextChanged" :rows="8" label="Kapitel Text" color="accent"></v-textarea>
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
import BaseChapterTypeCard from '@/components/chapter/new/form/BaseChapterTypeCard';

export default {
  props: {
    stepperCurrent: {
      type: Number,
      required: true
    },
  },
  components: {
    BaseChapterTypeCard
  },
  data() {
    return {
      chapterTypes: [
        {
          title: 'Anfang',
          icon: 'extension'
        },
        {
          title: 'Ende',
          icon: 'speaker_notes_off'
        }
      ],
      chapterTypeSelectedIndex: null,
      chapterName: '',
      chapterText: '',
      chapterWorld: 'Standartwelt'
    }
  },
  computed: {
    ...mapState({
      worlds: state => state.worlds.worlds
    })
  },
  methods: {
    setChapterTypeSelectedIndex: function(index) {
      this.chapterTypeSelectedIndex = index;
      this.$emit('chapterTypeChanged', this.chapterTypes[index].title);
    },
    chapterTextChanged: function() {
      this.$emit('chapterTextChanged', this.chapterText);
    },
    chapterNameChanged: function() {
      this.$emit('chapterNameChanged', this.chapterName);
    },
    chapterWorldChanged: function() {
       this.$emit('chapterWorldChanged', this.chapterWorld);
    },
    inputWorldnameSelected: function(value) {
      this.chapterWorld = value;
      this.chapterWorldChanged();
    }
  }
}
</script>
