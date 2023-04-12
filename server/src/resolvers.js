import { productsData } from "../testData.js"

const resolvers = {
	Query: {
		appName: () =>
			'ProductHunt clone',
		allProducts: () => productsData
	},
}

export default resolvers;
