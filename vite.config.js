import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import dotenv from 'dotenv';

dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh()],
  define:{
    'CATEGORY_URL': `"${process.env.VITE_CATEGORY_URL}"`,
    'CONVERSTION_URL': `"${process.env.VITE_CONVERSION_URL}"`,
    'CATEGORIES_URL': `"${process.env.VITE_CATEGORIES_URL}"`,
    'COINS_URL': `"${process.env.VITE_COINS_URL}"`,
    'MARKETCAP_INFO':`"${process.env.VITE_MARKETCAP_INFO}"`,
    

  }
})
