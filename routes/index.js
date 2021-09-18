var express = require('express');
var router = express.Router();
const findAll = require("../src/findAll.js");
const create = require("../src/create.js");
const update = require("../src/update.js");
const find = require("../src/find.js");


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
    console.log(res)
} catch (err) {
    }
});



/* CREATE */
router.post("/list", async (req, res, next) => {
    
    try {
        let result = await create.createDocument(req, res);

        if (result) {
            res.status(201).json({
                data: {
                    msg: "Got a POST request, sending back 201 Created"
                }
            });
        }
    } catch (err) {
            response.json(err);
        }
    });
    


/* UPDATE */
router.put("/list", async (req, res) => {
    try {
    
    let result = await update.updateDocument(req, res);
    return (result);

} catch (err) {
    res.json(err);
}
});

module.exports = router;