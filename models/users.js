const mongoose = require('mongoose');


const UserSchema = mongoose.Schema({
	name: {
		type: Object,
		required: true,
		properties: {
			first: {
				type: String,
				required: true,
				max: 100,
				min: 2
			},
			last: {
				type: String,
				required: true,
				max: 100,
				min: 2
			},
			nickname: {
				type: String,
				default: null,
				max: 255,
				min: 2
			}
		}
	},
	photo: {
		type: String,
		default: '',
		min: 3
	},
	email: {
		type: String,
		required: true,
		max: 255,
		min: 6
	},
	password: {
		type: String,
		required: true,
		max: 1024,
		min: 8
	}
}, {
	timestamps: true
});
module.exports = mongoose.model('Users', UserSchema);