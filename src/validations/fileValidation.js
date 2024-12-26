import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/ApiError'

// Middleware validate dữ liệu từ client gửi về
const validateFileUpload = async (req, res, next) => {
  const correctCondition = Joi.object({
    chatId: Joi.string().required(), // ID của đoạn chat chứa file.
    uploaderId: Joi.string().required(), // ID người tải lên.
    fileName: Joi.string().required().max(255).trim(), // Tên file.
    fileType: Joi.string().required().valid('image', 'pdf', 'video', 'audio', 'document'), // Loại file.
    fileSize: Joi.number().required().max(10485760), // Kích thước tối đa: 10MB (10 * 1024 * 1024).
    uploadedAt: Joi.date().timestamp('javascript').default(Date.now).required() // Thời gian tải lên.
  })

  try {
    await correctCondition.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (error) {
    next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message ))
  }
}

export const fileValidation = {
  validateFileUpload
}
