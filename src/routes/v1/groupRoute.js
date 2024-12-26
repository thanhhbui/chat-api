import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { groupController } from '~/controllers/groupController'
import { groupValidation } from '~/validations/groupValidation'

const Router = express.Router()

Router.route('/')
  .get((req, res) => {
    res.status(StatusCodes.OK).json({ message: 'Note: API get list chat' })
  })
  .post(groupValidation.createNew, groupController.createNew)

export const groupRoute = Router