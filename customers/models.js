'use strict';
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const CustomerSchema = mongoose.Schema({
  contactInfo: {
    phoneNumber: Number,
    email: String
  },
  vehicleInfo: {
    year: Number,
    make: String,
    model: String
  },
  description: String
});

CustomerSchema.virtual('contact').get(function() {
  return `phone # ${this.contactInfo.phoneNumber} email ${this.contactInfo.email}`;
});

CustomerSchema.virtual('vehicle').get(function() {
  return `${this.vehicleInfo.year} ${this.vehicleInfo.make} ${this.vehicleInfo.model}`;
});

CustomerSchema.methods.serialize = function() {
  return {
    id: this._id,
    contactInfo: this.contact,
    vehicleInfo: this.vehicle,
    description: this.description
  };
};

const Customer = mongoose.model('Customer', CustomerSchema);

module.exports = {Customer};