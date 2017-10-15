"use strict";

/**
 * Default model configuration
 *
 * Unless you override them, the following properties will be included in each of your models.
 */

const uuid = require('node-uuid');

module.exports = {
  models: {
    /**
     * Your app's default connection
     * @type {Array}
     */
    connection: ['mongo'],

    /**
     * How and whether Sails will attempt to automatically rebuild the tables/collections/etc. in your schema
     * Available values is `safe`, `alter` or `drop`
     * @type {String}
     */
    migrate: 'alter',

    schema: true,
    autoPK: false,

    /**
     * The default attributes
     * @type {Object}
     */
    attributes: {
      id: {
        type: 'string',
        primaryKey: true,
        defaultsTo: function() {
          return uuid.v4();
        },
        unique: true,
        required: true,
        index: true,
        uuidv4: true
      },

      toJSON() {
        let obj = this.toObject();
        //If not admin, remove those fields
        delete obj._owner;
        delete obj._client;
        return obj;
      }
    },

    beforeUpdate: (values, next) => next(),
    beforeCreate: (values, next) => next(),
    afterCreate: (values, next) => next(),
    afterUpdate: (values, next) => next(),
    afterDestroy: (values, next) => next()
  }
};