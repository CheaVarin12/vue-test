/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_BASE_URL: string;
    // Add other environment variables you want to use here
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
  