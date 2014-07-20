'use strict';

var template = require('../../utils/template');
var Client = require('./client');

var ClientsList = Marionette.CollectionView.extend({
  className: 'client-collection',
  itemView: Client,

  // https://github.com/marionettejs/backbone.marionette/wiki/Adding-support-for-sorted-collections
  appendHtml: function (collectionView, itemView, index) {
      var childrenContainer = collectionView.itemViewContainer ? collectionView.$(collectionView.itemViewContainer) : collectionView.$el;
      var children = childrenContainer.children();
      if (children.size() <= index) {
        childrenContainer.append(itemView.el);
      } else {
        children.eq(index).before(itemView.el);
      }
    }
});

module.exports = Clients;
var Clients = Marionette.BossView.extend({

  className: 'clients',
  template: template('clients/clients'),

  subViews: {
    list: ClientsList
  },

  subViewEvents: {
    'list itemview:select': 'selectClient'
  },

  events: {
    'click .create-client': 'createClient',
  },

  createClient: function () {
    this.trigger('create:client');
  },

  selectClient: function (view) {
    this.$el.find('.active').removeClass('active');
    var client = view.model;
    this.trigger('select:client', client);
  }

});

module.exports = Clients;