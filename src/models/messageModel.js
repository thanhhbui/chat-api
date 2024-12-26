// Message Model
import Joi from 'joi'
import { ObjectId } from 'mongodb'
import { GET_DB } from '~/config/mongodb'

const MESSAGE_COLLECTION_NAME = 'messages'
const MESSAGE_COLLECTION_SCHEMA = Joi.object({
  chatId: Joi.string().required(), // ID của đoạn chat.
  senderId: Joi.string().required(), // ID người gửi.
  content: Joi.string().required().max(500), // Nội dung tin nhắn được mã hóa.
  sentAt: Joi.date().timestamp('javascript').default(Date.now).required(), // Thời gian gửi tin nhắn.
  attachments: Joi.array()
    .items(Joi.string()) // Danh sách file hoặc hình ảnh đính kèm.
    .optional()
})

const validateBeforeCreate = async (data) => {
  return await MESSAGE_COLLECTION_SCHEMA.validateAsync(data, { abortEarly:false })
}

const createNew = async (data) => {
  try {
    const validData = await validateBeforeCreate(data)
    // console.log('validData: ', validData)

    return await GET_DB().collection(MESSAGE_COLLECTION_NAME).insertOne(validData)
  } catch (error) {
    throw new Error(error)
  }
}

const findOneById = async (id) => {
  try {
    const result = await GET_DB().collection(MESSAGE_COLLECTION_NAME).findOne({ _id: new ObjectId(id) })

    return result
  } catch (error) {
    throw new Error(error)
  }
}

export const messageModel = {
  MESSAGE_COLLECTION_NAME,
  MESSAGE_COLLECTION_SCHEMA,
  createNew,
  findOneById
}