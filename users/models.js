'use strict';
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');


mongoose.Promise = global.Promise;

/*const repairInfoSchema = mongoose.Schema({ 
  date: String,
    vehicleInfo: {
      year: Number,
      make: String,
      model: String
    },
    description: String});*/

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  passwordOriginal: {
    type: String,
  },
  firstName: {type: String, default: ''},
  lastName: {type: String, default: ''},
  admin: {type: Boolean, default: false},
  contactInfo: {
    phoneNumber: String,
    email: String
  },
  repairInfo: [{
    date: {type: Date, default: Date.now},
    vehicleInfo: {
      year: Number,
      make: String,
      model: String
    },
    description: String
  }]
});

UserSchema.virtual('contact').get(function() {
  return `phone #: ${this.contactInfo.phoneNumber} email: ${this.contactInfo.email}`;
});

UserSchema.virtual('vehicle').get(function() {
  return `${this.vehicleInfo.year} ${this.vehicleInfo.make} ${this.vehicleInfo.model}`;
});

UserSchema.virtual('repairHistory').get(function() {
  return `${this.repairInfo[0].date} ${this.repairInfo[0].description}`
});

UserSchema.methods.serialize = function() {
  return {
    username: this.username || '',
    firstName: this.firstName || '',
    lastName: this.lastName || '',
    id: this._id,
    admin: this.admin,
    contactInfo: this.contact || '',
    /*vehicleInfo: this.vehicle || '',*/
    repairInfo: this.repairInfo
    /*passwordOriginal: this.passwordOriginal,
    password: this.password,
    admin: this.admin*/
  };
};

UserSchema.methods.validatePassword = function(password) {
  return bcrypt.compare(password, this.password);
};

UserSchema.statics.hashPassword = function(password) {
  return bcrypt.hash(password, 10);
};

const User = mongoose.model('User', UserSchema);

module.exports = {User};
