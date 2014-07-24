'use strict';

var Backbone = require('backbone');

var Invoice = require('./invoice');
var Invoices = require('./invoices');
var config = require('../../package').config;

var Client = Backbone.RelationalModel.extend({

  urlRoot: config.root + '/clients',

  defaults: {
    name: '',
    address: '',
    city: '',
    postcode: '',
    createdAt: null,
    updatedAt: null 
  },

  relations: [{
    type: 'HasMany',
    key: 'invoices',
    relatedModel: Invoice,
    collectionType: Invoices,
    includeInJSON: 'id',
    reverseRelation: {
      key: 'client',
      includeInJSON: 'id'
    }
  }],

  parse: function (json) {
    json.date = new Date(json.date);
    json.createdAt = new Date(json.createdAt);
    json.updatedAt = new Date(json.updatedAt);
    return json;
  },

  matchFilter: function (filter) {
    return this.get('name').toLowerCase().indexOf(filter.toLowerCase()) >= 0;
  }

});

module.exports = Client;
