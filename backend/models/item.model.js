const mongoose = require("mongoose");

const Item = require("../schemas/item.schema");
const ItemResource = require("../resources/ItemResource");

class Items {
  /**
   * get all items with phone info if exists
   * @param {*} res 
   * @returns 
   */
  static async getItems() {
    try {
      const items = await Item.find({})
        .populate("phone_info")
        .sort({ createdAt: -1 })
        .exec();
      const resources = items.map((item) => new ItemResource(item));
      return { success: true, data: resources };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  /**
   * create item and phone info (create phone info only if phone number exist and validated)
   * @param {Array} userData 
   * @param {*} session 
   * @returns 
   */
  static async createItem(userData, session) {
    try {
      const newItem = new Item(userData);
      await newItem.save({ session });
      return { success: true, data: newItem };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  /**
   * this function update an item
   * @param {Item} item 
   * @param {Array} userData 
   * @param {*} session 
   * @returns 
   */
  static async updateItem(item, userData, session) {
    try {
      Object.assign(item, userData);
      await item.save({ session });
      return { success: true, data: new ItemResource(item) };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}

module.exports = Items;
