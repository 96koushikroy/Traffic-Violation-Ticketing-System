let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();


chai.use(chaiHttp);
describe('Ticket Reason', () => {
/*
  * Test the /GET route
  */
  describe('/GET book', () => {
      it('it should GET all the Ticket Reasons', (done) => {
        chai.request(server)
            .get('/api/ticketreason/view')
            .end((err, res) => {
                console.log('ttt', err)
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(4);
                done();
            });
      });
  });

});