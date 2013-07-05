// Generated by CoffeeScript 1.6.3
(function() {
  var $, Base, Rows, Table, TableRow,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Base = require('../libs/base');

  $ = Base.$;

  TableRow = require('../controllers/table.row');

  Rows = require('../models/row');

  Table = (function(_super) {
    __extends(Table, _super);

    Table.prototype.elements = {
      '.rows': 'table'
    };

    Table.prototype.events = {
      'click .add-row': 'createRow',
      'keydown input': 'move'
    };

    function Table() {
      this.move = __bind(this.move, this);
      this.createRow = __bind(this.createRow, this);
      this.update = __bind(this.update, this);
      this.removeRow = __bind(this.removeRow, this);
      this.addRow = __bind(this.addRow, this);
      var _this = this;
      Table.__super__.constructor.apply(this, arguments);
      this.count = 1;
      this.rows = new Rows();
      this.rows.on('create:model', this.addRow);
      this.rows.on('destroy:model', this.removeRow);
      this.rows.on('change', this.update);
      this.table.sortable({
        axis: 'y',
        handle: '.handle',
        items: 'li',
        stop: function(e, ui) {
          var index, row;
          row = ui.item.data('item');
          index = ui.item.index();
          return _this.rows.move(row, index);
        }
      });
    }

    Table.prototype.addRow = function(row) {
      var view;
      view = row.view = new TableRow({
        row: row
      });
      view.el = $(view.render());
      view.el.data('item', row);
      this.table.append(view.el);
      view._bind();
      return view.focus();
    };

    Table.prototype.removeRow = function(row) {
      return row.view.el.remove();
    };

    Table.prototype.update = function() {
      var _this = this;
      this.count = 1;
      return this.rows.forEach(function(row) {
        if (row.type === 'number') {
          return row.number = _this.count++;
        }
      });
    };

    Table.prototype.createRow = function(e) {
      var details, type, types, _i, _len;
      types = ['bullet', 'heading', 'section', 'number'];
      for (_i = 0, _len = types.length; _i < _len; _i++) {
        type = types[_i];
        if (e != null ? e.target.classList.contains("row-" + type) : void 0) {
          break;
        }
      }
      details = {
        name: '',
        type: type
      };
      if (type === 'number') {
        details.number = this.count++;
      }
      return this.rows.create(details);
    };

    Table.prototype.move = function(e) {
      switch (e.keyCode) {
        case 38:
          return $(e.target).parent().prev('li').find('input').focus();
        case 40:
          return $(e.target).parent().next('li').find('input').focus();
      }
    };

    return Table;

  })(Base.Controller);

  module.exports = Table;

}).call(this);
