const express = require("express");
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const httpServer = require('http').createServer(app);
const { graphqlHTTP } = require('express-graphql');
const {
    GraphQLSchema
} = require("graphql");

// GraphQL
const visual = true;
const RootQueryType = require("./src/graphQl/root.js");

const schema = new GraphQLSchema({
    query: RootQueryType
});



// GraphQL

app.use(bodyParser.urlencoded({ extended: true }));

const index = require('./routes/index');
const port = process.env.PORT || 1337;

// origin: "http://www.student.bth.se",
//        origin: "https://www.student.bth.se",
// origin: "http://localhost:3000",

const io = require("socket.io")(httpServer, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});


let previousId;
io.sockets.on('connection', function(socket) {
    socket.on('create', function(room) {
        socket.leave(previousId);
        socket.join(room);
        previousId = room;
        socket.on('changes', data => {
        socket.to(room).emit("receive-changes", data);
        });
    });
});


app.use(cors());

// don't show the log when it is test
if (process.env.NODE_ENV !== 'test') {
    // use morgan to log at command line
    app.use(morgan('combined')); // 'combined' outputs the Apache style LOGs
}
app.use(express.json());





// This is middleware called for all routes.
// Middleware takes three parameters.
app.use((req, res, next) => {
    console.log(req.method);
    console.log(req.path);
    next();
});

app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: false, // Visual är satt till true under utveckling
}));

app.use('/', index);

// Add routes for 404 and error handling
// Catch 404 and forward to error handler
// Put this last
app.use((req, res, next) => {
    var err = new Error("Not Found");
    err.status = 404;
    next(err);
});


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
});


// Start up server
const server = httpServer.listen(port, () => console.log(`Example app listening on port ${port}!`));
module.exports = server;
