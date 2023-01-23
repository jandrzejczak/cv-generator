<script lang="ts">
import { ref, defineComponent, onMounted, toRefs } from 'vue';

export default defineComponent({
  name: 'SimpleTextComponent',
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
    <div class="vertical-spacer"></div>
  </div>
</template>

<style lang="scss" scoped>
.background {
  background-color: #fff;
  height: 100%;
  width: 100%;
  .vertical-spacer {
  height: 100%;
  width: 1px;
  background-color: #000;
}
}

</style>
