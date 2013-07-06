// Generated by CoffeeScript 1.6.3
(function() {
  var Base, Search,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Base = require('../libs/base');

  Search = (function(_super) {
    __extends(Search, _super);

    Search.prototype.template = new Base.View('search.result');

    Search.prototype.elements = {
      'input': 'input',
      '.results': 'results'
    };

    Search.prototype.events = {
      'keyup input': 'search',
      'click li': 'select'
    };

    function Search() {
      this.select = __bind(this.select, this);
      this.search = __bind(this.search, this);
      this.render = __bind(this.render, this);
      Search.__super__.constructor.apply(this, arguments);
    }

    Search.prototype.render = function(invoices) {
      var invoice, _i, _len, _results;
      this.results.empty();
      _results = [];
      for (_i = 0, _len = invoices.length; _i < _len; _i++) {
        invoice = invoices[_i];
        _results.push(this.results.append(this.template.render(invoice)));
      }
      return _results;
    };

    Search.prototype.search = function(e) {
      var query,
        _this = this;
      query = this.input.val();
      return this.storage.searchClients(query, function(err, results) {
        return _this.render(results);
      });
    };

    Search.prototype.select = function(e) {
      return console.log(e.target);
    };

    return Search;

  })(Base.Controller);

  module.exports = Search;

}).call(this);