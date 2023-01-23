<script lang="ts">
import { ref, computed, defineComponent, onMounted, Ref } from 'vue';
import SimpleTextElement from '../components/LayoutElements/SimpleTextElement.vue';
import VerticalSpacer from '../components/LayoutElements/VerticalSpacer.vue';
import HorizontalSpacer from '../components/LayoutElements/HorizontalSpacer.vue';
import HeaderElement from '../components/LayoutElements/HeaderElement.vue';
import BulletTextElement from '../components/LayoutElements/BulletTextElement.vue';
import { LayoutElement, layoutElementTypes } from '../classes/PageElements';
import {
  BaseElementType,
  BaseElementPropertiesType,
  BaseElementDataType,
} from '../types/elementTypes';
import SaveLayoutModal from '../components/Modals/SaveLayoutModal.vue';
import DeleteLayoutModal from '../components/Modals/DeleteLayoutModal.vue';
import axios from 'axios';
import store from '../store/store';

export default defineComponent({
  name: 'CreateView',
  props: {},
  components: {
    SimpleTextElement,
    VerticalSpacer,
    HeaderElement,
    HorizontalSpacer,
    BulletTextElement,
    SaveLayoutModal,
    DeleteLayoutModal,
  },
  setup() {
    const index = ref(0);
    const colNum = ref(12);

    let snackbar = ref({
      status: '',
      message: '',
      color: '',
      show: false,
    });

    const myLayouts: Ref<Array<BaseElementType>> = ref([]);

    let layout: Ref<Array<BaseElementType>> = ref([]);

    const selectedLayout = ref({});

    const editMode = ref(true);
    const showModal = ref(false);
    const showDeleteModal = ref(false);

    function handleSnackbar(resp: any) {
      if (resp.status === 200) {
        snackbar.value = {
          status: resp.status,
          message: resp.data,
          color: 'success',
          show: true,
        };
      } else {
        snackbar.value = {
          status: resp.status,
          message: resp.data,
          color: 'red',
          show: true,
        };
        return;
      }
      getLayouts();
      showModal.value = false;
      showDeleteModal.value = false;
    }

    function addNewElement(
      parameters: BaseElementPropertiesType,
      data?: BaseElementDataType
    ): void {
      let newLayoutElement = new LayoutElement(
        0,
        0,
        parameters.w,
        parameters.h,
        index.value,
        parameters.resizable,
        parameters.type
      );
      layout.value.push({ ...newLayoutElement });
      index.value++;
      editMode.value = false;
      editMode.value = true;
    }

    function removeItem(val: number) {
      const index = layout.value.map((item) => item.i).indexOf(val);
      layout.value.splice(index, 1);
    }

    function deleteLayout(item: BaseElementType) {
      showDeleteModal.value = true;
      selectedLayout.value = item;
    }

    async function getLayouts() {
      await axios({
        method: 'GET',
        url: 'http://localhost:2000/get-all-layouts',
        headers: {
          'x-access-token': store.loggedUser.token,
        },
      })
        .then((response) => {
          console.log(response);
          myLayouts.value = response.data;
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }

    async function getSingleLayout(id: number = 1) {
      let formData = {
        layoutId: id,
      };
      await axios({
        method: 'POST',
        url: 'http://localhost:2000/get-layout',
        headers: {
          'x-access-token': store.loggedUser.token,
        },
        data: formData,
      })
        .then((response) => {
          layout.value = response.data;
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }

    onMounted(async () => {
      index.value = layout.value.length;
      getLayouts();
    });

    return {
      getSingleLayout,
      layout,
      addNewElement,
      index,
      colNum,
      removeItem,
      editMode,
      store,
      layoutElementTypes,
      myLayouts,
      showModal,
      showDeleteModal,
      handleSnackbar,
      snackbar,
      selectedLayout,
      deleteLayout,
    };
  },
});
</script>

<template>
  <v-row style="height: 100%">
    <v-col cols="5" lg="3">
      <v-card>
        <v-list>
          <v-list-subheader>Elements</v-list-subheader>
          <v-list-item
            v-for="(item, i) in layoutElementTypes"
            :key="i"
            :value="item"
            active-color="primary"
            variant="plain"
            @click="addNewElement(item)"
          >
            <template v-slot:prepend>
              <v-icon icon="mdi-plus"></v-icon>
            </template>

            <v-list-item-title v-text="item.name"></v-list-item-title>
          </v-list-item>
        </v-list>
        <v-list>
          <v-list-subheader>Actions</v-list-subheader>
          <v-list-item active-color="primary" @click="editMode = !editMode">
            <template v-slot:prepend>
              <v-icon
                :icon="editMode ? 'mdi-pencil' : 'mdi-pencil-off'"
              ></v-icon>
            </template>
            <v-list-item-title color="primary">Edit mode</v-list-item-title>
          </v-list-item>
          <v-list-item
            :disabled="layout.length < 1"
            active-color="primary"
            @click="showModal = true"
          >
            <template v-slot:prepend>
              <v-icon icon="mdi-table-large-plus"></v-icon>
            </template>
            <v-list-item-title>Save layout</v-list-item-title>
          </v-list-item>
          <v-list-group value="Actions">
            <template v-slot:activator="{ props }">
              <v-list-item
                v-bind="props"
                title="My layouts"
                prepend-icon="mdi-download"
              ></v-list-item>
            </template>
            <v-list-item
              v-for="item in myLayouts"
              :key="item.id"
              :title="item.layout_name"
              @click="getSingleLayout(item.id)"
            >
              <template v-slot:append>
                <v-btn
                  color="red-lighten-1"
                  icon="mdi-delete"
                  variant="text"
                  @click="deleteLayout(item)"
                ></v-btn>
              </template>
            </v-list-item>
          </v-list-group>
          <v-list-item active-color="primary" @click="layout = []">
            <template v-slot:prepend>
              <v-icon icon="mdi-autorenew"></v-icon>
            </template>
            <v-list-item-title>Clear layout</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-card>
    </v-col>
    <v-col>
      <v-card id="printable-area">
        <grid-layout
          v-model:layout="layout"
          :col-num="colNum"
          :row-height="30"
          :is-draggable="editMode"
          :is-resizable="editMode"
          :is-bounded="true"
        >
          <template v-if="layout.length > 0" #default="{ gridItemProps }">
            <grid-item
              v-for="item in layout"
              v-bind="gridItemProps"
              :x="item.x"
              :y="item.y"
              :w="item.w"
              :h="item.h"
              :i="item.i"
              :key="item.i"
              :isResizable="editMode && item.resizable"
            >
              <component
                :data="item.data"
                :edit-mode="editMode"
                :is="item.type"
              />
              <span v-if="editMode" class="remove" @click="removeItem(item.i)"
                >⨯</span
              >
            </grid-item>
          </template>
        </grid-layout>
      </v-card>
    </v-col>
    <v-snackbar v-model="snackbar.show" :timeout="2000" :color="snackbar.color">
      {{ snackbar.message }}
    </v-snackbar>
    <save-layout-modal
      @status="handleSnackbar"
      @close="showModal = false"
      :all-layouts="myLayouts"
      :layout="layout"
      :modal="showModal"
    ></save-layout-modal>
    <delete-layout-modal
      @status="handleSnackbar"
      @close="showDeleteModal = false"
      :active-layout="selectedLayout"
      :layout="layout"
      :modal="showDeleteModal"
    ></delete-layout-modal>
  </v-row>
</template>

<style lang="scss" scoped>
.parent {
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-template-rows: repeat(7, 1fr);
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  height: 100%;
  width: 100%;

  div {
    background-color: red;
    border: blue 2px solid;
  }
}

#printable-area {
  height: 100%;
  min-width: 210mm;
  min-height: 297mm;
  overflow: hidden;
  padding: 0.5cm;
}
.remove {
  position: absolute;
  right: 2px;
  top: 0;
  cursor: pointer;
  font-size: 1.5rem;
  line-height: 0;
}
.vue-grid-item .resizing {
  opacity: 0.9;
}
.vue-grid-item .static {
  background: #cce;
}
.vue-grid-item .text {
  font-size: 24px;
  text-align: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  height: 100%;
  width: 100%;
}
.vue-grid-item .no-drag {
  height: 100%;
  width: 100%;
}
.vue-grid-item .minMax {
  font-size: 12px;
}
.vue-grid-item .add {
  cursor: pointer;
}
.vue-draggable-handle {
  position: absolute;
  width: 20px;
  height: 20px;
  top: 0;
  left: 0;
  background: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='10'><circle cx='5' cy='5' r='5' fill='#999999'/></svg>")
    no-repeat;
  background-position: bottom right;
  padding: 0 8px 8px 0;
  background-repeat: no-repeat;
  background-origin: content-box;
  box-sizing: border-box;
  cursor: pointer;
}
</style>
