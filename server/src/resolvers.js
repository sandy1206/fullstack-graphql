import { productsData, usersData, categoriesData } from "../testData.js"

const resolvers = {
	Query: {
		appName: () =>
			'ProductHunt clone',
		allProducts: () => productsData,
		productsByAuthor: (_, args) => {
			const user = usersData.find(user => user.userName === args.authorName)
			return productsData.filter(product => product.authorId === user.id)
		},
		productsByCategory: (_, { slug }) => {
			const category = categoriesData.find(category => category.slug === slug)

			return productsData.filter(product => product.categoriesIds.includes(category.id))
		}
	},
	Product: {
		author: (product) => {
			return usersData.find(user => user.id === product.authorId)
		},
		categories: (product) => {
			const res = product.categoriesIds.map(categoryId => {
				return categoriesData.find(category => category.id === categoryId)
			})

			return res
		}
	},

}

export default resolvers;
