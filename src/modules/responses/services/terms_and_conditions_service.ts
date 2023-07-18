import { Op } from "sequelize";
import Exception from "../../../exceptions/exception";
import { ERROR_TYPE } from "../../../utils/constants";
import { logger } from "../../../utils/logger";
import terms_and_conditions from "../models/terms_and_conditions"

export class terms_and_conditions_Service {
  async getTermsById(req: any) {

  }

  async createTerms(req: any, res: any) {
    try {
      let createTerms = await terms_and_conditions.create(req.body)
      return Promise.resolve(createTerms)
    } catch (err: any) {
      logger.error("Error in creating termsAndConditions")
      return Promise.reject(err)
    }
  }

  async updateTerms(req: any) {
    try {
      const id = req.params.id
      const Exist = await terms_and_conditions.findOne({ where: { id: id } })

      if (!Exist) {
        throw new Exception(ERROR_TYPE.NOT_FOUND, 'Id not exist, So we can not update it')
      }
      const dataUpdated = await terms_and_conditions.update(req.body, { where: { id: id } })
      return Promise.resolve(dataUpdated);
    }
    catch (err: any) {
      logger.error("Error in updating data")
      return Promise.reject(err.message)
    }
  }

  async deletesTerms(req: any) {
    try {
      const id = req.params.id
      const termsAndConditions = await terms_and_conditions.findOne({ where: { id: req.params.id } });
      if (!termsAndConditions) {
        throw new Exception(ERROR_TYPE.NOT_FOUND, 'termsAndConditions not found')
      }
      let data = await termsAndConditions.destroy({
        // where: {
        //   id: id
        // }
      });
      return Promise.resolve("termsAndConditions deleted successfully.");
    } catch (err: any) {
      return Promise.reject(err)
    }

  }
  async readAllTerms(req: any) {
    try {
      let data = await terms_and_conditions.findAll()
      return Promise.resolve(data)
    } catch (err: any) {
      logger.err("Error in geting termsAndConditions:: ", err)
    }
  }

}

