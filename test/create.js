process.env.NODE_ENV = "test"

var assert = require('assert');
const create = require("../src/create");
const database = require("../db/database.js");


/* afterEach(async function() {
    await database.resetDb() // denna stänger också db
});
 */

describe('#create()', function() {
    it('creats a user, returns true if created', async function() {
      	var user = await create.createUser(req = {
			body: {
				user: "NyAnvändare",
				psw: "12345",
				email: "nyanvändare@live.se"
			}
		});
		assert.equal(user, true);
    });
	it('Trying to create a new user with same Email, should return false', async function(){
		await database.resetDb() // denna stänger också db

		var user = await create.createUser(req = {
			body: {
				user:'NyAnvändare',
				psw: "12345",
				email: "nyanvändare@live.se"
			}
		});
		assert.equal(user, true)
		var user = await create.createUser(req = {
			body: {
				user:'NyAnvändare',
				psw: "12345",
				email: "nyanvändare@live.se"
			}
		});
		assert.equal(user, false)
	});
	it('Trying to add user with missing @ in email, should return false', async function() {
		var user = await create.createUser(req = {
			body: {
				user: "",
				psw: "",
				email: "",
			}
		});
		assert.equal(user, false)
	})
	it('Trying to add user with psw.length < 5, should return false', async function() {
		var user = await create.createUser(req = {
			body: {
				user: "Olle1",
				psw: "1234",
				email: "olle@olle",
			}
		});
		assert.equal(user, false)
	})
});
	
