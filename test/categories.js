const app = require('../server/server');
const request = require('supertest');
const chai = require('chai').expect;

describe('[CATEGORIES]', () => {
    it('Get all categories', (done) => {
        request(app)
            .get('/api/categories')
            .set('Accept', 'application/json')
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                chai(res.body).to.be.an('array');
                done();
            });
    });
});
