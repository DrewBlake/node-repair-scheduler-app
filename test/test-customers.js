'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');

const { app, runServer, closeServer } = require('../server');
const { Customer } = require('../customers');
const { TEST_DATABASE_URL } = require('../config');

const expect = chai.expect;

chai.use(chaiHttp);

describe('/customers', function () {
  const contactInfo = {
  	phoneNumber: '777-777-7777',
  	email: 'example@email.com'
  };
  const vehicleInfo = {
  	year: 2000,
  	make: 'exampleMake',
  	model: 'exampleModel'
  };
  const description = 'Example description problem';

  before(function () {
    return runServer(TEST_DATABASE_URL);
  });

  after(function () {
    return closeServer();
  });

  beforeEach(function () { });

  afterEach(function () {
    return Customer.remove({});
  });


  describe('/customers', function () {
    describe('POST', function () {
      it('Should reject customers with missing contactInfo', function () {
        return chai
          .request(app)
          .post('/customers')
          .send({
            vehicleInfo,
            description
          })
          .then(() =>
            expect.fail(null, null, 'Request should not succeed')
          )
          .catch(err => {
            if (err instanceof chai.AssertionError) {
              throw err;
            }

            const res = err.response;
            expect(res).to.have.status(400);
          });
      });
  });
});
});
