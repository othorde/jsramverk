process.env.NODE_ENV = "test"

var assert = require('assert');
const findAll = require("../src/findAll");
const database = require("../db/database.js");


describe('#findAll()', function() {

    it('find all users, should return all users info', async function() {
      	const users = await findAll.findAllDoc({}, {}, 0);
        assert.equal(users[0].name, "test1")
        assert.equal(users[0].psw, "123431")
        assert.equal(users[0].docs[0].docname, "test1Dok")

        assert.equal(users[2].name, "test3")
        assert.equal(users[2].psw, "123433")
        assert.equal(users[2].docs[0].docname, "test3Dok")
    });

    it("find only two users, should return first and second user", async function() {
        const users = await findAll.findAllDoc({}, {}, 2);
        console.log(users[0].name, users[1].name, users[2]);
        assert.equal(users[0].name, "test1")
        assert.equal(users[1].name, "test2")
        assert.equal(users[2], undefined)
    })

    it("clear db and finall, should return null", async function() {
        await database.resetDb() // denna stänger också db
        const users = await findAll.findAllDoc({}, {}, 0);
        assert.equal(users.length, 0)
    })
});
/* after(async function() {
    await database.resetDb() // denna stänger också db
});
 */