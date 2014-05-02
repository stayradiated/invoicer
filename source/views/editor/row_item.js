'use strict';

var template = require('../../utils/template');

var RowItem = Backbone.Marionette.ItemView.extend({

  className: 'row item',
  template: template('editor/row_item'),

  ui: {
    input: 'input',
  },

  events: {
    'change input': 'change',
    'click .switch-type': 'switchType'
  },

  change: function () {
    this.model.set('name', this.ui.input.val());
  },

  switchType: function () {
    this.model.set('type', 1);
  }

});

module.exports = RowItem;

