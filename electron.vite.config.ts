import { defineConfig, } from "electron-vite";
import path from "path";
import react from '@vitejs/plugin-react';

export default defineConfig({
    main:{
        build: {
            lib:{
                entry: path.join(__dirname, "electron/main.ts"),
                formats: ["cjs"],
                fileName: "main"
            },
            outDir: "dist-electron/main",
            rollupOptions: {
                external: ["electron"],
                output: {
                    entryFileNames: "[name].cjs"
                }
            }
        }
    },
    preload:{
        build: {
            lib:{
                entry: path.join(__dirname, "electron/preload.ts"),
                formats: ["cjs"],
                fileName: "preload"
            },
            outDir: "dist-electron/preload",
            rollupOptions: {
                external: ["electron"],
                output: {
                    entryFileNames: "[name].cjs"
                }
            }   
        }
    },
    renderer: {
        root: ".",
        build: {
            outDir: "dist",
            rollupOptions: {
                input: path.join(__dirname, "index.html")
            }
        },
        plugins: [react()]
    }
})