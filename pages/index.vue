<template>
 <v-container accent class="ma-0 pa-0" fluid fill-height>
   <v-layout fill-height >
     <v-spacer></v-spacer>
     <v-flex>
       <v-layout column fill-height justify-center>
         <v-spacer></v-spacer>
        <v-flex text-xs-center>
          <v-layout align-center justify-center>
            <v-icon size="35px" color="white" class="pr-3">compare</v-icon>
            <div class="display-3 white--text font-weight-bold">Textory</div>
          </v-layout>
          <v-layout justify-center class="mt-4">
            <v-btn color="accent" to="/auth/signup">Sign Up</v-btn>
            <v-btn color="white" to="/auth/signin" flat>Sign In</v-btn>
          </v-layout>
        </v-flex>
        <v-spacer></v-spacer>
       </v-layout>
     </v-flex>
     <v-spacer></v-spacer>
   </v-layout>
 </v-container>
</template>

<script>
import { mapState } from 'vuex';

export default {
  components: {

  },
  methods: {
    
  }
}
</script>
