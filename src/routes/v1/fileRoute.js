import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { fileController } from '~/controllers/fileController'
import { fileValidation } from '~/validations/fileValidation'

const Router = express.Router()

Router.route('/')
  .get((req, res) => {
    res.status(StatusCodes.OK).json({ message: 'Note: API get list chat' })
  })
  .post(fileValidation.validateFileUpload, fileController.createNew)

export const fileRoute = Router