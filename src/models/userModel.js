import Joi from 'joi'
import { ObjectId } from 'mongodb'
import { GET_DB } from '~/config/mongodb'

// User Model
const USER_COLLECTION_NAME = 'users'
const USER_COLLECTION_SCHEMA = Joi.object({
  username: Joi.string().required().min(3).max(50).trim(),
  fullname: Joi.string().required().min(3).max(50).trim(),
  email: Joi.string().email().required().trim(),
  password: Joi.string().required().min(8).max(30), // Mã hóa trước khi lưu
  confirmPassword: Joi.string().required().min(8).max(30),
  slug: Joi.string().required().min(3).trim().strict(),
  role: Joi.string().valid('user', 'admin').default('user'),
  publicKey: Joi.string().required(), // Khóa công khai của ECC
  createdAt: Joi.date().default(Date.now),
  updatedAt: Joi.date().default(Date.now)
})

const validateBeforeCreate = async (data) => {
  return await USER_COLLECTION_SCHEMA.validateAsync(data, { abortEarly: false })
}

const createNew = async (data) => {
  try {
    const validData = await validateBeforeCreate(data)

    return await GET_DB().collection(USER_COLLECTION_NAME).insertOne(validData)
  } catch (error) {
    throw new Error(error)
  }
}

const findOneById = async (id) => {
  try {
    return await GET_DB().collection(USER_COLLECTION_NAME).findOne({ _id: new ObjectId(id) })
  } catch (error) {
    throw new Error(error)
  }
}

const updateOneById = async (id, data) => {
  try {
    const validData = await validateBeforeCreate(data)
    validData.updatedAt = new Date()
    return await GET_DB().collection(USER_COLLECTION_NAME).updateOne({ _id: new ObjectId(id) }, { $set: validData })
  } catch (error) {
    throw new Error(error)
  }
}

const deleteOne = async (id) => {
  try {
    return await GET_DB().collection(USER_COLLECTION_NAME).deleteOne({ _id: new ObjectId(id) })
  } catch (error) {
    throw new Error(error)
  }
}

export const userModel = {
  USER_COLLECTION_NAME,
  USER_COLLECTION_SCHEMA,
  createNew,
  findOneById,
  updateOneById,
  deleteOne
}