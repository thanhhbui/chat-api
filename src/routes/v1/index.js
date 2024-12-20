import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { chatRoute } from './chatRoute'

const Router = express.Router()

// check API v1
Router.get('/status', (req, res) => {
  res.status(StatusCodes.OK).json({ message: 'APIs V1 are ready to use' })
})

// chat API
Router.use('/chats', chatRoute)

export const APIs_V1 = Router
