declare global {
  namespace NodeJS {
    interface ProcessEnv {
      VERCEL_TOKEN: string;
      UPSTASH_REDIS_URL: string;
      UPSTASH_REDIS_TOKEN: string;
    }
  }
}

export {};
