"use strict";

/**
 * Skill
 * @description :: Model for storing Skill records
 */

module.exports = {
  schema: true,

  attributes: {
    // Fill your attributes here

    toJSON() {
      return this.toObject();
    }
  },

  beforeUpdate: (values, next) => next(),
  beforeCreate: (values, next) => next()
};
