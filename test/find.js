/* process.env.NODE_ENV = "test"


var assert = require('assert');
const find = require("../src/find");
const database = require("../db/database.js");

beforeEach(async function() {
	let db;
    database.resetDb();
	db = await database.getDb(); 
});



describe('#find()', function() {
    it('find a doc with a name and body, returns doc', async function() {
      	const document1 = await find.findDocument("613ef50d82f30d462a1e3572");

    });
});
 */