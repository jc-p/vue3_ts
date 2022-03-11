<!--
 * @Description: ff
 * @Author: Peng JieCheng
 * @Date: 2022-03-11
 * @LastEditTime: 2022-03-11
 * @LastEditors: Peng JieCheng
 * @FilePath: /vue3_ts/src/components/slider.vue
-->
<script lang="ts">
  import { defineComponent, ref, reactive, computed } from "vue";
  import { NButton } from "naive-ui";

  export default defineComponent({
    components: {
      NButton,
    },
    setup(props) {
      const index = ref(0);
      const list = reactive(
        Array.from({ length: 5 }, (_, idx) => ({ title: "文本" + idx + 1, text: idx + 2 })),
      );

      const styles = computed(() => ({
        "transition-duration": "300ms",
        transform: `translate3d(0px, -${index.value * 100}px, 0px)`,
      }));

      return {
        index,
        list,
        styles,
        handleClick: (flag) => {
          index.value =
            flag === "next"
              ? index.value === list.length
                ? (index.value = list.length)
                : ++index.value
              : index.value === 0
              ? 0
              : --index.value;
        },
      };
    },
  });
</script>

<template>
  <div style="margin-left: 500px">
    <ul class="list-ul" :style="styles">
      <template v-for="(item, index) in list" :key="index">
        <li class="list-li"> {{ item.title }}</li>
      </template>
    </ul>
  </div>
  <n-button type="primary" @click="handleClick('prev')">向前走</n-button>
  <n-button type="primary" @click="handleClick('next')">向后走</n-button>
</template>

<style scoped>
  .list-ul {
    z-index: -1;
    list-style: none;
    position: relative;
    width: 100%;
    height: 300px;
    /* overflow: auto; */
    z-index: 1;
    display: flex;
    flex-wrap: wrap;
    transition-property: transform;
    box-sizing: content-box;
    transition-duration: 0ms;
    transform: translate3d(0px, 0px, 0px);
  }
  .list-li {
    /* width: 500px; */
    flex-shrink: 0;
    width: 1000px;
    height: 100px;
    background-color: rgb(76, 0, 255);
    position: relative;
    transition-property: transform;
    margin: 10px;
  }
</style>
