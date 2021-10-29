process.env.NODE_ENV = "test"

var assert = require('assert');
const update = require("../src/update");
const database = require("../db/database.js");
const find = require("../src/find")



describe('#update document()', async function() {
   
    it('tries to update doc, should return true, and find.finddoc should show it', async function() {
        let req = {
            body: {
                _id: "123123",
                text: "Ny text"
            }
        }
        const updatedDoc = await update.updateDocument(req);

        let foundDoc = await find.findDocument("123123");
        let newtext = foundDoc[0].docs[0].text;
        console.log(newtext)
        assert.equal(updatedDoc, true)
        assert.equal(newtext, "Ny text")

    });

    it('tries to update doc that does not exist, should return false', async function() {
        let req = {
            body: {
                _id: "asdasd",
                text: "Ny text"
            }
        }
        const updatedDoc = await update.updateDocument(req);
        assert.equal(updatedDoc, false)

    });
});


describe('#update users document()', async function() {
   
    it('tries to update doc with false docid, should return false', async function() {

        let req = {
            body: {
                email: "test1@live.se",
                docName: "Nytt doc1",
                text: "Ny text igen",
                randomnr: "1231234"
            }
        }
        const updatedDoc = await update.updateUsersDocuments(req);

        let foundDoc = await find.findDocument("123123");
        let newtext = foundDoc[0].docs[0].text;
        console.log(newtext)
        assert.equal(updatedDoc, undefined)
        assert.equal(newtext, "Ny text")

    });


    it('tries to update doc, should return false since email is not registerd', async function() {

        let req = {
            body: {
                email: "Not@registered.se",
                docName: "Nytt doc1",
                text: "Ny text igen",
                randomnr: "123123123"
            }
        }
        const updatedDoc = await update.updateUsersDocuments(req);
        assert.equal(updatedDoc, undefined)
    });




    it('tries to update doc, should return true and finddocument should find it', async function() {
        let email= "test1@live.se";
        let req = {
            body: {
                email: "test1@live.se",
                docid: "123123",
                emailToAdd: "test2@live.se",
            }
        }
        const updatedDoc = await update.updateAuthForUser(req);
        let foundDoc = await find.findDocument("123123");
        let allowed_user = foundDoc[0].docs[0].allowed_user[2];        

        assert.equal(updatedDoc, true)
        assert.equal(allowed_user, "test2@live.se")
    });


    it('tries to update doc with unvalid id, should return false', async function() {

        let req = {
            body: {
                email: "test1@live.se",
                docid: "notvalid",
                emailToAdd: "test2@live.se",
            }
        }
        const updatedDoc = await update.updateAuthForUser(req);
        assert.equal(updatedDoc, true)
    });



});
