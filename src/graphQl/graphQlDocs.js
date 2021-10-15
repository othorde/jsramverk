const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull,
    GraphQLList
} = require('graphql');

const DocsType = new GraphQLObjectType({
    name: "documents",
    description: "Represents all documents",
    fields: () => ({
        docname: {type: GraphQLNonNull(GraphQLString) },
        /* docid: {type: GraphQLNonNull(GraphQLString) }, */
        text: {type: GraphQLNonNull(GraphQLString) },
        allowed_user: {type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(GraphQLString)))
        }
    }),
})

module.exports = DocsType;
