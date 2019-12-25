const mongoose = require('mongoose');


const ProductSchema = mongoose.Schema({
	user: {
		type: String,
		required: true,
	},
	title: {
		type: String,
		required: true,
		min: 3,
		max: 250,
	},
	subtitle: {
		type: String,
		default: '',
		min: 3,
		max: 1000,
	},
	type: {
		type: Number,
		required: true,
	},
	desc: {
		type: String,
		required: true,
		min: 50,
		max: 10000,
	},
	price: {
		type: Number,
		required: true,
		max: 999999
	},
	photo: {
		type: String,
		default: '',
		min: 3
	}
}, {
	timestamps: true
});
module.exports = mongoose.model('Products', ProductSchema);