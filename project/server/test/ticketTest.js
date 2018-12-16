let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();
const jwt_decode = require('jwt-decode')
const {User, Driver, Police, Admin, Ticket} = require('../config/sequelize')

chai.use(chaiHttp);
describe('Testing Ticket API', () => {
    let AddedTicketId = '';
    let AddedPoliceID = '';
    let AddedDriverID = '';
    //clearing the Users, Driver, Police, Ticket Tables
    before(function(done) {
        User.sync({ force : true }) // drops table and re-creates it
        .then(function() {
            Driver.sync({ force : true })
            .then(function() {
                Police.sync({ force : true })
                .then(function() {
                    Ticket.sync({ force : true })
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
        Test the /POST route for New Ticket Insertion with valid data
    */
    describe('/POST Insert a new Ticket with valid data', () => {
        it('it should return an object which contains the ticket data', (done) => {
            const DataDriver = {
                email: 'unitTest@driver.com',
                password: 'driver',
                name: 'Unit Test Driver',
                car_number: 'HelloWorld'
            }

            const DataPolice = {
                email: 'unitTest@police.com',
                password: 'police',
                name: 'Unit Test Police'
            }

            const PoliceLogin = {
                email: 'unitTest@police.com',
                password: 'police'
            }

            //create a driver account
            chai.request(server)
            .post('/api/driver/register')
            .type('form')
            .send(DataDriver)
            .end((err, resD) => {

                //create a police account
                chai.request(server)
                .post('/api/police/register')
                .type('form')
                .set('authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Imt3MzYxc2pwOHF1dHdkIiwibmFtZSI6IkFkbWluIiwiZW1haWwiOiJhZG1pbkBhZG1pbi5jb20iLCJ1c2VyX3R5cGUiOjMsImlhdCI6MTU0NDM3NjU1MSwiZXhwIjoxNTQ0MzgwMTUxfQ.tLmwYfg3meXaMPhVtc5Vq9cZpGE87fVXG7HkdSEzIjo')
                .send(DataPolice)
                .end((err, resP) => {
                    //login the police

                    chai.request(server)
                    .post('/api/login')
                    .type('form')
                    .send(PoliceLogin)
                    .end((err, res) => {
                        AddedDriverID = resD.body.id;
                        AddedPoliceID = resP.body.id;
                        TicketData = {
                            car_number: 'HelloWorld',
                            police_id: resP.body.id,
                            driver_id: resD.body.id,
                            reason_id: 15,
                            amount: 2000,
                            other_documents: 'okokokok',
                            issue_date: '2018-12-15',
                            status: 0,
                            deadline_date: '2018-12-31'
                        }
                        //insert a ticket with valid data

                        chai.request(server)
                        .post('/api/ticket/insert')
                        //set police token
                        .set('authorization', res.body.token)
                        .type('form')
                        .send(TicketData)
                        .end((err, res) => {
                            AddedTicketId = res.body.id
                            res.should.have.status(200);
                            res.body.should.be.a('object');
                            done();
                        });
                    });
                });
            });
        });
    });

    /*
        Test the /POST route for INSERTING tickets with blank data
    */
    describe('/POST INSERT Ticket with blank car number', () => {
        it('it should return an object which is the error message', (done) => {
            
            //login in the driver then request the view ticket API
            const Data = {
                email: 'unitTest@police.com',
                password: 'police'
            }

            chai.request(server)
            .post('/api/login')
            .type('form')
            .send(Data)
            .end((err, res) => {

                TicketData = {
                    car_number: '',
                    police_id: AddedPoliceID,
                    driver_id: AddedDriverID,
                    reason_id: 15,
                    amount: 2000,
                    other_documents: 'okokokok',
                    issue_date: '2018-12-15',
                    status: 0,
                    deadline_date: '2018-12-31'
                }

                chai.request(server)
                .post('/api/ticket/insert')
                //set police token
                .set('authorization', res.body.token)
                .send(TicketData)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    done();
                });
            });
        });

    });

    /*
        Test the /POST route for INSERTING tickets with blank data
    */
    describe('/POST INSERT Ticket with blank amount', () => {
        it('it should return an object which is the error message', (done) => {
            
            //login in the driver then request the view ticket API
            const Data = {
                email: 'unitTest@police.com',
                password: 'police'
            }

            chai.request(server)
            .post('/api/login')
            .type('form')
            .send(Data)
            .end((err, res) => {

                TicketData = {
                    car_number: 'HelloWorld',
                    police_id: AddedPoliceID,
                    driver_id: AddedDriverID,
                    reason_id: 15,
                    other_documents: 'okokokok',
                    issue_date: '2018-12-15',
                    status: 0,
                    deadline_date: '2018-12-31'
                }

                chai.request(server)
                .post('/api/ticket/insert')
                //set police token
                .set('authorization', res.body.token)
                .send(TicketData)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    done();
                });
            });
        });

    });

    /*
        Test the /POST route for INSERTING tickets with invalid data
    */
    describe('/POST INSERT Ticket with invalid amount', () => {
        it('it should return an object which is the error message', (done) => {
            
            //login in the driver then request the insert ticket API
            const Data = {
                email: 'unitTest@police.com',
                password: 'police'
            }

            chai.request(server)
            .post('/api/login')
            .type('form')
            .send(Data)
            .end((err, res) => {

                TicketData = {
                    car_number: 'HelloWorld',
                    police_id: AddedPoliceID,
                    driver_id: AddedDriverID,
                    reason_id: 15,
                    amount: 'asddasdd',
                    other_documents: 'okokokok',
                    issue_date: '2018-12-15',
                    status: 0,
                    deadline_date: '2018-12-18'
                }
                chai.request(server)
                .post('/api/ticket/insert')
                //set police token
                .set('authorization', res.body.token)
                .send(TicketData)
                .end((err, ress) => {
                    ress.should.have.status(400);
                    ress.body.should.be.a('object');
                    done();
                });
            });
        });

    });


    /*
        Test the /POST route for INSERTING tickets with invalid data
    */
   describe('/POST INSERT Ticket with an invalid car number which is not associated with any driver', () => {
    it('it should return an object which is the error message', (done) => {
        
        //login in the driver then request the insert ticket API
        const Data = {
            email: 'unitTest@police.com',
            password: 'police'
        }

        chai.request(server)
        .post('/api/login')
        .type('form')
        .send(Data)
        .end((err, res) => {

            TicketData = {
                car_number: 'xxHelloWorld',
                police_id: AddedPoliceID,
                driver_id: AddedDriverID,
                reason_id: 15,
                amount: 'asddasdd',
                other_documents: 'okokokok',
                issue_date: '2018-12-15',
                status: 0,
                deadline_date: '2018-12-18'
            }
            chai.request(server)
            .post('/api/ticket/insert')
            //set police token
            .set('authorization', res.body.token)
            .send(TicketData)
            .end((err, ress) => {
                ress.should.have.status(400);
                ress.body.should.be.a('object');
                done();
            });
        });
    });

});



    /*
        Test the /GET route for Police to get the tickets they added
    */
    describe('/GET VIEW Police Tickets', () => {
        it('it should return an array which is the tickets added by the requested police', (done) => {
            
            //login in the police then request the view ticket API
            const Data = {
                email: 'unitTest@police.com',
                password: 'police'
            }

            chai.request(server)
            .post('/api/login')
            .type('form')
            .send(Data)
            .end((err, res) => {
                chai.request(server)
                .get('/api/ticket/police/view')
                //set admin token
                .set('authorization', res.body.token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                });
            });
        });
    });

    /*
        Test the /GET route for Drivers to get the tickets they received
    */
    describe('/GET VIEW Driver Tickets', () => {
        it('it should return an array which is the tickets received by the requested driver', (done) => {
            
            //login in the driver then request the view ticket API
            const Data = {
                email: 'unitTest@driver.com',
                password: 'driver'
            }

            chai.request(server)
            .post('/api/login')
            .type('form')
            .send(Data)
            .end((err, res) => {
                chai.request(server)
                .get('/api/ticket/driver/view')
                //set admin token
                .set('authorization', res.body.token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                });
            });
        });
    });

    /*
        Test the /GET route for Admins to get the unapproved tickets
    */
    describe('/GET VIEW Unapproved Tickets', () => {
        it('it should return an array which is the unapproved tickets requested by the admin', (done) => {
            
            //login in the driver then request the view ticket API
            
            const AdminToken = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Imt3MzYxc2pwOHF1dHdkIiwibmFtZSI6IkFkbWluIiwiZW1haWwiOiJhZG1pbkBhZG1pbi5jb20iLCJ1c2VyX3R5cGUiOjMsImlhdCI6MTU0NDM3NjU1MSwiZXhwIjoxNTQ0MzgwMTUxfQ.tLmwYfg3meXaMPhVtc5Vq9cZpGE87fVXG7HkdSEzIjo'

            chai.request(server)
            .get('/api/ticket/admin/view')
            //set admin token
            .set('authorization', AdminToken)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                done();
            });
        });
    });

    /*
        Test the /GET route for Admins to approve a pending ticket
    */
    describe('/GET Approve a Pending Ticket', () => {
        it('it should return an array of updated values of the approved ticket requested by the admin', (done) => {
            
            const AdminToken = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Imt3MzYxc2pwOHF1dHdkIiwibmFtZSI6IkFkbWluIiwiZW1haWwiOiJhZG1pbkBhZG1pbi5jb20iLCJ1c2VyX3R5cGUiOjMsImlhdCI6MTU0NDM3NjU1MSwiZXhwIjoxNTQ0MzgwMTUxfQ.tLmwYfg3meXaMPhVtc5Vq9cZpGE87fVXG7HkdSEzIjo'

            chai.request(server)
            .get('/api/ticket/admin/approve/' + AddedTicketId)
            //set admin token
            .set('authorization', AdminToken)
            .end((err, res) => {
                res.should.have.status(200);
                res.body[0].should.be.equal(1);
                res.body.should.be.a('array');
                done();
            });
        });
    });

    /*
        Test the /GET route for Admins to view all the tickets for search purpose
    */
    describe('/GET VIEW all the Tickets', () => {
        it('it should return an array of all tickets requested by the admin', (done) => {
            
            const AdminToken = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Imt3MzYxc2pwOHF1dHdkIiwibmFtZSI6IkFkbWluIiwiZW1haWwiOiJhZG1pbkBhZG1pbi5jb20iLCJ1c2VyX3R5cGUiOjMsImlhdCI6MTU0NDM3NjU1MSwiZXhwIjoxNTQ0MzgwMTUxfQ.tLmwYfg3meXaMPhVtc5Vq9cZpGE87fVXG7HkdSEzIjo'

            chai.request(server)
            .get('/api/ticket/admin/viewall')
            //set admin token
            .set('authorization', AdminToken)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                done();
            });
        });
    });

    /*
        Test the /GET route for Police to delete a ticket they added
    */
    describe('/GET VIEW Police Tickets', () => {
        it('it should return a boolean whether the ticket was deleted, by the requested police', (done) => {
            
            //login in the police then request the view ticket API
            const Data = {
                email: 'unitTest@police.com',
                password: 'police'
            }

            chai.request(server)
            .post('/api/login')
            .type('form')
            .send(Data)
            .end((err, res) => {
                chai.request(server)
                .get('/api/ticket/delete/' + AddedTicketId)
                //set admin token
                .set('authorization', res.body.token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.equal(1);
                    done();

                    /*
                        As this is the final test method add the admin here just for demo purpose
                    */
                    let AdminObj = {
                        id: 'kw361sjp8qutwd',
                        email: 'admin@admin.com',
                        password: '$2a$10$Bw9XF4/5UCOrHiTOLKQueeWD1/cbCXVc8zxX.sNsLsrACxhO23SOa',
                        user_type: 3
                    }
                    User.create(AdminObj)

                });
            });
        });
    });




})

