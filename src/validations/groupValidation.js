import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/ApiError'

const createNew = async (req, res, next) => {
  const correctCondition = Joi.object({
    name: Joi.string().required().min(3).max(50).trim(),
    description: Joi.string().optional().max(500).trim(),
    slug: Joi.string().required().min(3).trim().strict(),
    members: Joi.array()
      .items(Joi.string().required())
      .required(), // Mảng các ID thành viên
    adminId: Joi.string().required(), // ID của admin
    createdAt: Joi.date().timestamp('javascript').default(Date.now), // Thời gian tạo
    updatedAt: Joi.date().timestamp('javascript').default(null) // Thời gian cập nhật
  })

  try {
    await correctCondition.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (error) {
    next(new ApiError( StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message ))
  }
}

export const groupValidation = {
  createNew
}