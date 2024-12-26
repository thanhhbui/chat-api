import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/ApiError'

const validateSignUp = async (req, res, next) => {
  const correctCondition = Joi.object({
    username: Joi.string().required().min(3).max(50).trim().strict(),
    fullname: Joi.string().required().min(3).max(50).trim().strict(),
    email: Joi.string().email().required().trim().strict(),
    password: Joi.string().required().min(8).max(30),
    role: Joi.string().valid('user', 'admin').default('user'),
    confirmPassword: Joi.string().valid(Joi.ref('password')).required(),
    publicKey: Joi.string().required().min(50)
  })

  try {
    await correctCondition.validateAsync(req.body, { abortEarly: false })
    next()
    // res.status(StatusCodes.CREATED).json({ message: 'POST from validation: API create new chat' })
  } catch (error) {
    next(new ApiError( StatusCodes.UNPROCESSABLE_ENTITY, error.details.map(err => err.message).join(', ')))
  }
}

const validateLogin = async (req, res, next) => {
  const correctCondition = Joi.object({
    email: Joi.string().email().required().trim().strict(),
    password: Joi.string().required().min(8).max(30),
    publicKey: Joi.string().required().min(50)
  })

  try {
    await correctCondition.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (error) {
    next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, error.details.map(err => err.message).join(', ')))
  }
}

export const authValidation = {
  validateSignUp,
  validateLogin
}
