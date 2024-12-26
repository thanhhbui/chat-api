/* eslint-disable no-useless-catch */
import { messageModel } from '~/models/messageModel'

const createNew = async ( data ) => {
  try {
    const newMessage = {
      ...data
    }

    const createdMes = await messageModel.createNew(newMessage)
    const getMes = await messageModel.findOneById(createdMes.insertedId)
    // console.log(getChat)

    return getMes
  } catch (error) {
    throw error
  }
}

export const messageService = {
  createNew
}