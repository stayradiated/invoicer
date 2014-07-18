var _ = require('lodash');
var Signals = require('signals');
var AppDispatcher = require('../dispatchers/app');
var AppConstants = require('../constants/app');

var ClientCollection = require('../models/clients');

var clientCollection = new ClientCollection();

var ClientStore = Signals.convert({

  init: function () {
    clientCollection.fetch({ reset: true });
  },

  getCollection: function () {
    return clientCollection;
  }

});

AppDispatcher.register(function (payload) {
  var action = payload.action;

  switch (action.actionType) {

    case AppConstants.SOME_CONSTANT:
      break;

  }

  return true;

});

ClientStore.init();
module.exports = ClientStore;
