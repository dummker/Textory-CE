<template>
  <v-dialog v-model="showModal" persistent max-width="350">
    <v-card color="dark">
      <v-card-title class="headline text-xs-center">{{ content.title }}</v-card-title>
      <v-card-text>{{ content.text }}</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="accent" flat @click="modalCallback(true)">Yes</v-btn>
        <v-btn color="accent" flat @click="modalCallback(false)">No</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  props: {
    showModal: {
      type: Boolean,
      required: true
    },
    title: {
      type: String,
      required: false
    },
    text: {
      type: String,
      required: false
    },
    type: {
      type: String,
      default: 'custom'
    }
  },
  data() {
    return {
    }
  },
  computed: {
    content: function() {
      if (this.type == 'chapterDelete') {
        return {
          title: 'Delete Chapter?',
          text: 'Are you sure you want to delete this chapter?',
        }
      } else if (this.type == 'worldDelete') {
        return {
          title: 'Delete World?',
          text: 'Are you sure you want to delete this world with all its containing chapters?',
        }
      } else if (this.type == 'userDelete') {
        return {
          title: 'Delete User?',
          text: 'Are you sure you want to delete this user?',
        }
      } else if (this.type == 'categoryDelete') {
        return {
          title: 'Delete Category?',
          text: 'Are you sure you want to delete this category?',
        }
      }
    }
  },
  methods: {
    modalCallback: function(value) {
      this.$emit('modalCallback', value);
    }
  },
}
</script>
