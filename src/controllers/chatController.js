
import { StatusCodes } from 'http-status-codes'

const createNew = async (req, res, next) => {
  try {
    console.log('req.body: ', req.body)
    console.log('req.params: ', req.params)
    console.log('req.query: ', req.query)

    res.status(StatusCodes.CREATED).json({
      message: 'POST from controller: API'
    })
  } catch (error) {
    next(error)
  }
}

export const chatController = {
  createNew
}