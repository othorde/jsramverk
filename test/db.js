process.env.NODE_ENV = "test"

var assert = require('assert');
const database = require("../db/database.js");



describe('Database', function() {
    it('Checks if correct db is returned, should return test.crowd', async function() {
        let db;
        db = await database.getDb();
		assert.equal(db.collection.namespace, "test.crowd");
        await db.client.close();   
    });
});
