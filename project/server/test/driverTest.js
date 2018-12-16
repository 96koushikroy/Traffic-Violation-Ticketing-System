const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const should = chai.should();
const jwt_decode = require('jwt-decode')
const {User, Driver} = require('../config/sequelize')




chai.use(chaiHttp);
describe('Testing Driver API', () => {
    
    before(function(done) {
        User.sync({ force : true }) // drops table and re-creates it
        .then(function() {
            Driver.sync({ force : true })
            .then(function() {
                done(null);
            })
            .error(function(error) {
                done(error);
            });
        })
        .error(function(error) {
            done(error);
        });
    });


    /*
        Test the /POST route for Driver Registration
    */
    describe('/POST Register as a new Driver', () => {
        it('it should return an object which contains the newly added driver', (done) => {
            const Data = {
                email: 'unitTest@driver.com',
                password: 'driver',
                name: 'Unit Test',
                car_number: '898989989'
            }
            
            chai.request(server)
            .post('/api/driver/register')
            .type('form')
            .send(Data)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                done();
            });
        });
    });

    /*
        Test the /POST route for Driver Registration with empty email
    */
    describe('/POST Register as a new Driver with empty Email', () => {
        it('it should return an object which contains the error message', (done) => {
            const Data = {
                email: '',
                password: 'driver',
                name: 'Unit Test',
                car_number: '898989989'
            }
            
            chai.request(server)
            .post('/api/driver/register')
            .type('form')
            .send(Data)
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                done();
            });
        });
    });

    /*
        Test the /POST route for Driver Registration with invalid email
    */
    describe('/POST Register as a new Driver with invalid Email', () => {
        it('it should return an object which contains the error message', (done) => {
            const Data = {
                email: 'aaaaaaa',
                password: 'driver',
                name: 'Unit Test',
                car_number: '898989989'
            }
            
            chai.request(server)
            .post('/api/driver/register')
            .type('form')
            .send(Data)
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                done();
            });
        });
    });

    /*
        Test the /POST route for Driver Registration with existing email
    */
    describe('/POST Register as a new Driver with existing Email', () => {
        it('it should return an object which contains the error message', (done) => {
            const Data = {
                email: 'unitTest@driver.com',
                password: 'driver',
                name: 'Unit Test',
                car_number: '898989989'
            }
            
            chai.request(server)
            .post('/api/driver/register')
            .type('form')
            .send(Data)
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                done();
            });
        });
    });

    /*
        Test the /POST route for Driver Registration with empty password
    */
    describe('/POST Register as a new Driver with empty Password', () => {
        it('it should return an object which contains the error message', (done) => {
            const Data = {
                email: 'unitTest@driver.com',
                password: '',
                name: 'Unit Test',
                car_number: '898989989'
            }
            
            chai.request(server)
            .post('/api/driver/register')
            .type('form')
            .send(Data)
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                done();
            });
        });
    });


    /*
        Test the /POST route for Driver Registration with empty car number
    */
    describe('/POST Register as a new Driver with empty Car Number', () => {
        it('it should return an object which contains the error message', (done) => {
            const Data = {
                email: 'unitTest@driver.com',
                password: 'driver',
                name: 'Unit Test',
                car_number: ''
            }
            
            chai.request(server)
            .post('/api/driver/register')
            .type('form')
            .send(Data)
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                done();
            });
        });
    });
    /*
        Test the /GET route for Driver Profile
    */
    describe('/GET VIEW Driver Profile', () => {
        it('it should return an object which is the driver profile from authorization header', (done) => {
            
            const Data = {
                email: 'unitTest@driver.com',
                password: 'driver'
            }
            //login in the driver then request the profile API
            chai.request(server)
            .post('/api/login')
            .type('form')
            .send(Data)
            .end((err, res) => {
                const DecodedToken = jwt_decode(res.body.token)
                
                chai.request(server)
                .get('/api/driver/viewprofile')
                //set admin token
                .set('authorization', res.body.token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
            });
        });
    });

    
    /*
        Test the /POST route for Login with correct Driver Credential
    */
    describe('/POST Login with Driver"s Correct Credential', () => {
        it('it should return an object, The logged in user"s JWT', (done) => {
            //Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVndGJmd2pwYmNjbGpwIiwibmFtZSI6IkRyaXZlciBYIiwiZW1haWwiOiJkcml2ZXJAZHJpdmVyLmNvbSIsInVzZXJfdHlwZSI6MSwiaWF0IjoxNTQ0Mzc5NjE5LCJleHAiOjE1NDQzODMyMTl9.L9eL5-X3ObQMNjP1EKkxiMOIxJvhaWY0nMmoWcWyfWc
        
            const Data = {
                email: 'unitTest@driver.com',
                password: 'driver'
            }
        
            chai.request(server)
            .post('/api/login')
            .type('form')
            .send(Data)
            .end((err, res) => {
                const DecodedToken = jwt_decode(res.body.token)
                //console.log(res.body.token)
                DecodedToken.user_type.should.be.equal(1)
                res.should.have.status(200);
                res.body.should.be.a('object');
                done();
            });
        });
    });




});