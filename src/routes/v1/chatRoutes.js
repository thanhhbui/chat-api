import express from 'express'
import { StatusCodes } from 'http-status-codes'

const Router = express.Router()

Router.route('/')
  .get((req, res) => {
    res.status(StatusCodes.OK).json({ message: 'Note: API get list chat' })
  })
  .post((req, res) => {
    res.status(StatusCodes.CREATED).json({ message: 'Note: API create new chat' })
  })

export const chatRoutes = Router