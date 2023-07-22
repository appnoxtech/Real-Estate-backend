import { Op } from "sequelize";
import Exception from "../../../exceptions/exception";
import { ERROR_TYPE, RESPONSE_STATUS } from "../../../utils/constants";
import { logger } from "../../../utils/logger";
import Feedback from "../models/feedBack"
import User from "../../users/model/userModel";

export class feedBack_Service {

  async createFeedback(req: any, res: any) {
    try {
      let createFeedback = await Feedback.create(req.body)
      return Promise.resolve(createFeedback)
    } catch (err: any) {
      logger.error("Error in creating feedback")
      return Promise.reject(err)
    }


  }
  async getById(req: any, res: any) {

    let getData = await Feedback.findOne({
      where: {
        id: req.params.id
      }
    })
    if (!getData) {
      throw new Exception(ERROR_TYPE.NOT_FOUND, 'Data not found')
    }
    let userId = getData?.dataValues?.userId
    let userData = await User.findOne({
      where: {
        id: userId
      },
      attributes: ['name', 'email', 'phoneNumber']
    })
    let finalData = [
      getData,
      userData
    ]
    return Promise.resolve(finalData)

  }
  async deletesFeedBack(req: any) {
    try {
      const id = req?.params?.id
      let data = await Feedback.destroy({
        where: {
          id: req.params.id
        }
      })
      if (data) {
        return Promise.resolve("Feedback deleted successfully.");
      }
      else {
        throw new Exception(ERROR_TYPE.NOT_FOUND, 'Data not found')
      }
    } catch (err: any) {
      return Promise.reject(err)
    }

  }

}

