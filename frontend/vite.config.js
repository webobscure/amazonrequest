import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/getfeeswithnew' : 'https://myamazonrequest.netlify.app/'
    }
  },
  plugins: [react()],
})
