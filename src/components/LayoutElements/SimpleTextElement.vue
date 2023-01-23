<script lang="ts">
import { ref, defineComponent, onMounted, toRefs } from 'vue';

export default defineComponent({
  name: 'SimpleTextElement',
  props: {
    data: { type: Object, required: true },
    editMode: { type: Boolean, required: true },
  },
  components: {},
  setup(props) {
    const links = ref(['Dashboard', 'Messages', 'Profile', 'Updates']);
    const index = ref(0);
    const colNum = ref(6);

    const { data, editMode } = toRefs(props);

    function handleInput(text: string, e: Event) {
      let value: any = e.target;
      data.value[text] = value.innerText;
    }

    onMounted(() => {
      //   index.value = layout.value.length;
    });

    return {
      links,
      index,
      colNum,
      data,
      handleInput,
      editMode,
    };
  },
});
</script>

<template>
  <div class="background">
    <div
      :contenteditable="editMode"
      @blur="handleInput('header', $event)"
      v-text="data.header"
      class="element-title"
    ></div>
    <p
      :contenteditable="editMode"
      @blur="handleInput('text', $event)"
      v-text="data.text"
      class="element-text"
    ></p>
  </div>
</template>

<style lang="scss" scoped>
.background {
  height: 100%;
  background-color: #fff;
  overflow: hidden;
  .element-title {
    font-size: 20px;
    text-transform: uppercase;
    letter-spacing: 6px;
  }
  .element-text {
    font-size: 14px;
    line-height: 1.4;
    text-align: justify;
    text-justify: inter-word;
  }
}
</style>
