process.env.NODE_ENV = "test"


var assert = require('assert');
const findAll = require("../src/findAll");
const database = require("../db/database.js");

beforeEach(async function() {

    let db;
    db = await database.getDb(); 
    await db.collection.insertMany([
        { name: "test1", email: "test1@live.se", psw: "123431", docs: [{ docname: "test1Dok", docid: "123123", allowed_users: ["test1@live.se", "test3@live.se"] }] },
        { name: "test2", email: "test2@live.se", psw: "123432", docs: [{ docname: "test2Dok", docid: "234234", allowed_users: ["test2@live.se"] }] },
        { name: "test3", email: "test3@live.se", psw: "123433", docs: [{ docname: "test3Dok", docid: "345345", allowed_users: ["test3@live.se", "test2@live.se", "test1@live.se"] }] },
    ])
    await db.client.close();
});

afterEach(async function() {
    await database.resetDb() // denna stänger också db
});


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
