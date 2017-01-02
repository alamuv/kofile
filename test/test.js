'use strict';

const expect = require('chai').expect;
const request = require('supertest');

const orders = require('../data/orders.json');

describe('Kofile API', () => {
  const url = 'http://localhost:8000';
  describe('Orders Prices - POST to /orders/prices', () => {
    it('should respond with 400 for no data', (done) => {
      request(url)
        .post('/orders/prices')
        .send()
        .expect(400)
        .end((err, res) => {
          done(err);
        });
    });

    it('should respond with 400 for invalid data', (done) => {
      request(url)
        .post('/orders/prices')
        .send({})
        .expect(400)
        .end((err, res) => {
          done(err);
        });
    });

    it('should respond with 200 for valid orders data', (done) => {
      request(url)
        .post('/orders/prices')
        .send(orders)
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          done(err);
        });
    });
  });

  describe('Orders Prices - POST to /orders/distribution', () => {
    it('should respond with 400 for no data', (done) => {
      request(url)
        .post('/orders/distribution')
        .send()
        .expect(400)
        .end((err, res) => {
          done(err);
        });
    });

    it('should respond with 400 for invalid data', (done) => {
      request(url)
        .post('/orders/distribution')
        .send({})
        .expect(400)
        .end((err, res) => {
          done(err);
        });
    });

    it('should respond with 200 for valid orders data', (done) => {
      request(url)
        .post('/orders/distribution')
        .send(orders)
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          done(err);
        });
    });
  });
});
