import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import WindiCSS from "vite-plugin-windicss";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: [
      { find: "@", replacement: path.resolve(__dirname, "src") },
      { find: /^~/, replacement: "" },
    ],
  },
  plugins: [react(), WindiCSS()],
  server: {
    // port: 8000,
    // cors: true, // 默认启用并允许任何源
    // 反向代理配置
    proxy: {
      "/api": {
        target: "https://yuyichen.space", // 代理接口
        changeOrigin: true,
      },
      "/yuyichen-api": {
        target: "https://yuyichen.space", // 代理接口
        changeOrigin: true,
      },
    },
  },
});
