/**
* LightHistory.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  schema: true,

  attributes: {
    value: {
      type: 'integer',
      required: true
    },
    color: {
      type: 'integer',
      required: true
    }
  }
};
