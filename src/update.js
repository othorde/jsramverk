
 "use strict";
const database = require("../db/database.js");

const update = {
    
    updateDocument: async function (req, res) {
        // req contains user object set in checkToken middleware
        let db;
        try {

            db = await database.getDb();
            var id = req.body._id;
            const result = await db.collection.updateOne(
                { "docs.docid": id }, 
                { $set: { "docs.$.text": req.body.text } },
            );
            if (result.acknowledged && result.modifiedCount == 1) {
                return true
            } else {
                return false
            } 
        } catch (e) {
            return res.status(500).json({
                errors: {
                    status: 500,
                    path: "/",
                    title: "Database error",
                    message: e.message
                }
            });
        } finally {
            await db.client.close();
        }
    },

    updateUsersDocuments: async function (req, res) {
        let db;
        const email = req.body.email;
        const docName = req.body.docname;
        const text = req.body.text;
        const docid = req.body.randomnr;

        const newDoc = {
            docname: docName,
            docid: docid,
            text: text,
            allowed_user: [
                email,
            ]
        }

        try {

            db = await database.getDb();
            var id = req.body._id;

            const result = await db.collection.update(
                { email: email },
                { $push: { docs: newDoc } }
            )
            
            if (result.acknowledged == true && result.modifiedCount == 1) {
                return true
            } 
    
        } catch (e) {
            return res.status(500).json({
                errors: {
                    status: 500,
                    path: "/",
                    title: "Database error",
                    message: e.message
                }
            });
        } finally {
            await db.client.close();
        }
    },

    updateAuthForUser: async function (req, res) {
        let db;

        const docid = req.body.docid;
        const email = req.body.email;
        const emailToAdd = req.body.emailToAdd;
        try {

            db = await database.getDb();

            const result = await db.collection.update({  email: email }, 
                { $addToSet: { "docs.$[elem].allowed_user": emailToAdd } },
                { arrayFilters: [ { "elem.docid": docid } ] } )

            if (result.acknowledged == true && result.modifiedCount == 1) {
                return true
            } 
    
        } catch (e) {
            return res.status(500).json({
                errors: {
                    status: 500,
                    path: "/",
                    title: "Database error",
                    message: e.message
                }
            });
        } finally {
            await db.client.close();
        }
    }
    
}

module.exports = update;
