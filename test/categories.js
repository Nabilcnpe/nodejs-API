const request = require('supertest');
const mongoose = require('mongoose');
const chai = require('chai').expect;

const app = require('../server/server');
const config = require('../server/config/config');
const Category = require('../server/api/models/category');

describe('[CATEGORIES]', () => {
    let createdCategory;

    before(async () => {
        
        try {
            createdCategory = await request(app)
                .post(`/api/categories`)
                .send({ "name": "category for testing Get one route" })
                .set('Accept', 'application/json')
                .set("auth-token", config.token)

        } catch (error) {
            throw error;
        }
    });

    it('Get all categories', (done) => {
        request(app)
            .get('/api/categories')
            .set('Accept', 'application/json')
            .expect(200)
            .end(function(err, res) {
                if (err) throw err;
                chai(res.body).to.be.an('array');
                chai(res.body.length).to.eql(1);
                done();
            });
    });

    it('Get specific category', async () => {

        try {
            const _id = createdCategory.body._id;
            const res = await request(app).get(`/api/categories/${_id}`);
            
            chai(res.body).to.be.an('object');
            chai(res.body._id).to.be.equal(_id);
            chai(res.body).to.have.property('name');
        } catch (error) {
            throw error;
        }
    });

    it('Should delete a categrory', async () => {

        try {
            const _id = createdCategory.body._id;
            const res = await request(app)
                                .delete(`/api/categories/${_id}`)
                                .set("auth-token", config.token)
            
            chai(res.body).to.be.an('object');

            const isDeleted = await request(app).get(`/api/categories/${_id}`);
            
            chai(isDeleted.status).to.eql(404);
            
        } catch (error) {
            if (error) throw error;
        }
    });

    it('Should create a categrory', async () => {
        const category = { "name": "Third category" };

        try {
            const res = await request(app)
                                .post(`/api/categories`)
                                .send(category)
                                .set('Accept', 'application/json')
                                .set("auth-token", config.token)
            
            chai(res.body).to.be.an('object');
            chai(res.body.name).to.be.equal(category.name);
            chai(res.body).to.have.property('name');
        } catch (error) {
            if (error) throw error;
        }
    });

    after(async () => {
        
        try {
            await Category.deleteMany({});
            mongoose.connection.close();
        } catch (error) {
            throw error;
        }
    });

});
