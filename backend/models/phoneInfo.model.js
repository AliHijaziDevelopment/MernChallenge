const mongoose = require("mongoose");
const PhoneInfo = require("../schemas/phone_info.schema");

class PhoneInfoModel {
  /**
   * this create phone info
   * @param {int} item_id
   * @param {Array} data
   * @param {*} session
   * @returns
   */
  static async createInfo(item_id, data, session) {
    const info = {
      countryCode: data.country.code,
      countryName: data.country.name,
      operatorName: data.carrier,
      item: item_id,
    };
    try {
      const newPhoneInfo = new PhoneInfo(info);
      await newPhoneInfo.save(session);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  /**
   * this updates phone info, and if no old info it creates new one
   * @param {Item} item
   * @param {Array} data
   * @param {*} session
   * @returns
   */
  static async updateInfo(item, data, session) {
    if (!item.phone_info) {
      const newItem = await this.createInfo(item._id, data, session);
      return newItem;
    }
    const info = {
      countryCode: data.country.code,
      countryName: data.country.name,
      operatorName: data.carrier,
      item: item._id,
    };
    try {
      //assign value for the phone info to be created and save
      Object.assign(item.phone_info, info);
      await item.phone_info.save({ session });
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  /**
   * this deleted phone info
   * @param {PhoneInfo} phoneInfo
   * @param {*} session
   * @returns
   */
  static async deleteInfo(phoneInfo, session) {
    try {
      await PhoneInfo.deleteOne(phoneInfo, { session });
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}

module.exports = PhoneInfoModel;
