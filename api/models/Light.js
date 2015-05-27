/**
* Light.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var Promise = require("bluebird");
var request = Promise.promisify(require("request"));

var logHistory = function (value, color) {
  return LightHistory.create({
    value: value,
    color: color
  });
};

module.exports = {
  schema: true,

  attributes: {
    color: {
      type: 'integer',
      required: true,
      min: 1,
      max: 3
    },
    value: {
      type: 'integer',
      min: 0,
      max: 5
    },
    status: {
      type: 'boolean'
    }
  },

  beforeUpdate: function (light, next) {
    if (light.value < 1) {
      light.status = false;
    } else {
      light.status = true;
    }
  },

  afterUpdate: function (light, next) {
    request.post({
      url: 'http://localhost:3000/' + light.color,
      form: {
        status: light.status,
        value: light.value
      }
    })
    .then(function () {
      return LightHistory.create(light);
    })
    .then(function () {
      next();
    }, function (err) {
      next(err);
    });
  }
};
