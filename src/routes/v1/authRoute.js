import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { authValidation } from '~/validations/authValidation'
import { authController } from '~/controllers/authController'

const Router = express.Router()

Router.route('/')
  .get((req, res) => {
    res.status(StatusCodes.OK).json({ message: 'Note: API auth user' })
  })
  .post( authValidation.validateSignUp, authController.createNew )

export const authRoute = Router