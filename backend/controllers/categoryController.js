const axios = require("axios");
const Category = require("../models/category.model");
const mongoose = require("mongoose");
const categorySchema = require("../schemas/category.schema");

/**
 * This function crete category
 * @param {object} req name , description , phone number
 * @param {object} res
 * @returns void
 */
exports.create = async (req, res) => {
  const category = await Category.createCategory(req.body);
  if (!category.success) {
    return res.status(500).json({ error: category.error });
  }

  return res.json(category.data);
};

/**
 * This function update category by id
 * @param {object} req name
 * @param {object} res
 * @returns void
 */
exports.update = async (req, res) => {
  try {
    const updateCategory = await Category.updateCategory(
      req.params.id,
      req.body
    );
    if (!updateCategory.success) {
      return res.status(500).json({ error: updateCategory.error });
    }
    return res.json(updateCategory.data);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

/**
 * This function delete item from db
 * @param {object} req
 * @param {object} res
 * @returns void
 */
exports.destroy = async (req, res) => {
  const category = await categorySchema.findByIdAndDelete(req.params.id);
  if (!category) {
    return res.status(500).json({ error: category.error });
  }
  return res.json({ success: true });
};
