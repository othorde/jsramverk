process.env.NODE_ENV = "test"

var assert = require('assert');
const findUser = require("../src/findUser");
const database = require("../db/database.js");
/* 
before(async function() {
    
    await database.resetDb() // denna stänger också db

	let db;
    db = await database.getDb(); 
    await db.collection.insertMany([
        { name: "test1", email: "test1@live.se", psw: "123431", docs: [{ docname: "test1Dok", docid: "123123", text: "doc1text", allowed_user: ["test1@live.se", "test3@live.se"] }] },
        { name: "test2", email: "test2@live.se", psw: "123432", docs: [{ docname: "test2Dok", docid: "234234", text: "doc2text", allowed_user: ["test2@live.se"] }] },
        { name: "test3", email: "test3@live.se", psw: "123433", docs: [{ docname: "test3Dok", docid: "345345", text: "doc3text", allowed_user: ["test3@live.se", "test2@live.se", "test1@live.se"] }] },
    ])
    await db.client.close();
});

 */

describe('#findUser()', async function() {
    it('find all info about a user by mail and psw, should return true with test1@live.se', async function() {

        let req = { body: {email: "test1@live.se", psw: "123431"}}
        const findAUser = await findUser.findUser(req);

        assert.equal(findAUser.name, "test1");
        assert.equal(findAUser.psw, "123431");
        assert.equal(findAUser.email, "test1@live.se");
    });

    it('find all info about a user by mail and psw, should return false with test4@live.se', async function() {

        let req = { body: {email: "test4@live.se", psw: "123431"}}
        const findAUser = await findUser.findUser(req);

        assert.equal(findAUser, false);

    });

    it('find all info about a user by mail and psw, should return false with only search by psw', async function() {
        let req = { body: {psw: "123431"}}
        const findAUser = await findUser.findUser(req);

        assert.equal(findAUser, false);

    });
});

/* after(async function() {
    await database.resetDb() // denna stänger också db
}); */