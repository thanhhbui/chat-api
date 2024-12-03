import { env } from '~/config/environment'

import { MongoClient, ServerApiVersion } from 'mongodb'

let chatDatabaseInstance = null

const mongodoClientInstance = new MongoClient(env.MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
})

export const CONNECT_DB = async () => {
  await mongodoClientInstance.connect()

  chatDatabaseInstance = mongodoClientInstance.db(env.DATABASE_NAME)
}

export const GET_DB = () => {
  if (!chatDatabaseInstance) {
    throw new Error('Must connect to Database first!')
  } else {
    return chatDatabaseInstance
  }
}

export const CLOSE_DB = async () => {
  await mongodoClientInstance.close()
}