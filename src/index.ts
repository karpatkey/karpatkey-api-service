import app from './app'
import config from './config'
import cron from 'node-cron'
import { DataWarehouse } from './services/classes/dataWarehouse.class'
import mCache from 'memory-cache'
import { register } from 'ts-node'

cron.schedule('0 * * * *', async () => {
  console.log('---------------------')
  console.log('running a task every 1 hour')

  const dataWarehouse = DataWarehouse.getInstance()
  const tokens = await dataWarehouse.getTokenDetails()
  // let's use 1 hour and half as cache time
  mCache.put('tokens', tokens, 5400000)
  console.log('Cache for the tokens was generated successfully')
})

// schedule a cronjob to execute dumpDailyTweets in a daily way
cron.schedule('0 0 * * *', async () => {
  console.log('---------------------')
  console.log('running a task every 1 day')
  register({ transpileOnly: true })
  await import('./scripts/dumpDailyTweets')
  console.log('Twitter daily dump was executed successfully')
})

app.listen(config.port, () => {
  console.log(`🚀 ${config.name} ${config.version} 🚀`)
  console.log(`🚀 Listening on ${config.port} with NODE_ENV=${config.nodeEnv} 🚀`)
})
