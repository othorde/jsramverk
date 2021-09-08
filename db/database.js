const mongo = require("mongodb").MongoClient;
const config = require("./config.json");
const collectionName = "crowd";



const database = {
    getDb: async function getDb () {
        let dsn = process.env.DBWEBB_DSN || `mongodb+srv://${config.username}:${config.password}@cluster0.gywby.mongodb.net/mumin?retryWrites=true&w=majority`;
        
        if (process.env.NODE_ENV === 'test') {
            dsn = "mongodb://localhost:27017/test";
        }

        const client  = await mongo.connect(dsn, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        const db = client.db();
        const collection = db.collection(collectionName);

        return {
            dsn: dsn,
            collection: collection,
            client: client,
        };
    }
};

module.exports = database;