process.env.NODE_ENV = "test"

var assert = require('assert');
const findAuthDoc = require("../src/findAuthDoc");
const database = require("../db/database.js");


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

