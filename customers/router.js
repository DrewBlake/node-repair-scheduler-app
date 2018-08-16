/*'use strict';
const express = require('express');
const bodyParser = require('body-parser');

const {Customer} = require('./models');

const router = express.Router();

const jsonParser = bodyParser.json();

router.post('/', jsonParser, (req, res) => {
  const requiredFields = ['contactInfo', 'vehicleInfo', 'description'];
  for (let i = 0; i < requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`;
      console.error(message);
      return res.status(400).send(message);
    }
  }

  Customer
    .create({
      contactInfo: req.body.contactInfo,
      vehicleInfo: req.body.vehicleInfo,
      description: req.body.description
    })
    .then(customer => res.status(201).json(customer.serialize()))
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Something went wrong' });
    });
});

*/