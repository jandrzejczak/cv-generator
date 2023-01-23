<script lang="ts">
import store from './store/store';
import { ref, defineComponent, provide } from 'vue';

export default defineComponent({
  name: 'Necuro',
  props: {},
  setup() {
    provide('store', store);

    const navigation = ref([
      {
        id: 1,
        link: '/create',
        name: 'Create',
        icon: 'mdi-creation'
      },
      {
        id: 2,
        link: '/account',
        name: 'Account',
        icon: 'mdi-account'
      },
    ]);

    return {
      navigation,
    };
  },
});
</script>

<template>
  <router-view :navigation="navigation" v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>
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
