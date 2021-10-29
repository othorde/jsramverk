process.env.NODE_ENV = "test"

var assert = require('assert');
const findUser = require("../src/findUser");
const database = require("../db/database.js");


describe('#findUser()', async function() {
    it('find all info about a user by mail and psw, should return true with test1@live.se', async function() {

        let req = { body: {email: "test1@live.se", psw: "123431"}}
        const findAUser = await findUser.findUser(req);

        assert.equal(findAUser.name, "test1");
        assert.equal(findAUser.psw, "123431");
        assert.equal(findAUser.email, "test1@live.se");
    });

    it('find all info about a user by mail and psw, should return false with test4@live.se', async function() {

        let req = { body: {email: "test4@live.se", psw: "123431"}}
        const findAUser = await findUser.findUser(req);

        assert.equal(findAUser, false);

    });

    it('find all info about a user by mail and psw, should return false with only search by psw', async function() {
        let req = { body: {psw: "123431"}}
        const findAUser = await findUser.findUser(req);

        assert.equal(findAUser, false);

    });
});

/* after(async function() {
    await database.resetDb() // denna stänger också db
}); */