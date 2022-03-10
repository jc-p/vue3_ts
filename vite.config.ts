import pkg from "./package.json";
import dayjs from "dayjs";
import { resolve } from "path";
import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import vueLegacy from "@vitejs/plugin-legacy";
import { createProxy } from "./build/vite/proxy";
import { wrapperEnv } from "./build/utils";

import viteCompression from "vite-plugin-compression";

function pathResolve(dir: string) {
  return resolve(__dirname, dir);
}

const { dependencies, devDependencies, name, version } = pkg;
const __APP_INFO__ = {
  pkg: { dependencies, devDependencies, name, version },
  lastBuildTime: dayjs().format("YYYY-MM-DD HH:mm:ss"),
};

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const root = process.cwd();

  const env = loadEnv(mode, root);

  // The boolean type read by loadEnv is a string. This function can be converted to boolean type
  const viteEnv = wrapperEnv(env);

  const { VITE_PORT, VITE_PUBLIC_PATH, VITE_PROXY, VITE_DROP_CONSOLE } = viteEnv;

  const isBuild = command === "build";

  const config = {
    base: VITE_PUBLIC_PATH,
    plugins: [
      vue(),
      vueJsx(),
      vueLegacy(),
      // gzip压缩 生产环境生成 .gz 文件
      viteCompression({
        verbose: true,
        disable: false,
        threshold: 10240,
        algorithm: "gzip",
        ext: ".gz",
      }),
    ],

    server: {
      host: "0.0.0.0",
      port: VITE_PORT,
      open: true,
      https: false,
      proxy: createProxy(VITE_PROXY),
    },
    resolve: {
      alias: {
        "@": pathResolve("src"),
        "#": pathResolve("types"),
      },
    },

    css: {
      preprocessorOptions: {
        scss: {
          // additionalData:'@import "@/assets/style/mian.scss";'
        },
      },
    },

    build: {
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      },
    },
    define: {
      // setting vue-i18-next
      // Suppress warning
      // __INTLIFY_PROD_DEVTOOLS__: false,
      // __APP_INFO__: JSON.stringify(__APP_INFO__),
    },
    esbuild: {
      pure: VITE_DROP_CONSOLE ? ["console.log", "debugger"] : [],
    },
  };

  return config;
});
