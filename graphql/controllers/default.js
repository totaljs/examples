const graphqlHTTP = require('express-graphql').graphqlHTTP;
const makeExecutableSchema = require('@graphql-tools/schema').makeExecutableSchema;

const typeDefs = `
  type User {
	id:Int
    email: String!
    name: String
  }
  
  type Query {
    allUsers: [User!]!
  }
`;

const resolvers = {
	Query: {
		allUsers: () => {
			return new Promise(function (resolve, reject) {
				NOSQL('user').find().callback((err, response) => !err ? resolve(response) : reject(Error(err)))
			})
		}
	}
};

const schema = makeExecutableSchema({
	resolvers,
	typeDefs,
});

exports.install = function () {
	ROUTE('GET /');

	ROUTE('GET /graphql', async function () {
		await graphqlHTTP({ schema: schema, graphiql: true })(this.req, this.res);
	});

	ROUTE('POST /graphql', async function () {
		await graphqlHTTP({ schema: schema, graphiql: false })(this.req, this.res);
	});
}
