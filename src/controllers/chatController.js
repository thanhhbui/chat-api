import { StatusCodes } from 'http-status-codes'
import { chatService } from '~/services/chatService'

const createNew = async (req, res, next) => {
  try {
    // điều hướng dữ liệu qua service để xử lý
    const createdChat = await chatService.createNew(req.body)
    // có kết quả thì trả về client
    res.status(StatusCodes.CREATED).json(createdChat)
  } catch (error) {
    next(error)
  }
}

export const chatController = {
  createNew
}