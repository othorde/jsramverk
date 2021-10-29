
process.env.NODE_ENV = "test"

var assert = require('assert');
const auth = require("../src/auth");
const database = require("../db/database.js");

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
