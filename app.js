
const express = require("express");
const morgan = require('morgan');
const cors = require('cors');

const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

const index = require('./routes/index');

const port = process.env.PORT || 1337;


app.use(cors());



// don't show the log when it is test
if (process.env.NODE_ENV !== 'test') {
    // use morgan to log at command line
    app.use(morgan('combined')); // 'combined' outputs the Apache style LOGs
}
app.use(express.json());


// This is middleware called for all routes.
// Middleware takes three parameters.
/* app.use((req, res, next) => {
    console.log(req.method);
    console.log(req.path);
    next();
}); */

app.use('/', index);



// Add routes for 404 and error handling
// Catch 404 and forward to error handler
// Put this last
/* app.use((req, res, next) => {
    var err = new Error("Not Found");
    err.status = 404;
    next(err);
});
 */
/* 
app.use((err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }

    res.status(err.status || 500).json({
        "errors": [
            {
                "status": err.status,
                "title":  err.message,
                "detail": err.message
            }
        ]
    });
}); */


// Start up server
app.listen(port, () => console.log(`Example API listening on port ${port}!`));