// General import
import { createApp } from 'vue';
import './assets/scss/style.scss';
import App from './App.vue';
import router from './router';
import globalStore from './store/store';

// Modules
import GridLayout from 'vue3-drr-grid-layout';
import 'vue3-drr-grid-layout/dist/style.css';

// Vuetify
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import { aliases, mdi } from 'vuetify/iconsets/mdi';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import 'material-design-icons-iconfont/dist/material-design-icons.css';
import '@mdi/font/css/materialdesignicons.css';

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
});

let app = createApp(App);

app
  .provide('globalStore', globalStore)
  .use(vuetify)
  .use(router)
  .use(GridLayout)
  .mount('#app');
