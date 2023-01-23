<script lang="ts">
import { reactive, defineComponent } from 'vue';
import axios from 'axios';
import store from '../../store/store';

export default defineComponent({
  name: 'LoginComponent',
  emits: ['login'],
  setup(props, ctx) {
    const formData = reactive({
      email: '',
      password: '',
    });

    async function logIn() {
      await axios({
        method: 'POST',
        url: 'http://localhost:2000/login',
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
          ctx.emit('login', response);
        })
        .catch((error) => {
          ctx.emit('login', error.response);
        });
    }

    return {
      logIn,
      formData,
    };
  },
});
</script>

<template>
  <v-card class="elevation-12">
    <v-toolbar dark color="primary">
      <v-toolbar-title>Login to necuro</v-toolbar-title>
    </v-toolbar>
    <v-card-text>
      <v-form>
        <v-text-field
          name="email"
          label="Email"
          type="email"
          v-model="formData.email"
          prepend-icon="mdi-account"
        ></v-text-field>
        <v-text-field
          id="password"
          name="password"
          label="Password"
          type="password"
          prepend-icon="mdi-lock"
          v-model="formData.password"
        ></v-text-field>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="dark-grey" to="/register">Register</v-btn>
      <v-btn color="primary" @click="logIn()">Login</v-btn>
    </v-card-actions>
  </v-card>
</template>

<style scoped></style>
