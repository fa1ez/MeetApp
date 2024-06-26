import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

export default defineConfig({
    plugins: [react()],
    esbuild: {
        jsxFactory: "React.createElement",
        jsxFragment: "React.Fragment",
    },
    css: {
        modules: {
            localsConvention: "camelCaseOnly",
        },
    },

    server: {
        https: {
          key: 'localhost-key.pem',
          cert: 'localhost.pem'
        }
      }
})
