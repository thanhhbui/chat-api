import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/ApiError'

const createNew = async (req, res, next) => {
  const correctCondition = Joi.object({
    chatId: Joi.string().required(), // ID của đoạn chat
    senderId: Joi.string().required(), // ID người gửi
    content: Joi.string().required().max(500).trim(), // Nội dung tin nhắn
    sentAt: Joi.date().timestamp('javascript').default(Date.now).required(), // Thời gian gửi
    attachments: Joi.array().items(Joi.string()).optional() // Danh sách file/hình ảnh đính kèm
  })

  try {
    await correctCondition.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (error) {
    next(new ApiError( StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message ))
  }
}

export const messageValidation = {
  createNew
}