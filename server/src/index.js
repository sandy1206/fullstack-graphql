import { ApolloServer, gql } from "apollo-server";
import resolvers from './resolvers.js';
import readSchema from './schema.js';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';


const typeDefs = readSchema()

const server = new ApolloServer({
	typeDefs,
	resolvers,
	plugins: [
		ApolloServerPluginLandingPageGraphQLPlayground()
	]
})

server.listen().then(() => {
	console.log('Listening on port 4000')
})
