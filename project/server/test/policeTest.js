const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const should = chai.should();
const {Police, User} = require('../config/sequelize')

chai.use(chaiHttp);
describe('Testing Police API', () => {
    let AddedPoliceID = ''
    /*
        Clearing the Police Database before testing its api
    */
    before(function(done) {
        Police.sync({ force : true }) // drops table and re-creates it
        .then(function() {
            User.sync({ force : true })
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
        Test the /POST route for Registering a Police
    */
    describe('/POST INSERT Police API by the Admin', () => {
        it('it should return an object of the inserted Police', (done) => {
        
            const Data = {
                email: 'unitTest@police.com',
                password: 'police',
                name: 'Unit Test Police'
            }

            chai.request(server)
                .post('/api/police/register')
                .type('form')
                .send(Data)
                //set admin token
                .set('authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Imt3MzYxc2pwOHF1dHdkIiwibmFtZSI6IkFkbWluIiwiZW1haWwiOiJhZG1pbkBhZG1pbi5jb20iLCJ1c2VyX3R5cGUiOjMsImlhdCI6MTU0NDM3NjU1MSwiZXhwIjoxNTQ0MzgwMTUxfQ.tLmwYfg3meXaMPhVtc5Vq9cZpGE87fVXG7HkdSEzIjo')
                .end((err, res) => {
                    AddedPoliceID = res.body.id
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });
    });
    /*
        Test the /POST route for Registering a Police with invalid data
    */
    describe('/POST INSERT Police API with an already used email by the Admin', () => {
        it('it should return an object which is the error message', (done) => {
        
            const Data = {
                email: 'unitTest@police.com',
                password: 'police',
                name: 'Unit Test Police'
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
        Test the /POST route for Registering a Police with invalid data
    */
    describe('/POST INSERT Police API with invalid email by the Admin', () => {
        it('it should return an object which is the error message', (done) => {
        
            const Data = {
                email: 'unitTestpolice.com',
                password: 'police',
                name: 'Unit Test Police'
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
        Test the /POST route for Registering a Police with invalid data
    */
    describe('/POST INSERT Police API with No email by the Admin', () => {
        it('it should return an object which is the error message', (done) => {
        
            const Data = {
                email: '',
                password: 'police',
                name: 'Unit Test Police'
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
        Test the /POST route for Registering a Police with invalid data
    */
    describe('/POST INSERT Police API with No password by the Admin', () => {
        it('it should return an object which is the error message', (done) => {
        
            const Data = {
                email: 'abc@abc.com',
                password: '',
                name: 'Unit Test Police'
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
        Test the /GET route for getting all Police
    */
    describe('/GET VIEW ALL Police', () => {
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
    describe('/GET VIEW One Police', () => {
        it('it should return an object of one Police requested by the admin', (done) => {
            chai.request(server)
            .get('/api/police/view/'+AddedPoliceID)
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
        Test the /GET route for viewing Police Profile
    */
    describe('/GET VIEW Police Profile', () => {
        it('it should return an object of the Police requested by the Police', (done) => {
            const Data = {
                email: 'unitTest@police.com',
                password: 'police'
            }
            //login in the police then request the profile API
            chai.request(server)
            .post('/api/login')
            .type('form')
            .send(Data)
            .end((err, res) => {
                chai.request(server)
                .get('/api/police/viewprofile')
                //set admin token
                .set('authorization', res.body.token)
                .end((err, ress) => {
                    ress.should.have.status(200);
                    ress.body.should.be.a('object');
                    done();
                });
            })
        });
    });

    /*
        Test the /GET route for deleting one Police
    */
    describe('/GET DELETE one Police', () => {
        it('it should return a boolean whether the Police object was deleted, requested by the admin', (done) => {
            chai.request(server)
            .get('/api/police/delete/' + AddedPoliceID)
            //set admin token
            .set('authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Imt3MzYxc2pwOHF1dHdkIiwibmFtZSI6IkFkbWluIiwiZW1haWwiOiJhZG1pbkBhZG1pbi5jb20iLCJ1c2VyX3R5cGUiOjMsImlhdCI6MTU0NDM3NjU1MSwiZXhwIjoxNTQ0MzgwMTUxfQ.tLmwYfg3meXaMPhVtc5Vq9cZpGE87fVXG7HkdSEzIjo')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.equal(1);
                done();
            });
        });
    }); 


})
