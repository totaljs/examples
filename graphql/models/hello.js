var { graphql, GraphQLSchema, GraphQLObjectType, GraphQLString } = require('graphql');

exports.id = 'hello';

exports.schema = new GraphQLSchema({
	query: new GraphQLObjectType({
		name: 'RootQueryType',
		fields: {
			hello: {
				type: GraphQLString,
				resolve() {
					return 'world';
				}
			}
		}
	})
});

exports.root = { hello: () => 'Hello world!' };

exports.query = function query(q){

	return graphql(exports.schema, q, exports.root);

};