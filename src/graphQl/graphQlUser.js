const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLInt,
    GraphQLFloat,
    GraphQLNonNull
} = require('graphql');

const DocsType = require("./graphQlDocs.js");

const UserType = new GraphQLObjectType({
    name: "User",
    description: "Represents a user",
    fields: () => ({
        _id: {type: GraphQLNonNull(GraphQLString) },
        name: {type: GraphQLNonNull(GraphQLString) },
        email: {type: GraphQLNonNull(GraphQLString) },
        psw: {type: GraphQLNonNull(GraphQLString) }, 
        docs: {
            type: GraphQLList(DocsType),
            resolve: (user) => {
                return user.docs
            }  
        }
    }),
})

module.exports = UserType;
