// Generated by CoffeeScript 1.6.3
(function() {
  var Base, CreateClient,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Base = require('base');

  CreateClient = (function(_super) {
    __extends(CreateClient, _super);

    CreateClient.prototype.elements = {
      '.client-name': 'name',
      '.client-address': 'address',
      '.client-city': 'city',
      '.client-postcode': 'postcode'
    };

    CreateClient.prototype.events = {
      'submit .create-client-details': 'createClient'
    };

    function CreateClient() {
      this.createClient = __bind(this.createClient, this);
      CreateClient.__super__.constructor.apply(this, arguments);
      this.city.val('Rotorua');
    }

    CreateClient.prototype.clear = function() {
      var name, selector, _ref;
      _ref = this.elements;
      for (selector in _ref) {
        name = _ref[selector];
        this[name].val('');
      }
      return this.city.val('Rotorua');
    };

    CreateClient.prototype.createClient = function(e) {
      var client, name, selector, valid, _ref;
      e.preventDefault();
      valid = true;
      _ref = this.elements;
      for (selector in _ref) {
        name = _ref[selector];
        if (this[name].val() === '') {
          valid = false;
        }
      }
      if (!valid) {
        return;
      }
      client = {
        name: this.name.val(),
        city: this.city.val(),
        address: this.address.val(),
        postcode: this.postcode.val()
      };
      storage.saveClient(client);
      return this.trigger('toggle');
    };

    return CreateClient;

  })(Base.Controller);

  module.exports = CreateClient;

}).call(this);