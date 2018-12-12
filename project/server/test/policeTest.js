const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const should = chai.should();
const {Police} = require('../config/sequelize')

chai.use(chaiHttp);
describe('Testing Ticket Reasons API', () => {
    /*
        Clearing the Police Database before testing its api
    */
   
    before(function(done) {
        Police.sync({ force : true }) // drops table and re-creates it
        .then(function() {
            done(null);
        })
        .error(function(error) {
            done(error);
        });
    });
    
/*
        Test the /POST route for Registering a Police
    */
   describe('/POST INSERT Police', () => {
    it('it should return an object of the inserted Police', (done) => {
        
        const Data = {
            name: 'Unit Test Name'
            email: 'Unit Test Email'
            password: 'Unit Test Password'
        }

        chai.request(server)
            .post('/api/police/register')
            .type('form')
            .send(Data)
            //set admin token
            .set('authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Imt3MzYxc2pwOHF1dHdkIiwibmFtZSI6IkFkbWluIiwiZW1haWwiOiJhZG1pbkBhZG1pbi5jb20iLCJ1c2VyX3R5cGUiOjMsImlhdCI6MTU0NDM3NjU1MSwiZXhwIjoxNTQ0MzgwMTUxfQ.tLmwYfg3meXaMPhVtc5Vq9cZpGE87fVXG7HkdSEzIjo')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                done();
            });
    });
});

/*
    Test the /POST route for Registering a Police with an invalid data for email
*/
describe('/POST INSERT Police with No Data', () => {
    it('it should return an error as email is empty', (done) => {
        
        const Data = {
            name: 'Unit Test Name'
            email: ''
            password: 'Unit Test Password'
        }

        chai.request(server)
            .post('/api/police/register')
            .type('form')
            .send(Data)
            //set admin token
            .set('authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Imt3MzYxc2pwOHF1dHdkIiwibmFtZSI6IkFkbWluIiwiZW1haWwiOiJhZG1pbkBhZG1pbi5jb20iLCJ1c2VyX3R5cGUiOjMsImlhdCI6MTU0NDM3NjU1MSwiZXhwIjoxNTQ0MzgwMTUxfQ.tLmwYfg3meXaMPhVtc5Vq9cZpGE87fVXG7HkdSEzIjo')
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                done();
            });
    });
});

/*
    Test the /POST route for Registering a Police with an invalid data for password
*/
describe('/POST INSERT Police with No Data', () => {
    it('it should return an error as password is empty', (done) => {
        
        const Data = {
            name: 'Unit Test Name'
            email: 'Unit Test Email'
            password: ''
        }

        chai.request(server)
            .post('/api/police/register')
            .type('form')
            .send(Data)
            //set admin token
            .set('authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Imt3MzYxc2pwOHF1dHdkIiwibmFtZSI6IkFkbWluIiwiZW1haWwiOiJhZG1pbkBhZG1pbi5jb20iLCJ1c2VyX3R5cGUiOjMsImlhdCI6MTU0NDM3NjU1MSwiZXhwIjoxNTQ0MzgwMTUxfQ.tLmwYfg3meXaMPhVtc5Vq9cZpGE87fVXG7HkdSEzIjo')
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                done();
            });
    });
});

 /*
        Test the /GET route for Police
    */
   describe('/GET VIEW Police', () => {
    it('it should return an array of all the Police requested by the admin', (done) => {
        chai.request(server)
        .get('/api/police/view')
        //set admin token
        .set('authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Imt3MzYxc2pwOHF1dHdkIiwibmFtZSI6IkFkbWluIiwiZW1haWwiOiJhZG1pbkBhZG1pbi5jb20iLCJ1c2VyX3R5cGUiOjMsImlhdCI6MTU0NDM3NjU1MSwiZXhwIjoxNTQ0MzgwMTUxfQ.tLmwYfg3meXaMPhVtc5Vq9cZpGE87fVXG7HkdSEzIjo')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            done();
        });
    });
});

 /*
        Test the /GET route for one Police
    */
   describe('/GET VIEW Police', () => {
    it('it should return an object of the Police requested by the admin', (done) => {
        chai.request(server)
        .get('/api/police/view/:pid')
        //set admin token
        .set('authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Imt3MzYxc2pwOHF1dHdkIiwibmFtZSI6IkFkbWluIiwiZW1haWwiOiJhZG1pbkBhZG1pbi5jb20iLCJ1c2VyX3R5cGUiOjMsImlhdCI6MTU0NDM3NjU1MSwiZXhwIjoxNTQ0MzgwMTUxfQ.tLmwYfg3meXaMPhVtc5Vq9cZpGE87fVXG7HkdSEzIjo')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            done();
        });
    });
});
