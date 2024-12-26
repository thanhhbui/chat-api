/* eslint-disable no-useless-catch */
import { fileModel } from '~/models/fileModel'

const createNew = async ( data ) => {
  try {
    const newFile = {
      ...data
    }

    const createdFile = await fileModel.createNew(newFile)
    const getFile = await fileModel.findOneById(createdFile.insertedId)
    // console.log(getFile)

    return getFile
  } catch (error) {
    throw error
  }
}

export const fileService = {
  createNew
}