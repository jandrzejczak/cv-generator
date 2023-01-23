<script lang="ts">
import { ref, reactive, defineComponent } from 'vue';
import RegisterComponent from '../components/Login/RegisterComponent.vue';
import router from '../router';

export default defineComponent({
  name: 'RegisterPage',
  components: {
    RegisterComponent,
  },
  setup() {
    let error = ref({
      status: '',
      message: '',
      color: '',
      show: false,
    });

    function handleRegister(resp: any) {
      if (resp.status === 201) {
        router.push({ path: '/create' });
        return;
      } else {
        error.value = {
          status: resp.status,
          message: resp.data,
          color: 'red',
          show: true,
        };
      }
    }
    return {
      handleRegister,
      error,
    };
  },
});
</script>

<template>
  <v-app id="login-page">
    <v-main class="d-flex justify-center align-center">
      <v-container>
        <v-row class="d-flex justify-center">
          <v-col xs="12" sm="8" md="6">
            <register-component @register="handleRegister" />
            <v-snackbar
              v-model="error.show"
              :timeout="2000"
              :color="error.color"
            >
              {{ error.message }}
            </v-snackbar>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<style scoped></style>
