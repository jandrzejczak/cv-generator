<script lang="ts">
import { defineComponent, onMounted, toRefs } from 'vue';
import store from '../../store/store';

export default defineComponent({
  name: 'HeaderElement',
  props: {
    data: { type: Object, required: true },
    editMode: { type: Boolean, required: true },
  },
  components: {},
  setup(props) {
    const { data, editMode } = toRefs(props);

    function getInitials(firstname: string, lastname: string) {
      if (firstname && lastname) {
        return `${firstname[0].toUpperCase()}${lastname[0].toUpperCase()}`;
      }
      return '';
    }

    function handleInput(text: string, e: Event) {
      let value: any = e.target;
      data.value[text] = value.innerText;
    }

    return {
      data,
      handleInput,
      editMode,
      store,
      getInitials,
    };
  },
});
</script>

<template>
  <div class="background">
    <div class="left-col">
      <div
        :contenteditable="editMode"
        @blur="handleInput('header', $event)"
        v-text="data.header"
        class="element-header"
      ></div>
      <div
        :contenteditable="editMode"
        @blur="handleInput('text', $event)"
        v-text="data.text"
        class="element-subheader"
      ></div>
    </div>
    <div class="right-col">
      <v-avatar
        class="mb-3 mt-4"
        size="100"
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
    </div>
  </div>
</template>

<style lang="scss" scoped>
.background {
  height: 100%;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.profile-image {
  width: 100px;
  height: 100px;
  border-radius: 100%;
  background-color: aqua;
}
.element-header {
  font-size: 30px;
  text-transform: uppercase;
  letter-spacing: 8px;
}
.element-subheader {
  font-size: 16px;
  text-transform: uppercase;
  letter-spacing: 6px;
  color: rgb(59, 59, 59);
}
</style>
