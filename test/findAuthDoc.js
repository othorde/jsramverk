process.env.NODE_ENV = "test"

var assert = require('assert');
const findAuthDoc = require("../src/findAuthDoc");
const database = require("../db/database.js");

/* beforeEach(async function() {
    
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

afterEach(async function() {
    await database.resetDb() // denna stänger också db
}); */

describe('#findAuthDoc()', async function() {
   
    it('find all docs that are auth for user1 (test1@live.se), should be test1Dok and test3Dok', async function() {

        let req = { body: {user: "test1@live.se"}}
        const authDocForUser = await findAuthDoc.findAuthDocs(req);
        let doc1 = authDocForUser[0].docs;
        let doc2 = authDocForUser[1].docs;

        assert.equal(doc1[0].docname, "test1Dok")
        assert.equal(doc2[0].docname, "test3Dok")

    });

    it('find all docs that are auth for user1 (test1@live.se), should only be its own doc', async function() {
        let req = { body: {user: "test2@live.se"}}
        const authDocForUser = await findAuthDoc.findAuthDocs(req);
        let doc1 = authDocForUser[0].docs;
        assert.equal(doc1[0].docname, "test2Dok")
    });

    it('Find all docs that are auth for NoUser, should return with 0 results', async function() {
        let req = { body: {user: "NoUser"}}
        const authDocForUser = await findAuthDoc.findAuthDocs(req);
        assert.equal(authDocForUser.length, 0)

    });
});

