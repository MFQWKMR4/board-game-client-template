import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  assetsInclude: ['**/*.glb'],
  define: {
    'import.meta.env.API_BASE_URL': process.env.API_BASE_URL ? `"${process.env.API_BASE_URL}"` : '"http://localhost:8787"',
    'import.meta.env.WS_URL': process.env.WS_URL ? `"${process.env.WS_URL}"` : '"ws://localhost:8787/ws"',
    'import.meta.env.GLB_URL': process.env.GLB_URL ? `"${process.env.GLB_URL}"` : '"https://pub-ad0122a44c224873aaf8eb250cfcf2fa.r2.dev/copper_table.glb"',
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
