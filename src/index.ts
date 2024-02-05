import app from './app'
import config from './config'
import cron from 'node-cron'
import { DataWarehouse } from './services/classes/dataWarehouse.class'
import mCache from 'memory-cache'

cron.schedule('0 * * * *', async () => {
  console.log('---------------------')
  console.log('running a task every 1 hour')

  const dataWarehouse = DataWarehouse.getInstance()
  const tokens = await dataWarehouse.getTokenDetails()
  // let's use 1 hour and half as cache time
  mCache.put('tokens', tokens, 5400000)
})

app.listen(config.port, () => {
  console.log(`🚀 ${config.name} ${config.version} 🚀`)
  console.log(`🚀 Listening on ${config.port} with NODE_ENV=${config.nodeEnv} 🚀`)
})
