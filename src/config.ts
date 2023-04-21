import dotenv from 'dotenv'

dotenv.config()
import packageJson from '../package.json'

/**
 * Pattern for config is:
 * key: process.env['KEY'] ?? default
 */
const config = {
    version: packageJson.version,
    name: packageJson.name,
    description: packageJson.description,

    nodeEnv: process.env.NODE_ENV ?? 'development',
    port: process.env.PORT ?? 3000,

    clientOrigins: {
        'development': process.env.DEV_ORIGIN ?? '*',
        'production': process.env.PROD_ORIGIN ?? 'none'
    },
    defaultAumValue: process.env.DEFAULT_AUM_VALUE,
    googleProjectId: process.env.GOOGLE_PROJECT_ID,
    googleCredentials: {
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        project_id: process.env.GOOGLE_PROJECT_ID,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(new RegExp('\\\\n', 'g'), '\n')
    }
}

export default config
