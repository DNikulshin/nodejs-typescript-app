export { }

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            ENV_DEV: null
            ENV_PROD: null
            DATABASE_URL: string
            PORT: number
            HOST: string
            POSTGRES_URL: string
            POSTGRES_PRISMA_URL: string
            POSTGRES_URL_NO_SSL: string
            POSTGRES_URL_NON_POOLING: string
            JWT_ACCESS_SECRET: string
            JWT_REFRESH_SECRET: string
            JWT_ACCESS_EXPIRESIN: string
            JWT_REFRESH_EXPIRESIN: string
            REFRESH_TOKEN: string
            SMTP_HOST: string
            SMTP_PORT: number
            SMTP_USER: string
            SMTP_PASSWORD: string
            API_URL: string
            CLIENT_URL: string
        }
    }
}

