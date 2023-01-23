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
    <div class="bullet-top">
      <div
        :contenteditable="editMode"
        @blur="handleInput('header', $event)"
        v-text="data.header"
        class="element-title"
      ></div>
      <div
        :contenteditable="editMode"
        @blur="handleInput('date', $event)"
        v-text="data.date"
        class="element-date"
      ></div>
    </div>

    <div
      :contenteditable="editMode"
      @blur="handleInput('text', $event)"
      v-text="data.text"
      class="element-bullet"
    ></div>
  </div>
</template>

<style lang="scss" scoped>
.background {
  height: 100%;
  background-color: #fff;
  .bullet-top {
    overflow: hidden;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .element-title {
      font-size: 16px;
    }
    .element-date {
      font-size: 16px;
      font-weight: 600;
    }
  }
  .element-bullet {
    font-size: 14px;
    line-height: 1.4;
    text-align: justify;
    text-justify: inter-word;
    position: relative;
    padding-left: 10px;
    &::after {
      content: '•';
      position: absolute;
      left: 0;
      top: 0px;
    }
  }
}
</style>
