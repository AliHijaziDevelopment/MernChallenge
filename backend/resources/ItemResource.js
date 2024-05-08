const PhoneInfoResource = require("./PhoneInfoResource");

class ItemResource {
  constructor(item) {
    this.item = item;
  }

  toJSON() {
    return {
      id: this.item._id,
      name: this.item.name,
      description: this.item.description,
      phone_number: this.item.phoneNumber,
      category: this.item.category,
      phone_info: this.item?.phoneNumber
        ? new PhoneInfoResource(this.item.phone_info)
        : null,
      created_at: this.item.createdAt,
    };
  }
}

module.exports = ItemResource;
