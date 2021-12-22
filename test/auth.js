process.env.NODE_ENV = "test"

var assert = require('assert');
const auth = require("../src/auth");
const database = require("../db/database.js");


beforeEach(async function() {
    
	let db;
	db = await database.getDb(); 
	await db.collection.insertMany([
		{ name: "test1", email: "test1@live.se", psw: "123431", docs: [{ docname: "test1Dok", docid: "123123", text: "doc1text", allowed_user: ["test1@live.se", "test3@live.se"] }] },
		{ name: "test2", email: "test2@live.se", psw: "123432", docs: [{ docname: "test2Dok", docid: "234234", text: "doc2text", allowed_user: ["test2@live.se"] }] },
		{ name: "test3", email: "test3@live.se", psw: "123433", docs: [{ docname: "test3Dok", docid: "345345", text: "doc3text", allowed_user: ["test3@live.se", "test2@live.se", "test1@live.se"] }] },
	])
});




describe('#hash()', function() {
    it('should return a string hashed', async function() {
      	var hashedPsw = await auth.hash("hejsan")
		assert.notEqual(hashedPsw, "hejsan");
    });
    it('should return a string hashed, and then unhash it, getting true', async function() {
        var hashedPsw = await auth.hash("hejsan1");
        var unHashedPsw = await auth.unhash(hashedPsw, "hejsan1");
        assert.notEqual(hashedPsw, "hejsan1");
        assert.equal(unHashedPsw, true);
  	});
    it('should return a string hashed, returning false since psw is wrong', async function() {
      var hashedPsw = await auth.hash("hejsan1");
      var unHashedPsw = await auth.unhash(hashedPsw, "hejsan21");

      assert.notEqual(hashedPsw, "hejsan1");
      assert.equal(unHashedPsw, false);
  	});
});
