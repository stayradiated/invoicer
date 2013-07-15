// Generated by CoffeeScript 1.6.3
(function() {
  var $, Base, Client, Detail, Search, When, _,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  require('date-utils');

  Base = require('base');

  Detail = require('../models/detail');

  Client = require('../models/client');

  When = require('when');

  When.delay = require('when/delay');

  _ = require('underscore');

  $ = require('jqueryify');

  Search = (function(_super) {
    __extends(Search, _super);

    Search.prototype.template = {
      client: new Base.View('search.client'),
      invoice: new Base.View('search.invoice')
    };

    Search.prototype.elements = {
      'input.search-box': 'input',
      '.clients ul': 'clients',
      '.invoices ul': 'invoices'
    };

    Search.prototype.events = {
      'keyup input.search-box': 'queryChange',
      'change input.search-box': 'queryChange',
      'click .clients li': 'selectClient',
      'click .invoices li': 'selectInvoice',
      'click .invoices .new': 'createInvoice',
      'click .clients .delete': 'toggleDeleteMode'
    };

    function Search() {
      this.createInvoice = __bind(this.createInvoice, this);
      this.selectInvoice = __bind(this.selectInvoice, this);
      this.selectClient = __bind(this.selectClient, this);
      this.toggleDeleteMode = __bind(this.toggleDeleteMode, this);
      this.search = __bind(this.search, this);
      this.refresh = __bind(this.refresh, this);
      this.renderInvoices = __bind(this.renderInvoices, this);
      this.renderClients = __bind(this.renderClients, this);
      this.show = __bind(this.show, this);
      this.hide = __bind(this.hide, this);
      this.queryChange = _.debounce(this.search, 250);
      Search.__super__.constructor.apply(this, arguments);
      this.temp = {
        clients: {},
        invoices: {}
      };
      this.active = {
        client: null,
        invoice: null,
        el: {
          client: null,
          invoice: null
        }
      };
      this.shown = true;
      this.fadeout = 500;
    }

    Search.prototype.hide = function() {
      var _this = this;
      this.shown = false;
      this.el.css({
        opacity: 0
      });
      When.delay(this.fadeout).then(function() {
        return _this.el.css('display', 'none');
      });
      return false;
    };

    Search.prototype.show = function() {
      var _this = this;
      this.shown = true;
      this.el.css('display', 'block');
      When.delay(1).then(function() {
        return _this.el.css('opacity', '1');
      });
      return true;
    };

    Search.prototype.renderClients = function(clients) {
      return this.clients.html(this.template.client.render({
        clients: clients
      }));
    };

    Search.prototype.renderInvoices = function(invoices) {
      return this.invoices.html(this.template.invoice.render({
        invoices: invoices
      }));
    };

    Search.prototype.refresh = function() {
      this.input.val('');
      return this.search();
    };

    Search.prototype.search = function() {
      var query,
        _this = this;
      query = this.input.val();
      return storage.searchClients(query).then(function(clients) {
        var client, requests;
        requests = (function() {
          var _i, _len, _results;
          _results = [];
          for (_i = 0, _len = clients.length; _i < _len; _i++) {
            client = clients[_i];
            _results.push(storage.getClientInvoiceCount(client.id));
          }
          return _results;
        })();
        return When.all(requests).then(function(results) {
          var i, _i, _len;
          _this.temp.clients = {};
          for (i = _i = 0, _len = clients.length; _i < _len; i = ++_i) {
            client = clients[i];
            client.count = results[i];
            _this.temp.clients[client.id] = client;
          }
          return _this.renderClients(clients);
        });
      });
    };

    Search.prototype.toggleDeleteMode = function() {
      this.deleteClientMode = !this.deleteClientMode;
      return this.el.toggleClass('delete-mode', this.deleteClientMode);
    };

    Search.prototype.selectClient = function(e) {
      var $el, clientId, _ref,
        _this = this;
      $el = $(e.currentTarget);
      clientId = $el.data('id');
      if (this.deleteClientMode) {
        if (this.temp.clients[clientId].count > 0) {
          return window.alert('Sorry, you must delete all the clients invoices first');
        }
        if (window.confirm('Are you sure you want to delete that client?')) {
          $el.remove();
          storage.deleteClient(clientId);
        }
        return;
      }
      if ((_ref = this.active.el.client) != null) {
        _ref.removeClass('active');
      }
      this.active.el.client = $el.addClass('active');
      this.active.client = this.temp.clients[clientId];
      return storage.getClientInvoices(clientId).then(function(invoices) {
        var invoice, _i, _len;
        _this.temp.invoices = {};
        for (_i = 0, _len = invoices.length; _i < _len; _i++) {
          invoice = invoices[_i];
          _this.temp.invoices[invoice.id] = invoice;
        }
        return _this.renderInvoices(invoices);
      });
    };

    Search.prototype.selectInvoice = function(e) {
      var $el, invoiceId, _ref,
        _this = this;
      $el = $(e.currentTarget);
      invoiceId = $el.data('id');
      if (this.deleteClientMode) {
        if (window.confirm('Are you sure you want to delete that invoice?')) {
          $el.remove();
          storage.deleteInvoice(invoiceId);
          this.temp.clients[this.temp.invoices[invoiceId].clientId].count -= 1;
        }
        return;
      }
      if ((_ref = this.active.el.invoice) != null) {
        _ref.removeClass('active');
      }
      this.active.el.invoice = $el.addClass('active');
      this.active.invoice = this.temp.invoices[invoiceId];
      if (this.active.invoice.date instanceof Date) {
        this.active.invoice.date = this.active.invoice.date.toYMD();
      } else {
        console.log(this.active.invoice.date);
      }
      return storage.getRows(invoiceId).then(function(rows) {
        _this.trigger('select:invoice', _this.active.client, _this.active.invoice, rows);
        return _this.hide();
      });
    };

    Search.prototype.createInvoice = function() {
      this.trigger('create:invoice', this.active.client);
      return this.hide();
    };

    return Search;

  })(Base.Controller);

  module.exports = Search;

}).call(this);
