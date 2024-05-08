const axios = require("axios");
const Items = require("../models/item.model");
const Category = require("../models/category.model");
const Item = require("../schemas/item.schema");
const PhoneInfoSchema = require("../schemas/phone_info.schema");
const PhoneInfo = require("../models/phoneInfo.model");
const mongoose = require("mongoose");
const { error } = require("toastr");
const ItemResource = require("../resources/ItemResource");

/**
 * this function get all items stored
 * @param {} req
 * @param {array} res
 * @returns void
 */
exports.index = async (req, res) => {
  const items = await Items.getItems();
  const categories = await Category.getCategories();

  if (!items.success || !categories.success) {
    return res.status(500).json({ error: items.error || categories.error });
  }
  return res.json({ items: items.data, categories: categories.data });
};

/**
 * This function validate phone number if exists , then if validate it stores the information in db
 * @param {object} req name , description , phone number
 * @param {object} res
 * @returns void
 */
exports.create = async (req, res) => {
  const phoneNumber = req.body.phoneNumber;
  let validNumber;
  //used mongoose session , since we are insterting in two table , if error in one of them we rollback the changes,and return the error
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    //validate phone number if exist
    if (phoneNumber) {
      validNumber = await phoneValidation(phoneNumber);
      if (!validNumber.success) {
        throw new Error(validNumber.error);
      }
    }

    //create the item
    const item = await Items.createItem(req.body, session);
    if (!item.success) {
      throw new Error(item.error);
    }

    //create the phone info
    if (phoneNumber) {
      const phoneInfo = await PhoneInfo.createInfo(
        item.data.id,
        validNumber.data,
        session
      );
      if (!phoneInfo.success) {
        throw new Error(phoneInfo.error);
      }
    }

    await session.commitTransaction();
    //return the item with its phone info
    const newItem = await Item.findById(item.data._id)
      .populate("phone_info")
      .exec();
    return res.json(new ItemResource(newItem));
  } catch (error) {
    await session.abortTransaction();
    return res.status(500).json({ error: error.message });
  } finally {
    session.endSession();
  }
};

/**
 * This function validate phone number if exists and different than the old one , then if validate it updates the information in db
 * @param {object} req name , description , phone number
 * @param {object} res
 * @returns void
 */
exports.update = async (req, res) => {
  const item = await Item.findById(req.params.id).populate("phone_info").exec();

  const phoneNumber = req.body.phoneNumber;
  let validNumber = null;

  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    if (phoneNumber && phoneNumber != item.phoneNumber) {
      validNumber = await phoneValidation(phoneNumber);
      if (!validNumber.success) {
        throw new Error(validNumber.error);
      }
    } else if (!phoneNumber && item.phoneNumber) {
      deletePhoneInfo = await PhoneInfo.deleteInfo(item.phone_info, session);
      if (!deletePhoneInfo.success) {
        throw new Error(deletePhoneInfo.error);
      }
    }

    const updateItem = await Items.updateItem(item, req.body, session);
    if (!updateItem.success) {
      throw new Error(updateItem.error);
    }

    if (validNumber) {
      const phoneInfo = await PhoneInfo.updateInfo(
        item,
        validNumber.data,
        session
      );
      if (!phoneInfo.success) {
        throw new Error(phoneInfo.error);
      }
    }

    await session.commitTransaction();
    return res.json(updateItem.data);
  } catch (error) {
    await session.abortTransaction();
    return res.status(500).json({ error: error.message });
  } finally {
    session.endSession();
  }
};

/**
 * This function delete item from db
 * @param {object} req
 * @param {object} res
 * @returns void
 */
exports.destroy = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const itemId = req.params.id;

    const item = await Item.findByIdAndDelete(itemId);
    if (item.phoneNumber)
      await PhoneInfoSchema.findOneAndDelete({ item: itemId });

    await session.commitTransaction();
    return res.json({ success: true });
  } catch (error) {
    await session.abortTransaction();
    return res.status(500).json({ error: error.message });
  } finally {
    session.endSession();
  }
};

/**
 * this function validate phone number , if validated it return the infromation about the number
 * @param {*} phoneNumber
 * @returns
 */
const phoneValidation = async (phoneNumber) => {
  const url = process.env.PHONE_VALIDATION_KEY + phoneNumber;
  try {
    const response = await axios.get(url);
    const { valid } = response.data;
    if (!valid) {
      return { success: false, error: "Invalid phone number" };
    }

    return { success: true, data: response.data };
  } catch (error) {
    return {
      success: false,
      error: "Something went wrong! please try again later",
    };
  }
};
