
import { StatusCodes } from 'http-status-codes'
import { groupService } from '~/services/groupService'


const createNew = async (req, res, next) => {
  try {
    // điều hướng dữ liệu qua service để xử lý
    const createdGroup = await groupService.createNew(req.body)
    // có kết quả thì trả về client
    res.status(StatusCodes.CREATED).json(createdGroup)
  } catch (error) {
    next(error)
  }
}

export const groupController = {
  createNew
}