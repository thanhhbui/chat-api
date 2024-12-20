import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/ApiError'

const createNew = async (req, res, next) => {
  const correctCondition = Joi.object({
    name: Joi.string().required().min(3).max(50).trim().strict(),
    type: Joi.string().required().min(3).max(50).trim().strict()
  })

  try {
    console.log(req.body)

    await correctCondition.validateAsync(req.body, { abortEarly: false })
    next()
    // res.status(StatusCodes.CREATED).json({ message: 'POST from validation: API create new chat' })
  } catch (error) {
    next(new ApiError( StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message ))
  }
}

export const chatValidation = {
  createNew
}
