const database = require("../db/database.js");

const findUser = {
    findUser: async function (req, res) {
        let db;
        let checkAuth;

        try {
            
            db = await database.getDb();
            const result = await db.collection.findOne({"email": req.body.email})

            if (result == null) {
                return false;
            } else {
                return result         
            }
            } catch (e) {
                if (e instanceof TypeError) {
                    return "Id not found, maybe a typeError?"
                }
                return res.status(500).json({
                    errors: {
                        status: 500,
                        source: "/",
                        title: "Database error",
                        detail: e.message
                    }
                });
            } finally {
            await db.client.close();
          }
        }
    }

module.exports = findUser;
