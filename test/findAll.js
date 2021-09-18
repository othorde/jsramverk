/* process.env.NODE_ENV = "test"


var assert = require('assert');
const findAll = require("../src/findAll");
const database = require("../db/database.js");

beforeEach(async function() {
	let db;
    database.resetDb();
	db = await database.getDb(); 
});


describe('#findAll()', function() {
    it('find all docs with a name and body, returns doc', async function() {
      	const document1 = await findAll.findAllDoc({}, {}, 0);
          assert.equal(document1[0].name, "What is Lorem Ipsum?");
          assert.equal(document1[1].name, "Where does it come from?");
    });
});
 */