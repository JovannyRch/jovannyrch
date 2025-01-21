import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [
        laravel({
            input: "resources/js/app.jsx",
            refresh: true,
        }),
        react(),
    ],
    server: {
        cors: {
            origin: "http://localhost:8000", // El origen de tu servidor Laravel
            methods: ["GET", "POST"], // Métodos permitidos
            credentials: true, // Permite cookies y datos de sesión
        },
        hmr: {
            host: "localhost",
        },
    },
    esbuild: {
        target: "esnext",
        platform: "linux",
    },
});
