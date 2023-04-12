const mongoose = require('mongoose')
const Product = require('./models/Product.js')
const Category = require('./models/Category.js')
import { productsData, usersData, categoriesData } from "../testData.js"

const resolvers = {
	Query: {
		appName: () =>
			'ProductHunt clone',
		allProducts: () => {
			return Product.find({})
		},
		productsByAuthor: (_, args) => {
			const user = usersData.find(user => user.userName === args.authorName)
			return productsData.filter(product => product.authorId === user.id)
		},
		productsByCategory: async (parent, { slug }) => {
			const category = await Category.findOne({ slug })
			return Product.find({ categoriesIds: category._id })
		}
	},
	Product: {
		author: (product) => {
			return usersData.find(user => user.id === product.authorId)
		},
		categories: async (product) => {
			const allIds = product.categoriesIds
			return Category.find().where('_id').in(allIds)
		},
		publishedAt: (product) => {
			return product.publishedAt.toISOString()
		},
	},
	Mutation: {
		createProduct: async (_, { input }) => {
			const author = await User.findOne({ userName: "ellen" })
			return Product.create({
				name: input.name,
				description: input.description,
				url: input.url,
				numberOfVotes: 0,
				publishedAt: Date.now(),
				authorId: author._id,
				categoriesIds: input.categoriesIds,
			})
		}
	}

}

export default resolvers;
