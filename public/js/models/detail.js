// Generated by CoffeeScript 1.6.3
(function() {
  var Base, Detail,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Base = require('base');

  require('date-utils');

  Detail = (function(_super) {
    __extends(Detail, _super);

    Detail.prototype.defaults = {
      invoiceId: 7300,
      invoiceDate: new Date().toYMD(),
      clientName: '',
      clientAddress: '',
      clientCity: '',
      clientPostcode: '',
      jobCustomer: '',
      jobSite: '',
      jobAmount: 0
    };

    function Detail() {
      this["export"] = __bind(this["export"], this);
      this.getDueDate = __bind(this.getDueDate, this);
      this.getInvoiceDate = __bind(this.getInvoiceDate, this);
      Detail.__super__.constructor.apply(this, arguments);
    }

    Detail.prototype.getInvoiceDate = function() {
      var date;
      date = new Date(this.invoiceDate);
      return date.toFormat('DD MMMM YYYY');
    };

    Detail.prototype.getDueDate = function() {
      var date;
      date = new Date(this.invoiceDate);
      date.add({
        days: 7
      });
      return date.toFormat('DD MMMM YYYY');
    };

    Detail.prototype["export"] = function() {
      return {
        invoiceId: this.invoiceId,
        invoiceDate: this.getInvoiceDate(),
        invoiceDue: this.getDueDate().toUpperCase(),
        clientName: this.clientName.toUpperCase(),
        clientAddress: this.clientAddress.toUpperCase(),
        clientCity: this.clientCity.toUpperCase(),
        clientPostcode: this.clientPostcode,
        jobCustomer: this.jobCustomer.toUpperCase(),
        jobSite: this.jobSite.toUpperCase(),
        jobAmount: this.jobAmount,
        jobGst: this.jobAmount * 0.15,
        jobBeforeGst: this.jobAmount - (this.jobAmount * 0.15)
      };
    };

    return Detail;

  })(Base.Model);

  module.exports = Detail;

}).call(this);
