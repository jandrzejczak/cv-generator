<script lang="ts">
import { ref, defineComponent, toRefs } from 'vue';
import axios from 'axios';
import store from '../../store/store';

export default defineComponent({
  // extends: Vue,
  name: 'SaveLayoutModal',
  emits: ['status', 'modalState', 'close'],
  props: {
    modal: { type: Boolean, required: true },
    layout: { type: Array, required: true },
    allLayouts: { type: Array, required: true },
  },
  setup(props, ctx) {
    const { layout, modal, allLayouts } = toRefs(props);

    const layoutName = ref('');
    const overwriteLayout = ref('');

    async function updateLayout() {
      let formData = {
        layout: [...layout.value],
        layoutName: layoutName.value,
        overwriteLayout: overwriteLayout.value,
      };
      await axios({
        method: 'PUT',
        url: 'http://localhost:2000/update-layout',
        headers: {
          'x-access-token': store.loggedUser.token,
        },
        data: formData,
      })
        .then((response) => {
          console.log(response);
          emitStatus(response);
        })
        .catch((error) => {
          console.error('Error:', error);
          emitStatus(error.response);
        });
      layoutName.value = '';
      overwriteLayout.value = '';
    }

    async function addLayout() {
      let formData = {
        layout: [...layout.value],
        layoutName: layoutName.value,
      };
      await axios({
        method: 'POST',
        url: 'http://localhost:2000/add-layout',
        headers: {
          'x-access-token': store.loggedUser.token,
        },
        data: formData,
      })
        .then((response) => {
          console.log(response);
          emitStatus(response);
        })
        .catch((error) => {
          console.error('Error:', error);
          emitStatus(error.response);
        });
      layoutName.value = '';
    }

    function emitStatus(state: any): void {
      ctx.emit('status', state);
    }

    function closeModal(): void {
      ctx.emit('close');
    }

    return {
      modal,
      closeModal,
      addLayout,
      updateLayout,
      layoutName,
      overwriteLayout,
      allLayouts,
    };
  },
});
</script>

<template>
  <v-dialog v-model="modal">
    <v-card class="mx-auto" min-width="644">
      <v-card-title>
        <div class="text-overline mb-1">Adding new layout</div>
        Layout will be saved in your profile
      </v-card-title>
      <v-card-subtitle>
        Input name of layout to proceed further.
      </v-card-subtitle>
      <v-card-text>
        <v-form>
          <v-text-field
            required
            name="name"
            label="Layout name"
            type="text"
            append-inner-icon="mdi-pencil"
            v-model="layoutName"
          ></v-text-field>
          <v-select
            clearable
            label="Overwrite layout"
            v-model="overwriteLayout"
            :items="allLayouts"
            item-title="layout_name"
            item-value="id"
          ></v-select>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="grey-darken-1" variant="text" @click="closeModal">
          Cancel
        </v-btn>
        <v-btn
          color="green-darken-1"
          variant="elevated"
          @click="overwriteLayout ? updateLayout() : addLayout()"
        >
          Add layout
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped></style>
