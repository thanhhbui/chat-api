import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { chatRoute } from './chatRoute'
import { authRoute } from './authRoute'
import { groupRoute } from './groupRoute'
import { messageRoute } from './messageRoute'
import { fileRoute } from './fileRoute'

const Router = express.Router()

// check API v1
Router.get('/status', (req, res) => {
  res.status(StatusCodes.OK).json({ message: 'APIs V1 are ready to use' })
})

// chat API
Router.use('/chats', chatRoute)
Router.use('/auth', authRoute)
Router.use('/groups', groupRoute)
Router.use('/messages', messageRoute)
Router.use('/files', fileRoute)

export const APIs_V1 = Router
