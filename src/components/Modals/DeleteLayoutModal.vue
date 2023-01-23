<script lang="ts">
import { ref, defineComponent, toRefs } from 'vue';
import axios from 'axios';
import store from '../../store/store';

export default defineComponent({
  // extends: Vue,
  name: 'DeleteLayoutModal',
  emits: ['status', 'modalState', 'close'],
  props: {
    modal: { type: Boolean, required: true },
    layout: { type: Array, required: true },
    activeLayout: { type: Object, required: true },
  },
  setup(props, ctx) {
    const { layout, modal, activeLayout } = toRefs(props);

    const layoutName = ref('');
    const overwriteLayout = ref('');

    async function deleteLayout() {
      let formData = {
        layoutId: activeLayout.value.id,
      };
      await axios({
        method: 'DELETE',
        url: 'http://localhost:2000/delete-layout',
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
      deleteLayout,
      layoutName,
      overwriteLayout,
      activeLayout,
    };
  },
});
</script>

<template>
  <v-dialog v-model="modal">
    <v-card class="mx-auto" min-width="644">
      <v-card-title>
        <div class="text-overline mb-1">Deleting layout</div>
        Layout will be deleted from your profile.
      </v-card-title>
      <v-card-subtitle>
        Are you sure you want to delete {{ activeLayout.layout_name }}?
      </v-card-subtitle>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="grey-darken-1" variant="text" @click="closeModal">
          Cancel
        </v-btn>
        <v-btn
          color="red-darken-1"
          variant="elevated"
          @click="deleteLayout()"
        >
          Delete layout
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped></style>
