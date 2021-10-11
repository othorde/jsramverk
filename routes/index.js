var express = require('express');
var router = express.Router();
const findAll = require("../src/findAll.js");
const create = require("../src/create.js");
const update = require("../src/update.js");
const find = require("../src/find.js");
const findUser = require("../src/findUser.js");
const auth = require("../src/auth.js");
const findAuthDoc = require('../src/findAuthDoc.js');

router.get('/', function(req, res, next) {
    const data = 
        res.status(200).json({
            data: {
                msg: "Hello INDEX"
            }
        });

    res.json(data);
});

// Return a JSON object with list of all documents within the collection.
router.get("/list", async (req, response, next) => {
    try {
        
    let res = await findAll.findAllDoc({}, {}, 0);
    
    response.json(res);
} catch (err) {
    response.json(err);
}
});

// Return a JSON object with list of all documents within the collection.
router.get("/lists/:id", async (req, response, next) => {
    try {
    const id = req.params.id;
    let res = await find.findDocument(id);

    response.json(res);
} catch (err) {
    }
});

/* CREATE */
router.post("/list", async (req, res, next) => {
    
    try {
        let result = await create.createUser(req, res);
        if (result == true) {
            res.status(201).json({
                data: {
                    msg: "Got a POST request, sending back 201 Created"
                }
            });
        } else {
            res.status(401).json({
                data: {
                    msg: false
                }
            });
        }
    } catch (err) {
            res.json(err);
        }
    });
    
/* UPDATE */
router.put("/list", async (req, res, next) => {

    try {
        await auth.checkToken(req, res, next);
        const result = await update.updateDocument(req, res);
        if (result == true) {
            res.status(201).json({
                data: {
                    msg: true,
                }
            });
        } else {
            res.status(401).json({
                data: {
                    msg: false
                }
            });
        }
    } catch (err) {
        res.json(err);
    }

});

//checklogin
router.post("/login", async (req, res, next) => {

    try {
        let result = await findUser.findUser(req, res);
        if (result.validate === true) {

            res.status(201).json({
                data: {
                    msg: true,
                    token: result.token
                }
            });
            
        } else {
            res.status(401).json({
                data: {
                    msg: false
                }
            });
        }
    } catch (err) {
            res.json(err);
        }
    });

/* hämtar alla dokument som använadre har tillgång till */
router.post("/doc", async (req, res, next) => {
    try {

        let result = await findAuthDoc.findAuthDocs(req, res);
        res.json(result);
        return result
} catch (err) {
    res.json(err);
}
});

router.put("/doc", async (req, res, next) => {

    try {
        await auth.checkToken(req, res, next);
        const result = await update.updateUsersDocuments(req, res);
        if (result == true) {
            res.status(201).json({
                data: {
                    msg: true,
                }
            });
        } else {
            res.status(401).json({
                data: {
                    msg: false
                }
            });
        }
    } catch (err) {
        res.json(err);
    }
});

router.put("/authforuser", async (req, res, next) => {

    try {
        await auth.checkToken(req, res, next);
        const result = await update.updateAuthForUser(req, res);
        if (result == true) {
            res.status(201).json({
                data: {
                    msg: true,
                }
            });
        } else {
            res.status(401).json({
                data: {
                    msg: false
                }
            });
        }
    } catch (err) {
        res.json(err);
    }
});

module.exports = router;
