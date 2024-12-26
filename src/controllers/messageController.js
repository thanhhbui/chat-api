import { StatusCodes } from 'http-status-codes'
import { messageService } from '~/services/messageService'

const createNew = async (req, res, next) => {
  try {
    // điều hướng dữ liệu qua service để xử lý
    const createdMes = await messageService.createNew(req.body)
    // có kết quả thì trả về client
    res.status(StatusCodes.CREATED).json(createdMes)
  } catch (error) {
    next(error)
  }
}

export const messageController = {
  createNew
}