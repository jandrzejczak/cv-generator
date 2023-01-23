<script lang="ts">
import { ref, computed, defineComponent } from 'vue';
import draggable from 'vuedraggable';
import store from '../store/store';
import router from '../router';

export default defineComponent({
  name: 'HomePage',
  props: {
    navigation: { type: Array<any>, required: true },
  },
  components: {
    draggable,
  },
  setup() {
    function getInitials(firstname: string, lastname: string) {
      if (firstname && lastname) {
        return `${firstname[0].toUpperCase()}${lastname[0].toUpperCase()}`;
      }
      return '';
    }

    async function logout() {
      router.push('/login');
      store.actions.clearUser({
        firstname: '',
        lastname: '',
        email: '',
        token: '',
        avatar: '',
      });
    }

    return {
      store,
      getInitials,
      logout,
    };
  },
});
</script>

<template>
  <v-app id="inspire">
    <v-layout>
      <v-navigation-drawer expand-on-hover rail>
        <v-list>
          <v-list-item
            :title="`${store.loggedUser.firstname} ${store.loggedUser.lastname}`"
            :subtitle="store.loggedUser.email"
          >
            <template v-slot:prepend>
              <v-avatar
                :image="store.loggedUser.avatar"
                :color="store.loggedUser.avatar ? '' : 'blue'"
              >
                {{
                  store.loggedUser.avatar
                    ? ''
                    : getInitials(
                        store.loggedUser.firstname,
                        store.loggedUser.lastname
                      )
                }}
              </v-avatar>
            </template>
          </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list density="compact" nav>
          <v-list-item
            v-for="element in navigation"
            :key="element.id"
            :to="element.link"
            :title="element.name"
            :prepend-icon="element.icon"
          ></v-list-item>
          <v-list-item
            @click="logout()"
            prepend-icon="mdi-logout"
            title="Logout"
          ></v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-main class="bg-grey-lighten-3">
        <v-container style="height: 100%">
          <router-view v-slot="{ Component }">
            <transition name="fade" mode="out-in">
              <component :is="Component" />
            </transition>
          </router-view>
        </v-container>
      </v-main>
    </v-layout>
  </v-app>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
