/* eslint-disable no-useless-catch */
import { slugify } from '~/utils/formater'
import { userModel } from '~/models/userModel'

const createNew = async ( data ) => {
  try {
    const newUser = {
      ...data,
      slug: slugify(data.username)
    }

    const createdUser = await userModel.createNew(newUser)
    const getUser = await userModel.findOneById(createdUser.insertedId)
    // console.log(getChat)

    return getUser
  } catch (error) {
    throw error
  }
}

const getUserById = async (id) => {
  try {
    return await userModel.findOneById(id)
  } catch (error) {
    throw error
  }
}

const updateUser = async (id, data) => {
  try {
    const result = await userModel.updateOneById(id, data)
    if ( result.modifiedCount === 0 ) {
      throw new Error('User not found or no changes made')
    }

    return await userModel.findOneById(id)
  } catch (error) {
    throw error
  }
}

const deleteUser = async (id) => {
  try {
    return await userModel.deleteOne(id)
  } catch (error) {
    throw error
  }
}

export const userService = {
  createNew,
  getUserById,
  updateUser,
  deleteUser
}