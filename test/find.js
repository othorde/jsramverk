process.env.NODE_ENV = "test"

var assert = require('assert');
const find = require("../src/find");
const database = require("../db/database.js");

beforeEach(async function() {
    
    await database.resetDb() // denna stänger också db

	let db;
    db = await database.getDb(); 
    await db.collection.insertMany([
        { name: "test1", email: "test1@live.se", psw: "123431", docs: [{ docname: "test1Dok", docid: "123123", allowed_users: ["test1@live.se", "test3@live.se"] }] },
        { name: "test2", email: "test2@live.se", psw: "123432", docs: [{ docname: "test2Dok", docid: "234234", allowed_users: ["test2@live.se"] }] },
        { name: "test3", email: "test3@live.se", psw: "123433", docs: [{ docname: "test3Dok", docid: "345345", allowed_users: ["test3@live.se", "test2@live.se", "test1@live.se"] }] },
    ])
    await db.client.close();

});

afterEach(async function() {

    await database.resetDb() // denna stänger också db
});


describe('#find()', function() {

    it('find a doc which should return array of userInfo', async function() {
      	var user = await find.findDocument("123123");
        var docname = user[0].docs[0].docname;
        var docid = user[0].docs[0].docid;
        assert.equal(docname, "test1Dok")
        assert.equal(docid, "123123")

    });

    it('find a doc that dosnt exists should return false', async function() {
        var user = await find.findDocument("123456");
        assert.equal(user, false)
    });

    it('Find using int should return false', async function() {
        var user = await find.findDocument(123123);
        assert.equal(user, false)
    });
});

