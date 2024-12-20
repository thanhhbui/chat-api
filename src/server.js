/* eslint-disable no-console */
import express from 'express'
import exitHook from 'async-exit-hook'
import { CONNECT_DB, GET_DB, CLOSE_DB } from './config/mongodb'
import { env } from '~/config/environment'
import { APIs_V1 } from './routes/v1'
import { errorHandlingMiddleware } from './middlewares/errorHandlingMiddleware'

const START_SERVER = () => {
  const app = express()

  // Enable req.body json data
  app.use(express.json())

  // use api v1
  app.use('/v1', APIs_V1)

  //middleware xử lý lỗi
  app.use(errorHandlingMiddleware)

  app.listen(env.APP_PORT, env.APP_HOST, () => {
    // eslint-disable-next-line no-console 
    console.log(`Hello ${env.AUTHOR}, I am running at http://${ env.APP_HOST }:${ env.APP_PORT }/`)
  })

  exitHook(() => {
    console.log('Exit App')
    CLOSE_DB()
  })
}

(async () => {
  try {
    console.log('Connecting to MongoDB Cloud Atlas!')
    await CONNECT_DB()

    console.log('Connected to MongoDB Cloud Atlas!')
    START_SERVER()
  } catch (error) {
    console.error(error)
    process.exit(0)
  }
})()

// CONNECT_DB()
//   .then(() => console.log('Connected to MongoDB Cloud Atlas!'))
//   .then(() => START_SERVER())
//   .catch((error) => {
//     console.error(error)
//     process.exit(0)
//   })
