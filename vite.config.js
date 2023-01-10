import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        home: resolve(__dirname, 'src/views/home.html'),
        "recovery-password": resolve(__dirname, 'src/views/recovery-password.html'),
        "admin-home": resolve(__dirname, 'src/views/admin/home.html'),
        "admin-update-service": resolve(__dirname, 'src/views/admin/update-service.html'),
      },
    },
  },
})