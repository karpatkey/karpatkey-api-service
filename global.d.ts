declare namespace NodeJS {
    interface ProcessEnv {
        NODE_ENV: string
        PORT: string
        DEV_ORIGIN: string
        PROD_ORIGIN: string
        GOOGLE_CLIENT_ID: string
        GOOGLE_CLIENT_EMAIL: string
        GOOGLE_PROJECT_ID: string
        GOOGLE_PRIVATE_KEY: string
        DEFAULT_AUM_VALUE: string
        MIRROR_ADDRESS: string
        DW_DATASET: string
        DW_TABLE: string
    }
}
