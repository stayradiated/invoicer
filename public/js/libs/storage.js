// Generated by CoffeeScript 1.6.3
(function() {
  var Base, Storage, When, mysql,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __slice = [].slice;

  Base = require('base');

  mysql = require('mysql');

  When = require('when');

  Storage = (function(_super) {
    __extends(Storage, _super);

    function Storage() {
      this.getRows = __bind(this.getRows, this);
      this.getInvoice = __bind(this.getInvoice, this);
      this.getClientInvoiceCount = __bind(this.getClientInvoiceCount, this);
      this.getClientInvoices = __bind(this.getClientInvoices, this);
      this.getInvoices = __bind(this.getInvoices, this);
      this.saveClient = __bind(this.saveClient, this);
      this.getClient = __bind(this.getClient, this);
      this.searchClients = __bind(this.searchClients, this);
      this.getClients = __bind(this.getClients, this);
      this.getSnippets = __bind(this.getSnippets, this);
      this.saveSnippet = __bind(this.saveSnippet, this);
      this.deleteSnippet = __bind(this.deleteSnippet, this);
      this.deleteClient = __bind(this.deleteClient, this);
      this.deleteInvoice = __bind(this.deleteInvoice, this);
      this.invoiceExists = __bind(this.invoiceExists, this);
      this.saveInvoice = __bind(this.saveInvoice, this);
      this._query = __bind(this._query, this);
      this.escape = __bind(this.escape, this);
      this.end = __bind(this.end, this);
      this.start = __bind(this.start, this);
      Storage.__super__.constructor.apply(this, arguments);
      this.db = mysql.createConnection({
        host: '127.0.0.1',
        user: 'nodejs',
        password: 'nodejs',
        database: 'invoicer'
      });
    }

    Storage.prototype.start = function() {
      var _this = this;
      return this.db.connect(function(err) {
        if (err) {
          return _this.trigger('error', err, 'Could not connect to database');
        } else {
          return _this.trigger('connected');
        }
      });
    };

    Storage.prototype.end = function() {
      return this.db.end();
    };

    Storage.prototype.escape = function(text) {
      return text.replace(/(['"!?\.])/, '\\$1');
    };

    Storage.prototype._query = function() {
      var args, deferred, _ref;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      deferred = When.defer();
      args.push(function(err, results) {
        if (err) {
          console.error(err);
          return deferred.reject(err);
        }
        return deferred.resolve(results);
      });
      (_ref = this.db).query.apply(_ref, args);
      return deferred.promise;
    };

    Storage.prototype.saveInvoice = function(_arg) {
      var invoice, query, row, rows, _i, _len, _results;
      invoice = _arg.invoice, rows = _arg.rows;
      invoice.dateUpdated = (new Date()).toFormat('YYYY-MM-DD HH24:MI:SS');
      console.log('Saving', invoice, rows);
      query = {
        invoice: 'INSERT INTO invoices SET ? ON DUPLICATE KEY UPDATE ?',
        row: 'INSERT INTO rows SET ? ON DUPLICATE KEY UPDATE ?',
        empty: 'DELETE FROM rows WHERE invoiceId=?'
      };
      this._query(query.invoice, [invoice, invoice]);
      this._query(query.empty, invoice.id);
      _results = [];
      for (_i = 0, _len = rows.length; _i < _len; _i++) {
        row = rows[_i];
        row.invoiceId = invoice.id;
        _results.push(this._query(query.row, [row, row]));
      }
      return _results;
    };

    Storage.prototype.invoiceExists = function(id) {
      return this._query('SELECT COUNT(id) as count FROM invoices WHERE id=?', id);
    };

    Storage.prototype.deleteInvoice = function(invoiceId) {
      this._query('DELETE FROM invoices WHERE id=?', invoiceId);
      return this._query('DELETE FROM rows WHERE id=?', invoiceId);
    };

    Storage.prototype.deleteClient = function(clientId) {
      return this._query('DELETE FROM clients WHERE id=?', clientId);
    };

    Storage.prototype.deleteSnippet = function(snippet) {
      return this._query('DELETE FROM snippets WHERE id=?', snippet.id);
    };

    Storage.prototype.saveSnippet = function(snippet) {
      return this._query('INSERT INTO snippets SET ?', snippet.toJSON());
    };

    Storage.prototype.getSnippets = function() {
      return this._query('SELECT * FROM snippets ORDER BY content');
    };

    Storage.prototype.getClients = function() {
      return this._query('SELECT * FROM clients');
    };

    Storage.prototype.searchClients = function(query) {
      console.log('searching for', query);
      query = this.escape(query);
      return this._query("SELECT * FROM clients WHERE\nname LIKE '%" + query + "%' OR\naddress LIKE '%" + query + "%' OR\ncity LIKE '%" + query + "%' OR\npostcode LIKE '%" + query + "%'\nORDER BY dateCreated DESC");
    };

    Storage.prototype.getClient = function(id) {
      return this._query('SELECT * FROM clients WHERE id=?', id);
    };

    Storage.prototype.saveClient = function(client) {
      var sql;
      client.dateUpdated = (new Date()).toFormat('YYYY-MM-DD HH24:MI:SS');
      sql = 'INSERT INTO clients SET ? ON DUPLICATE KEY UPDATE ?';
      return this._query(sql, [client, client]);
    };

    Storage.prototype.getInvoices = function() {
      return this._query('SELECT * FROM invoices ORDER BY id DESC');
    };

    Storage.prototype.getClientInvoices = function(clientId) {
      return this._query("SELECT * FROM invoices\nWHERE clientId=?\nORDER BY dateUpdated DESC", clientId);
    };

    Storage.prototype.getClientInvoiceCount = function(clientId) {
      var deferred;
      deferred = When.defer();
      this._query('SELECT COUNT(id) FROM invoices WHERE clientId=?', clientId).then(function(results) {
        return deferred.resolve(results[0]['COUNT(id)']);
      });
      return deferred.promise;
    };

    Storage.prototype.getInvoice = function(id) {
      return this._query('SELECT * FROM invoices WHERE id=?', id);
    };

    Storage.prototype.getRows = function(invoiceId) {
      return this._query("SELECT * FROM rows WHERE invoiceId=?", invoiceId);
    };

    return Storage;

  })(Base.Event);

  module.exports = Storage;

}).call(this);
