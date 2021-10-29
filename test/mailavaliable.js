process.env.NODE_ENV = "test"
const mailAvaliable = require("../src/mailavaliable")
const database = require("../db/database.js");
var assert = require('assert');

before(async function() {
    await database.resetDb() // denna stänger också db
	let db;
    db = await database.getDb(); 
    await db.collection.insertMany([
        { name: "test1", email: "test1@live.se", psw: "123431", docs: [{ docname: "test1Dok", docid: "123123", allowed_users: ["test1@live.se", "test3@live.se"] }] },
        { name: "test2", email: "test2@live.se", psw: "123432", docs: [{ docname: "test2Dok", docid: "234234", allowed_users: ["test2@live.se"] }] },
        { name: "test3", email: "test3@live.se", psw: "123433", docs: [{ docname: "test3Dok", docid: "345345", allowed_users: ["test3@live.se", "test2@live.se", "test1@live.se"] }] },
    ])
    await db.client.close();
});

after(async function() {
    await database.resetDb() // denna stänger också db
})

describe("#mail avaliable", function() {

    it("checks if mail avaliable, should return true", async function() {
        let mail = "test4@live.se";
        let trueOrFalse = await mailAvaliable.isMailAvaliable(mail) 
            assert.equal(trueOrFalse, true)
    });

    it("checks if mail avaliable, should return false", async function() {
        let mail = "test1@live.se";
        let trueOrFalse = await mailAvaliable.isMailAvaliable(mail) 
            assert.equal(trueOrFalse, false)
    });

    it("checks if mail avaliable, should return false", async function() {
        let mail = "test2@live.se";
        let trueOrFalse = await mailAvaliable.isMailAvaliable(mail) 
            assert.equal(trueOrFalse, false)
    });

})