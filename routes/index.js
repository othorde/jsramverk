var express = require('express');
var router = express.Router();
const findAll = require("../src/findAll.js");
const create = require("../src/create.js");
const update = require("../src/update.js");
const find = require("../src/find.js");


router.get('/', function(req, res, next) {
    const data = {
        data: {
            msg: "Hello INDEX"
        }
    };

    res.json(data);
});


// Return a JSON object with list of all documents within the collection.
router.get("/list", async (req, response, next) => {
    try {
        
    let res = await findAll.findAllDoc({}, {}, 0);
    
    console.log(res);
    response.json(res);
} catch (err) {
    console.log(err);
    response.json(err);
}
});

// Return a JSON object with list of all documents within the collection.
router.get("/find", async (req, res, next) => {
    try {

    let res = await find.findDocument({}, {}, 0);

    console.log(res);
    response.json(res);
} catch (err) {
    console.log(err);
    response.json(err);
    }
});



/* CREATE */
router.post("/list", async (req, res, next) => {
    
    try {
        let result = await create.createDocument(req, res);
        
        res.status(201).json({
            data: {
                msg: "Got a POST request, sending back 201 Created"
            }
        });

    } catch (err) {
        console.log(err);
        response.json(err);
        }
    });
    


/* UPDATE */
router.put("/list", async (req, res) => {
    try {
    result = await update.updateDocument(req, {});
    res.status(204).send();

} catch (err) {
    console.log(err);
    response.json(err);
}
});

module.exports = router;