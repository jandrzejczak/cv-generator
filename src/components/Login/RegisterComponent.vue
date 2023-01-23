<script lang="ts">
import { reactive, defineComponent } from 'vue';
import axios from 'axios';
import store from '../../store/store';

export default defineComponent({
  name: 'RegisterComponent',
  emits: ['register'],
  setup(props, ctx) {
    const formData = reactive({
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      confirmPassword: '',
    });

    const showPasswords = reactive({
      pass: false,
      confPass: false,
    });

    async function register() {
      await axios({
        method: 'POST',
        url: 'http://localhost:2000/register',
        headers: {
          'Content-Type': 'application/json',
        },
        data: JSON.stringify(formData),
      })
        .then((response) => {
          store.actions.setUser({
            firstname: response.data.first_name,
            lastname: response.data.last_name,
            ...response.data,
          });
          ctx.emit('register', response);
        })
        .catch((error) => {
          ctx.emit('register', error.response);
        });
    }

    return {
      register,
      formData,
      showPasswords,
    };
  },
});
</script>

<template>
  <v-card class="elevation-12">
    <v-toolbar dark color="primary">
      <v-toolbar-title>Register to necuro</v-toolbar-title>
    </v-toolbar>
    <v-card-text>
      <v-form>
        <v-text-field
          name="firstName"
          label="First name"
          type="text"
          v-model="formData.first_name"
          append-inner-icon="mdi-pencil"
        ></v-text-field>
        <v-text-field
          name="lastName"
          label="Last name"
          type="text"
          v-model="formData.last_name"
          append-inner-icon="mdi-pencil"
        ></v-text-field>
        <v-text-field
          name="email"
          label="Email"
          type="email"
          v-model="formData.email"
          append-inner-icon="mdi-email"
        ></v-text-field>
        <v-text-field
          id="password"
          name="password"
          label="Password"
          :type="showPasswords.pass ? 'text' : 'password'"
          :append-inner-icon="showPasswords.pass ? 'mdi-eye' : 'mdi-eye-off'"
          v-model="formData.password"
          @click:append-inner="showPasswords.pass = !showPasswords.pass"
        ></v-text-field>
        <v-text-field
          id="passwordConfirm"
          name="passwordConfirm"
          label="Confirm password"
          :type="showPasswords.confPass ? 'text' : 'password'"
          :append-inner-icon="
            showPasswords.confPass ? 'mdi-eye' : 'mdi-eye-off'
          "
          v-model="formData.confirmPassword"
          @click:append-inner="showPasswords.confPass = !showPasswords.confPass"
        ></v-text-field>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="dark-grey" to="/login">Login</v-btn>
      <v-btn color="primary" @click="register()">Register</v-btn>
    </v-card-actions>
  </v-card>
</template>

<style scoped></style>
