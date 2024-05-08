class PhoneInfoResource {
  constructor(phoneInfo) {
    this.phoneInfo = phoneInfo;
  }

  toJSON() {
    return {
      id: this.phoneInfo._id,
      country_code: this.phoneInfo.countryCode,
      country_name: this.phoneInfo.countryName,
      operator_name: this.phoneInfo.operatorName,
      created_at: this.phoneInfo.createdAt
    };
  }
}

module.exports = PhoneInfoResource;
