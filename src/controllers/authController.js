import { StatusCodes } from 'http-status-codes'
import { userService } from '~/services/authService'

const createNew = async (req, res, next) => {
  try {
    // điều hướng dữ liệu qua service để xử lý
    const createdUser = await userService.createNew(req.body)
    // có kết quả thì trả về client
    res.status(StatusCodes.CREATED).json(createdUser)
  } catch (error) {
    next(error)
  }
}

export const authController = {
  createNew
}