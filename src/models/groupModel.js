// Group Model
import Joi from 'joi'
import { ObjectId } from 'mongodb'
import { GET_DB } from '~/config/mongodb'

const GROUP_COLLECTION_NAME = 'groups'
const GROUP_COLLECTION_SCHEMA = Joi.object({
  name: Joi.string().required().min(3).max(50).trim(), // Tên nhóm.
  description: Joi.string().optional().max(500).trim(), // Mô tả nhóm.
  slug: Joi.string().required().min(3).trim().strict(),
  members: Joi.array()
    .items(Joi.string().required()) // Danh sách ID của các thành viên trong nhóm.
    .required(),
  adminId: Joi.string().required(), // ID của admin nhóm.
  createdAt: Joi.date().timestamp('javascript').default(Date.now), // Ngày tạo nhóm.
  updatedAt: Joi.date().timestamp('javascript').default(null) // Ngày cập nhật nhóm.
})

const validateBeforeCreate = async (data) => {
  return await GROUP_COLLECTION_SCHEMA.validateAsync(data, { abortEarly: false })
}

const createNew = async (data) => {
  try {
    const validData = await validateBeforeCreate(data)

    return await GET_DB().collection(GROUP_COLLECTION_NAME).insertOne(validData)
  } catch (error) {
    throw new Error(error)
  }
}

const findOneById = async (id) => {
  try {
    const result = await GET_DB().collection(GROUP_COLLECTION_NAME).findOne({ _id: new ObjectId(id) })

    return result
  } catch (error) {
    throw new Error(error)
  }
}

export const groupModel = {
  GROUP_COLLECTION_NAME,
  GROUP_COLLECTION_SCHEMA,
  createNew,
  findOneById
}