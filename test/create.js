/* process.env.NODE_ENV = "test"


var assert = require('assert');
const create = require("../src/create");
const database = require("../db/database.js");

beforeEach(async function() {
	let db;
	database.resetDb();
	db = await database.getDb();
	
});



describe('#create()', function() {
    it('creats a doc with a name and body, returns true if created', async function() {
      	const document = await create.createDocument(req = {
			body: {
				name: "NAMESENT", body: "BODYSENT"
			}
		
		});
		assert.equal(document, true);
    });

	
});


	 */