let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();
const jwt_decode = require('jwt-decode')

chai.use(chaiHttp);
describe('Testing Login/Authentication API', () => {
    /*
        Test the /POST route for Login Authentication with correct credential
    */
    /*
    describe('/POST Login with Admin"s Correct Credential', () => {
        it('it should return an object, The logged in user"s JWT', (done) => {
       //token: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Imt3MzYxc2pwOHF1dHdkIiwibmFtZSI6IkFkbWluIiwiZW1haWwiOiJhZG1pbkBhZG1pbi5jb20iLCJ1c2VyX3R5cGUiOjMsImlhdCI6MTU0NDM3NjU1MSwiZXhwIjoxNTQ0MzgwMTUxfQ.tLmwYfg3meXaMPhVtc5Vq9cZpGE87fVXG7HkdSEzIjo' }
        const Data = {
            email: 'admin@admin.com',
            password: 'admin'
        }
        
        chai.request(server)
            .post('/api/login')
            .type('form')
            .send(Data)
            .end((err, res) => {
                const DecodedToken = jwt_decode(res.body.token)
                DecodedToken.user_type.should.be.equal(3)
                res.should.have.status(200);
                res.body.should.be.a('object');
                done();
            });
        });
    });
    
    

    describe('/POST Login with Police"s Correct Credential', () => {
        it('it should return an object, The logged in user"s JWT', (done) => {
            //Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVndDluNGpveGZvejh6IiwibmFtZSI6IktvdXNoaWsgUm95IiwiZW1haWwiOiI5NmtvdXNoaWtyb3lAZ21haWwuY29tIiwidXNlcl90eXBlIjoyLCJpYXQiOjE1NDQzNzk2MTksImV4cCI6MTU0NDM4MzIxOX0.RzAW7uSj0mK4PD63Ozp-nNMEOZgYdfP1t4dDIt5-CPk
            
            const Data = {
                email: '96koushikroy@gmail.com',
                password: 'abcd'
            }
        
            chai.request(server)
            .post('/api/login')
            .type('form')
            .send(Data)
            .end((err, res) => {
                const DecodedToken = jwt_decode(res.body.token)
                //console.log(res.body.token)
                DecodedToken.user_type.should.be.equal(2)
                res.should.have.status(200);
                res.body.should.be.a('object');
                done();
            });
        });
    });
    */
    /*
        Test the /POST route for Login Authentication with incorrect credential
    */
   describe('/POST Login with Incorrect Credential', () => {
        it('it should return an object, The error message', (done) => {
        
            const Data = {
                email: 'admin@admin.com',
                password: 'admissssn'
            }
            
            chai.request(server)
            .post('/api/login')
            .type('form')
            .send(Data)
            .end((err, res) => {
                res.should.have.status(401);
                res.body.should.be.a('object');
                done();
            });
        });
    });


});