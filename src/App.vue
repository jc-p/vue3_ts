<script lang="ts">
  import { defineComponent, ref } from "vue";
  import { useTitle } from "@vueuse/core";
  import { darkTheme } from "naive-ui";
  import type { GlobalTheme } from "naive-ui";
  import { NConfigProvider, NButton, NCard, NSpace } from "naive-ui";
  import slider from "@/components/slider.vue";

  export default defineComponent({
    components: {
      NConfigProvider,
      NButton,
      NSpace,
      NCard,
      slider,
    },
    setup() {
      const title = useTitle("pppp");

      return {
        title,
        darkTheme,
        theme: ref<GlobalTheme | null>(null),
      };
    },
  });
</script>

<template>
  <n-config-provider :theme="theme">
    <n-card>
      <n-space>
        <slider />
        <n-button @click="theme = darkTheme"> 深色 </n-button>
        <n-button @click="theme = null"> 浅色 </n-button>
      </n-space>
    </n-card>
  </n-config-provider>
</template>

<style></style>
