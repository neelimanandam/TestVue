import Vue from 'vue';
import Vuetify from 'vuetify';
import { required } from 'vuelidate/lib/validators'

export default Vue.component('login', {
  data: () => ({
    username: '',
    password: '',
    valid: true,
    lazy: true,
    showError: false,
    rules: [
      v => !!v || 'Required',
    ]

  }),
  methods :{
    reset () {
        this.$refs.form.reset()
        this.showError=false
      },
    login() {
      if(this.$refs.form.validate()){
        if( this.username=="admin" && this.password=="admin"){
          this.showError = false
          this.$store.commit('login', this.username)
          this.$router.push('/home')
          }
        else{
          this.showError=true
        }
      }
    }
  },
   
  template: `
    <v-row justify="center" align="center">
      <v-col cols="12" xs="12" sm="8" md="6" xl="4" lg="6" class="text-center">
        <v-card>
         <v-card-title>Please login</v-card-title>
         <v-card-text>
          <v-form ref="form" v-model="valid" :lazy-validation="lazy">
           <v-text-field type="text" :rules="rules" v-model="username" label="Username" color="primary" rounded outlined required></v-text-field>
           <v-text-field type="password" :rules="rules" v-model="password" label="Password" color="primary" rounded outlined @keypress.enter="login()" required></v-text-field>
          </v-form>
          <v-subheader v-show="showError" class="red--text">Invalid credentials !</v-subheader>
         </v-card-text>
         <v-card-actions>
          <v-row justify="center" align="center">
           <v-col cols="12" class="text-center">
            <v-btn color="primary" rounded outlined @click="reset()" >Reset</v-btn>
            <v-btn color="primary" rounded outlined @click="login()" :disabled="!valid">Login</v-btn>
           </v-col>
          </v-row>
         </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  `

})
