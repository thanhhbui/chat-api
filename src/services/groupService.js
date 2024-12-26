/* eslint-disable no-useless-catch */
import { groupModel } from '~/models/groupModel'
import { slugify } from '~/utils/formater'

const createNew = async ( data ) => {
  try {
    const newGroup = {
      ...data,
      slug: slugify(data.name)
    }

    const createdGroup = await groupModel.createNew(newGroup)
    const getGroup = await groupModel.findOneById(createdGroup.insertedId)
    // console.log(getChat)

    return getGroup
  } catch (error) {
    throw error
  }
}

export const groupService = {
  createNew
}