import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { messageController } from '~/controllers/messageController'
import { messageValidation } from '~/validations/messageValidation'

const Router = express.Router()

Router.route('/')
  .get((req, res) => {
    res.status(StatusCodes.OK).json({ message: 'Note: API get list chat' })
  })
  .post(messageValidation.createNew, messageController.createNew)

export const messageRoute = Router