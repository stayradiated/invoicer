// Generated by CoffeeScript 1.6.3
(function() {
  var Base, TableRow,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Base = require('base');

  window.Rows = require('../models/row');

  TableRow = (function(_super) {
    __extends(TableRow, _super);

    TableRow.prototype.template = new Base.View('table.row');

    TableRow.prototype.elements = {
      'input': 'input',
      'label': 'number'
    };

    TableRow.prototype.events = {
      'change input': 'setName',
      'click .delete': 'delete',
      'click .style': 'style'
    };

    function TableRow() {
      this.style = __bind(this.style, this);
      this.render = __bind(this.render, this);
      this.updateNumber = __bind(this.updateNumber, this);
      this.focus = __bind(this.focus, this);
      this.setName = __bind(this.setName, this);
      this["delete"] = __bind(this["delete"], this);
      TableRow.__super__.constructor.apply(this, arguments);
      this.listen(this.row, 'change:number', this.updateNumber);
    }

    TableRow.prototype["delete"] = function() {
      return this.row.destroy();
    };

    TableRow.prototype.setName = function(e) {
      return this.row.name = this.input.val();
    };

    TableRow.prototype.focus = function() {
      return this.input.focus();
    };

    TableRow.prototype.updateNumber = function(val) {
      return this.number.html(val);
    };

    TableRow.prototype.render = function() {
      return this.template.render(this.row);
    };

    TableRow.prototype.style = function() {
      var type;
      switch (this.row.type) {
        case 'heading':
          type = 'number';
          break;
        case 'number':
          type = 'bullet';
          break;
        case 'bullet':
          type = 'heading';
          break;
        default:
          return;
      }
      return this.row.type = type;
    };

    return TableRow;

  })(Base.Controller);

  module.exports = TableRow;

}).call(this);
