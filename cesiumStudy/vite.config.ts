import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import fs from "fs/promises";
// https://vitejs.dev/config/
export default defineConfig({
  // 静态资源引用路径，默认为"/"
  // base: "./",
  build: {
    // build目录名称，默认为"dist"
    outDir: "build",
    // 静态资源存放目录名称，默认为"assets"
    assetsDir: "static",
    // 生成map文件，默认为false（不建议设置）
    sourcemap: false,
  },
  server: {
    // 指定dev sever的端口号，默认为5173
    port: 3001,
    // 自动打开浏览器运行以下页面
    open: "/",
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  esbuild: {
    loader: "tsx",
    include: /src\/.*\.tsx?$/,
    exclude: [],
  },
  optimizeDeps: {
    esbuildOptions: {
      plugins: [
        {
          name: "load-js-files-as-tsx",
          setup(build) {
            build.onLoad({ filter: /src\/.*\.js$/ }, async (args) => ({
              loader: "tsx",
              contents: await fs.readFile(args.path, "utf8"),
            }));
          },
        },
      ],
    },
  },
  plugins: [react()],
});
