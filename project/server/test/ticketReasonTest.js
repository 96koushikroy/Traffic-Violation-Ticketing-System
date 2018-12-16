const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const should = chai.should();
const {TicketReason} = require('../config/sequelize')

chai.use(chaiHttp);
describe('Testing Ticket Reasons API', () => {
    /*
        Clearing the Ticket Reasons Database before testing its api
    */
   
    before(function(done) {
        TicketReason.sync({ force : true }) // drops table and re-creates it
        .then(function() {
            done(null);
        })
        .error(function(error) {
            done(error);
        });
    });
    
    /*
        Test the /GET route for Ticket Reason
    */
    describe('/GET VIEW TicketReasons', () => {
        it('it should return an array of all the Ticket Reasons', (done) => {
            chai.request(server)
            .get('/api/ticketreason/view')
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
        Test the /POST route for INSERTING a Ticket Reason
    */
    describe('/POST INSERT Ticket Reason', () => {
        it('it should return an object of the inserted Ticket Reason', (done) => {
            
            const Data = {
                reason_name: 'Unit Test Reason',
                reason_details: 'Unit Test Reason Details'
            }

            chai.request(server)
                .post('/api/ticketreason/insert')
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
        Test the /POST route for INSERTING a Ticket Reason with an invalid data
    */
    describe('/POST INSERT Ticket Reason with Long Data', () => {
        it('it should return an error as reason_name is too long', (done) => {
            
            const Data = {
                reason_name: 'Unit Test Reason asdlkjfhajksldfhas ashsdkjfhasldkfjhas asjdkfhaslkjdhfalks asdlkjfhasldkjfha aslkjdhflaskjdhf',
                reason_details: 'Unit Test Reason Details'
            }

            chai.request(server)
                .post('/api/ticketreason/insert')
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
        Test the /POST route for INSERTING a Ticket Reason without authentication
    */
    describe('/GET VIEW Ticket Reasons without Authentication', () => {
        it('it should return an error as the user is not logged in', (done) => {
            chai.request(server)
                .get('/api/ticketreason/view')
                //set admin token
                .set('authorization', '')
                .end((err, res) => {
                    res.should.have.status(401);
                    res.body.should.be.a('object');
                    done();
                });
        });
    });

});