import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import legacy from "@vitejs/plugin-legacy";
import purgeIcons from "vite-plugin-purge-icons";
// import windiCSS from "vite-plugin-windicss";
import vueSetupExtend from "vite-plugin-vue-setup-extend";
import Components from "unplugin-vue-components/vite";
import { NaiveUiResolver } from "unplugin-vue-components/resolvers";
import { configMockPlugin } from "./mock";
import { configCompressPlugin } from "./compress";
import { configThemePlugin } from "./theme";
import { configImageminPlugin } from "./imagemin";

export function createVitePlugins(viteEnv: ViteEnv, isBuild: boolean) {
  const { VITE_USE_IMAGEMIN, VITE_USE_MOCK, VITE_LEGACY, VITE_BUILD_COMPRESS } = viteEnv;

  const vitePlugins = [
    // have to
    vue(),
    // have to
    vueJsx(),
    // support name
    vueSetupExtend(),

    Components({
      resolvers: [NaiveUiResolver()], // setup 模式使用unplugin-vue-components 插件来按需自动加载组件
    }),
  ];

  // vite-plugin-windicss
  // vitePlugins.push(windiCSS());

  // @vitejs/plugin-legacy
  VITE_LEGACY && isBuild && vitePlugins.push(legacy());

  // vite-plugin-mock
  VITE_USE_MOCK && vitePlugins.push(configMockPlugin(isBuild));

  // vite-plugin-purge-icons
  vitePlugins.push(purgeIcons());

  // vite-plugin-theme
  // vitePlugins.push(configThemePlugin(isBuild));

  // The following plugins only work in the production environment
  if (isBuild) {
    // vite-plugin-imagemin
    VITE_USE_IMAGEMIN && vitePlugins.push(configImageminPlugin());

    // rollup-plugin-gzip
    vitePlugins.push(configCompressPlugin(VITE_BUILD_COMPRESS));
  }

  return vitePlugins;
}
