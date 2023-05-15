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
    development: process.env.DEV_ORIGIN ?? '*',
    production: process.env.PROD_ORIGIN ?? 'none'
  },

  dwTable: process.env.DW_TABLE ?? '',
  dwDataset: process.env.DW_DATASET ?? '',

  wfCollectionID: process.env.WF_COLLECTION_ID ?? '',
  wfAPIKey: process.env.WF_API_KEY ?? '',

  defaultAumValue: process.env.DEFAULT_AUM_VALUE,

  mirrorAddress: process.env.MIRROR_ADDRESS ?? '',
  mirrorAddressEns: process.env.MIRROR_ADDRESS_ENS ?? '',

  googleProjectId: process.env.GOOGLE_PROJECT_ID,
  googleCredentials: {
    client_id: process.env.GOOGLE_CLIENT_ID,
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    project_id: process.env.GOOGLE_PROJECT_ID,
    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(new RegExp('\\\\n', 'g'), '\n')
  },
  replaceStrings: [
    {
      id: 'rObSUa0VosP2Rb2Bllj_kygIc5mlGesmJ0CTf9LuHlA',
      replace: [
        {
          field: 'mirrorcontent',
          search: '<img src="https://images.mirror-media.xyz/publication-images/Z6ppvMk8cBucKxa7nPDOa.png?height=522&width=3200" alt="The font: IBM Plex Mono and Sans" />',
          replace: '<img src="https://uploads-ssl.webflow.com/639c46f0e63ad8a736f14b89/64629120bf70fa5b5b1bf01e_lorem.png" height="100%" width="588px" alt="The font: IBM Plex Mono and Sans" />'
        },
        {
          field: 'mirrorcontent',
          search: '<img src="https://images.mirror-media.xyz/publication-images/nBeoBHpnJqtPncnyiJfWM.png?height=872&width=3200" alt="The colors: black and white" />',
          replace: '<img src="https://uploads-ssl.webflow.com/639c46f0e63ad8a736f14b89/6462911fa1057dbf5f0f9bb8_circle.png" height="100%" width="588px" alt="The font: IBM Plex Mono and Sans" />'
        },
        {
          field: 'mirrorcontent',
          search: '<img src="https://images.mirror-media.xyz/publication-images/B4ywzobMAGUe8W4frX6Wu.png?height=1840&width=3200" alt="A fractal space filling curve " />',
          replace: '<img src="https://uploads-ssl.webflow.com/639c46f0e63ad8a736f14b89/64629120fe7a246a939aa4d5_logo.png" height="100%" width="588px" alt="The font: IBM Plex Mono and Sans" />'
        }
      ]
    }
  ]
}

export default config
