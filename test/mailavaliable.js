process.env.NODE_ENV = "test"
const mailAvaliable = require("../src/mailavaliable")
const database = require("../db/database.js");
var assert = require('assert');



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
/* 
after(async function() {
    await database.resetDb() // denna stänger också db
}) */