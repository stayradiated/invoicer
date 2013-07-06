// Generated by CoffeeScript 1.6.3
(function() {
  var Storage, mysql,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  mysql = require('mysql');

  Storage = (function() {
    function Storage() {
      this.saveInvoice = __bind(this.saveInvoice, this);
      this.db = mysql.createConnection({
        host: '127.0.0.1',
        port: 8889,
        user: 'nodejs',
        password: 'nodejs',
        database: 'invoicer'
      });
      this.db.connect();
    }

    Storage.prototype.saveInvoice = function(data) {
      var client, details, invoice;
      details = data.details;
      client = {
        name: details.clientName,
        address: details.clientAddress,
        city: details.clientCity,
        postcode: details.clientPostcode
      };
      invoice = {
        id: details.invoiceId,
        date: details.invoiceDate,
        customer: details.jobCustomer,
        site: details.jobSite,
        cost: details.jobAmount,
        paid: false
      };
      return this.db.query('INSERT INTO clients SET ?', client, function() {
        return console.log(arguments);
      });
    };

    return Storage;

  })();

  module.exports = Storage;

}).call(this);
