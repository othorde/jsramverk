"use strict";

const mongo = require("mongodb").MongoClient;
let collectionName = "crowd";
let config;
let password;
let username;

const database = {
    getDb: async function getDb () {

        //let dsn = "mongodb://localhost:27017/mumin";
        let dsn;
        if (process.env.NODE_ENV !== "test") {

            try {
                config = require("./config.json");
            } catch (error) {
                console.log(error)
            }
            username =  config.username || process.env.USERNAME;
            password =  config.password || process.env.PASSWORD;
            dsn = `mongodb+srv://${username}:${password}@cluster0.gywby.mongodb.net/mumin?retryWrites=true&w=majority`;
        } else {
            username =  config.username || process.env.USERNAME;
            password =  config.password || process.env.PASSWORD;
            dsn = `mongodb+srv://${username}:${password}@cluster0.gywby.mongodb.net/test?retryWrites=true&w=majority`
        }

        const client  = await mongo.connect(dsn, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        const db = await client.db();
        const collection = await db.collection(collectionName);

        return {
            db: db,
            collection: collection,
            client: client,
        };
    },

    resetDb: async function() {
        if (process.env.NODE_ENV === "test") {

            var db = await this.getDb()
            await db.collection.deleteMany({})
            await db.client.close();   

        }

    }

};

module.exports = database;

