import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from "path"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    host: '0.0.0.0',
    port: 8000,
    open: true,
    https: false,
    proxy: {
      '/api': {
        // target: 'http://101.69.254.70:50002',
        // target: 'https://bi.wjcatv.com.cn',//正式
          target:'http://astore.bdcatek.com',//测试
        changeOrigin: true
      },
    }
  },
  // 静态资源路径打包路径
  build: {
    outDir: 'wujiang',
    assetsPublicPath: './',
  },
  resolve: {
    extensions: [".js", ".vue", ".json"],
    alias: {
      "@": path.resolve(__dirname, "src"),
      "#": path.resolve(__dirname, "src/components"),
      "@img": path.resolve(__dirname, "src/assets/img"),
      "@api": path.resolve(__dirname, "src/server/api"),
    },
  },
  base:'./',
})
