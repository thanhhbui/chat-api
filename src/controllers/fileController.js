import { StatusCodes } from 'http-status-codes'
import { fileService } from '~/services/fileService'

const createNew = async (req, res, next) => {
  try {
    // điều hướng dữ liệu qua service để xử lý
    const createdFile = await fileService.createNew(req.body)
    // có kết quả thì trả về client
    res.status(StatusCodes.CREATED).json(createdFile)
  } catch (error) {
    next(error)
  }
}

export const fileController = {
  createNew
}