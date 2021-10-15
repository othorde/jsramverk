const findAll = require("../../src/findAll.js");
const find = require("../../src/find.js");

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLInt,
    GraphQLNonNull
} = require('graphql');

const DocsType = require("./graphQlDocs.js");
const UserType = require("./graphQlUser.js");

const RootQueryType = new GraphQLObjectType({

    name: 'Query',
    description: 'Root Query',
    fields: () => ({
        doc: {
            type: DocsType,
            description: "single doc",
            args: {
                docid: { type: GraphQLString }
            },
            resolve: async function(parent, args) {
                console.log(args.docid)
                let documents = await getDocuments(); // hämtar allt med funktionen
                return documents.find(document => document.docid == args.docid)
            }
        },
        users: {
            type: GraphQLList(UserType),
            description: 'List of all Users',
            resolve: async function() {
                return await findAll.findAllDoc({}, {}, 0); // hämtar allt med funktionen
            }
        },
    })
});

async function getDocuments() {
    let userArray = await findAll.findAllDoc({}, {}, 0);
    let docsArray = [];
    userArray.forEach(function(user) {
        user.docs.forEach(function(doc) {
            docsArray.push(doc)
        });
    });

    return docsArray;
}

module.exports = RootQueryType;
