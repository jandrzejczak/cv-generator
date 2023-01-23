<script lang="ts">
import { reactive, computed, defineComponent, ref, Ref } from 'vue';
import store from '../store/store';
import axios from 'axios';

export default defineComponent({
  name: 'AccountView',
  props: {},
  components: {},
  setup() {
    const staticUser = {
      firstname: store.loggedUser.firstname,
      lastname: store.loggedUser.lastname,
      email: store.loggedUser.email,
    };

    const formData = reactive({
      first_name: staticUser.firstname,
      last_name: staticUser.lastname,
      email: staticUser.email,
      password: '',
      current_password: '',
    });

    let error = ref({
      status: '',
      message: '',
      color: '',
      show: false,
    });

    const formDisabled = ref(true);

    const imageData = ref() as Ref<Array<File>>;

    const showPasswords = reactive({
      pass: false,
      confPass: false,
    });

    function getInitials(firstname: string, lastname: string) {
      if (firstname && lastname) {
        return `${firstname[0].toUpperCase()}${lastname[0].toUpperCase()}`;
      }
      return '';
    }

    function handleSnackbar(resp: any) {
      if (resp.status === 200) {
        error.value = {
          status: resp.status,
          message: 'Successfully updated account data!',
          color: 'success',
          show: true,
        };
      } else {
        error.value = {
          status: resp.status,
          message: resp.data,
          color: 'red',
          show: true,
        };
      }
    }

    async function updateUserData() {
      await axios({
        method: 'POST',
        url: 'http://localhost:2000/update-user',
        headers: {
          'x-access-token': store.loggedUser.token,
          'Content-Type': 'application/json',
        },
        data: JSON.stringify(formData),
      })
        .then((response) => {
          console.log(response);
          store.actions.setUser({
            firstname: response.data.first_name,
            lastname: response.data.last_name,
            ...response.data,
          });
          handleSnackbar(response);
        })
        .catch((error) => {
          handleSnackbar(error.response);
        });
    }

    async function updateProfilePicture() {
      const formData = new FormData();
      formData.append('image', imageData.value[0]);
      await axios({
        method: 'POST',
        url: 'http://localhost:2000/upload-image',
        headers: {
          'x-access-token': store.loggedUser.token,
          'Content-Type': 'multipart/form-data,',
        },
        data: formData,
      })
        .then((response) => {
          console.log(response);
          store.actions.setUserSingleProperty("avatar", response.data.avatar);
          handleSnackbar(response);
        })
        .catch((error) => {
          handleSnackbar(error.response);
          console.error('Error:', error);
        });
    }

    return {
      formData,
      showPasswords,
      imageData,
      getInitials,
      store,
      updateProfilePicture,
      formDisabled,
      updateUserData,
      error,
    };
  },
});
</script>

<template>
  <v-row style="height: 100%">
    <v-col cols="7">
      <v-card>
        <v-card-title>
          <div class="text-overline mb-1">Account</div>
          Change your account data.
        </v-card-title>
        <v-card-text>
          <v-form :disabled="formDisabled">
            <v-text-field
              name="firstName"
              label="First name"
              type="text"
              v-model="formData.first_name"
              prepend-icon="mdi-pencil"
            ></v-text-field>
            <v-text-field
              name="lastName"
              label="Last name"
              type="text"
              v-model="formData.last_name"
              prepend-icon="mdi-pencil"
            ></v-text-field>
            <v-text-field
              name="email"
              label="Email"
              type="email"
              v-model="formData.email"
              prepend-icon="mdi-email"
            ></v-text-field>
            <v-text-field
              id="currentPassword"
              name="currentPassword"
              label="Current password"
              prepend-icon="mdi-lock"
              :type="showPasswords.pass ? 'text' : 'password'"
              :append-inner-icon="
                showPasswords.pass ? 'mdi-eye' : 'mdi-eye-off'
              "
              v-model="formData.current_password"
              @click:append-inner="showPasswords.pass = !showPasswords.pass"
            ></v-text-field>
            <v-text-field
              id="password"
              name="password"
              label="Confirm password"
              prepend-icon="mdi-lock"
              :type="showPasswords.confPass ? 'text' : 'password'"
              :append-inner-icon="
                showPasswords.confPass ? 'mdi-eye' : 'mdi-eye-off'
              "
              v-model="formData.password"
              @click:append-inner="
                showPasswords.confPass = !showPasswords.confPass
              "
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="purple"
            variant="tonal"
            @click="formDisabled = !formDisabled"
            >Edit</v-btn
          >
          <v-btn color="success" variant="tonal" @click="updateUserData()"
            >Submit</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-col>
    <v-col cols="5">
      <v-card>
        <v-card-title>
          <div class="text-overline mb-1">Profile image</div>
          Change your profile image.
        </v-card-title>
        <v-card-text>
          <v-form>
            <v-avatar
              class="mb-3 mt-4"
              size="220"
              :image="store.loggedUser.avatar"
              :color="store.loggedUser.avatar ? '' : 'blue'"
            >
            <span class="white--text text-h5">
              {{
                store.loggedUser.avatar
                  ? ''
                  : getInitials(
                      store.loggedUser.firstname,
                      store.loggedUser.lastname
                    )
              }}
              </span>
            </v-avatar>
            <v-spacer></v-spacer>
            <v-file-input
              accept="image/*"
              label="Profile image"
              chips
              v-model="imageData"
            ></v-file-input>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="success" variant="tonal" @click="updateProfilePicture()"
            >Upload image</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-col>
    <v-snackbar v-model="error.show" :timeout="2000" :color="error.color">
      {{ error.message }}
    </v-snackbar>
  </v-row>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
