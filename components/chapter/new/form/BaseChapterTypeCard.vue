<template>
  <v-card @click="cardClick" width="175px" height="140px" :flat="!isSelected">
    <v-layout column justify-center fill-height :class="border">
      <v-spacer></v-spacer>
      <v-flex lg6 text-xs-center>
        <v-icon size="60px" :color="color">{{ chapterType.icon }}</v-icon>
        <div class="subheading font-weight-bold pt-2 secondary--text" :class="{'accent--text': isSelected}">{{ chapterType.title }}</div>
      </v-flex>
      <v-spacer></v-spacer>
    </v-layout>
  </v-card>
</template>
<script>
export default {
  props: {
    chapterType: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    },
    isSelected: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    color: function() {
      return this.isSelected ? 'accent' : 'secondary';
    },
    border: function() {
      return this.isSelected ? 'border__active' : 'border__inactive';
    }
  },
  methods: {
    cardClick: function() {
      this.$emit('cardSelected', this.index);
    }
  }
}
</script>
<style>
  .border__active {
    border: 1px solid #1D09DB;
  }

  .border__inactive {
    border: 1px solid #EBEDF5;
  }
</style>
