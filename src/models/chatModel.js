import Joi from 'joi'
import { GET_DB } from '~/config/mongodb'
import { ObjectId } from 'mongodb'

const CHAT_COLLECTION_NAME = 'chats'
const CHAT_COLLECTION_SCHEMA = Joi.object({
  name: Joi.string().required().min(3).max(50).trim(),
  type: Joi.string().valid('private', 'group').required(), // Chỉ chấp nhận 'private' hoặc 'group'.
  slug: Joi.string().required().min(3).trim().strict(),
  lastMessage: Joi.object({
    sender: Joi.string().required().min(3).max(50).trim(),
    content: Joi.string().required().min(1).max(500), // Nội dung tin nhắn tối đa 500 ký tự.
    sentAt: Joi.date().timestamp('javascript').required() // Thời gian gửi dưới dạng timestamp.
  }).optional(), // `last_message` có thể không tồn tại nếu chưa có tin nhắn nào.
  createdAt: Joi.date().timestamp('javascript').default(Date.now), // Ngày tạo đoạn chat
  updatedAt: Joi.date().timestamp('javascript').default(null) // Ngày cập nhật gần nhất
})

const validateBeforeCreate = async (data) => {
  return await CHAT_COLLECTION_SCHEMA.validateAsync(data, { abortEarly: false })
}

const createNew = async (data) => {
  try {
    const validData = await validateBeforeCreate(data)
    // console.log('validData: ', validData)

    return await GET_DB().collection(CHAT_COLLECTION_NAME).insertOne(validData)
  } catch (error) {
    throw new Error(error)
  }
}

const findOneById = async (id) => {
  try {
    const result = await GET_DB().collection(CHAT_COLLECTION_NAME).findOne({ _id: new ObjectId(id) })

    return result
  } catch (error) {
    throw new Error(error)
  }
}

export const chatModel = {
  CHAT_COLLECTION_NAME,
  CHAT_COLLECTION_SCHEMA,
  createNew,
  findOneById
}