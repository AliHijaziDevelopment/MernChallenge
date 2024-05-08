const mongoose = require("mongoose");

const categorySchema = require("../schemas/category.schema");

class Category {
  /**
   * get all categories
   * @param {*} res
   * @returns
   */
  static async getCategories() {
    try {
      const categories = await categorySchema.find({}).sort({ createdAt: -1 });

      return { success: true, data: categories };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  /**
   * create category
   * @param {Array} data
   * @returns
   */
  static async createCategory(data) {
    try {
      const newCategory = new categorySchema(data);
      await newCategory.save();
      return { success: true, data: newCategory };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  /**
   * this function update category
   * @param {Array} data
   * @returns
   */
  static async updateCategory(id, data) {
    try {
      const category = await categorySchema.findById(id);
      Object.assign(category, data);
      await category.save();
      return { success: true, data: category };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}

module.exports = Category;
