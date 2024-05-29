import { resolve } from 'path';
export default {
    alias: {
        "@": resolve(__dirname, './src'),
        "@pages": resolve(__dirname, './src/pages'),
        "@assets": resolve(__dirname, './src/assets'),
        "@components": resolve(__dirname, './src/components'),
        "@router": resolve(__dirname, './src/router'),
        "@store": resolve(__dirname, './src/store'),
        "@utils": resolve(__dirname, './src/utils'),
    }
}