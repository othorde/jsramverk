process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app.js');

chai.should();
const database = require('../db/database');
chai.use(chaiHttp);

const collectionName = "crowd";

const ObjectId = require('mongodb').ObjectId; 


describe('database', () => {
    before(() => {
        return new Promise(async (resolve) => {
            const db = await database.getDb();
        



            db.db.listCollections(
                { name: collectionName }
            )
                .next()
                .then(async function(info) {
                    if (info) {
                        await db.collection.drop();

                    }
                })
                .catch(function(err) {
                    console.error(err);
                })
                .finally(async function() {
                    await db.client.close();
                    resolve();
                });
        });
    });

    
    describe('POST /list', () => {
        it('// Return a JSON object with list of all documents', (done) => {

         

            let body = {
                
                name: "NEWNAME",
                body: "NEWBODY",
            };


            chai.request(server)
                .post("/list")
                .send(body)
                .end((err, res) => {
                    res.body.data.msg.should.equal("Got a POST request, sending back 201 Created");
                    done();
                });

        });

    });

    describe('post, create an doc with specific id', () => {
        it('', (done) => {

         

            let body = {
                _id: "1010",
                name: "name specific id",
                body: "body specific id",

            };


            chai.request(server)
                .post("/list")
                .send(body)
                .end((err, res) => {
                    res.body.data.msg.should.equal("Got a POST request, sending back 201 Created");
                    done();
                });

        });

    });



    describe('GET /', () => {
        it('should return Hello INDEX', (done) => {
            chai.request(server)
                .get("/")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.data.should.be.an("object")
                    res.body.data.msg.should.be.an("String")
                    res.body.data.msg.should.equal('Hello INDEX');
                    done();
                });
        });

    });
    
    describe('GET /list', () => {
        it('// Return a JSON object with list of all documents', (done) => {
            chai.request(server)
                .get("/list")
                .end((err, res) => {
                    res.body.should.be.an("array");
                    res.body[0].body.should.equal("NEWBODY");
                    res.body[0].name.should.equal("NEWNAME");
                    res.body[1].name.should.equal("name specific id");

                    done();
                });
        });

    });

    
    describe('GET /lists/1010', () => {
        it('// Returns one doc', (done) => {

        chai.request(server)
                .get("/lists/1010")
                .end((err, res) => {
                    res.body[0]._id.should.equal("1010")
                    res.body[0].body.should.equal("body specific id")
                    res.body[0].name.should.equal("name specific id")    
                    done();
                });
        });
    });
});
