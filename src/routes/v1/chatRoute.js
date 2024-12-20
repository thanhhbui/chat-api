import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { chatValidation } from '~/validations/chatValidation'
import { chatController } from '~/controllers/chatController'

const Router = express.Router()

Router.route('/')
  .get((req, res) => {
    res.status(StatusCodes.OK).json({ message: 'Note: API get list chat' })
  })
  .post(chatValidation.createNew, chatController.createNew)

export const chatRoute = Router