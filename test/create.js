process.env.NODE_ENV = "test"

var assert = require('assert');
const create = require("../src/create");
const database = require("../db/database.js");





describe('#create()', function() {
    it('creats a user, returns true if created', async function() {
      	var user = await create.createUser(req = {
			body: {
				user: "NyAnvandare",
				psw: "12345",
				email: "nyanvandare@live.se"
			}
		});
		assert.equal(user, true);
    });
	it('Trying to create a new user with same Email, should return false', async function(){

		var user1 = await create.createUser(req = {
			body: {
				user:'NyAnvandare',
				psw: "12345",
				email: "nyanvandare@live.se"
			}
		});

		console.log(user1)

		assert.equal(user1, false)
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

