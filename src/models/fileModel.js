// File Model
import Joi from 'joi'
import { ObjectId } from 'mongodb'
import { GET_DB } from '~/config/mongodb'

const FILE_COLLECTION_NAME = 'files'
const FILE_COLLECTION_SCHEMA = Joi.object({
  chatId: Joi.string().required(), // ID của đoạn chat chứa file.
  uploaderId: Joi.string().required(), // ID người tải lên.
  fileName: Joi.string().required().max(255),
  fileType: Joi.string().required(), // Loại file: image, pdf, v.v.
  fileSize: Joi.number().required(), // Kích thước file tính bằng byte.
  uploadedAt: Joi.date().timestamp('javascript').default(Date.now).required() // Thời gian tải lên.
})

const validateBeforeCreate = async (data) => {
  return await FILE_COLLECTION_SCHEMA.validateAsync(data, { abortEarly: false })
}

const createNew = async (data) => {
  try {
    const validData = await validateBeforeCreate(data)
    // console.log('validData: ', validData)

    return await GET_DB().collection(FILE_COLLECTION_NAME).insertOne(validData)
  } catch (error) {
    throw new Error(error)
  }
}

const findOneById = async (id) => {
  try {
    const result = await GET_DB().collection(FILE_COLLECTION_NAME).findOne({ _id: new ObjectId(id) })

    return result
  } catch (error) {
    throw new Error(error)
  }
}


export const fileModel = {
  FILE_COLLECTION_NAME,
  FILE_COLLECTION_SCHEMA,
  createNew,
  findOneById
}