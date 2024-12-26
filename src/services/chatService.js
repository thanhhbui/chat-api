/* eslint-disable no-useless-catch */
import { slugify } from '~/utils/formater'
import { chatModel } from '~/models/chatModel'

const createNew = async ( data ) => {
  try {
    const newChat = {
      ...data,
      slug: slugify(data.name)
    }

    const createdChat = await chatModel.createNew(newChat)
    const getChat = await chatModel.findOneById(createdChat.insertedId)
    // console.log(getChat)

    return getChat
  } catch (error) {
    throw error
  }
}

export const chatService = {
  createNew
}