import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { chatValidation } from '~/validations/chatValidation'

const Router = express.Router()

Router.route('/')
  .get((req, res) => {
    res.status(StatusCodes.OK).json({ message: 'Note: API get list chat' })
  })
  .post(chatValidation.createNew)

export const chatRoute = Router