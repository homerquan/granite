"use strict";

/**
 * User
 * @description :: Model for storing users
 */

module.exports = {
  attributes: {
    username: {
      type: "string",
      required: true,
      unique: true,
      alphanumericdashed: true
    },

    password: {
      type: "string"
    },

    roles: {
      type: "array"
    },

    email: {
      type: "email",
      required: true,
      unique: true
    },

    firstName: {
      type: "string",
      defaultsTo: ""
    },

    lastName: {
      type: "string",
      defaultsTo: ""
    },

    avator: {
      type: "string",
      defaultsTo: "",
      url: true
    },

    toJSON() {
      let obj = this.toObject();
      delete obj.password;
      delete obj.socialProfiles;
      return obj;
    }
  },

  beforeUpdate(values, next) {
    if (false === values.hasOwnProperty("password")) return next();
    if (/^\$2[aby]\$[0-9]{2}\$.{53}$/.test(values.password)) return next();

    return HashService.bcrypt
      .hash(values.password)
      .then(hash => {
        values.password = hash;
        next();
      })
      .catch(next);
  },

  beforeCreate(values, next) {
    if (false === values.hasOwnProperty("password")) return next();

    return HashService.bcrypt
      .hash(values.password)
      .then(hash => {
        values.password = hash;
        next();
      })
      .catch(next);
  }
};
