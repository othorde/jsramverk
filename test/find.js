process.env.NODE_ENV = "test"

var assert = require('assert');
const find = require("../src/find");
const database = require("../db/database.js");



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

/* after(async function() {
    await database.resetDb() // denna stänger också db
}); */