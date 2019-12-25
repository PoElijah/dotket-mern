const Joi = require('@hapi/joi');


const productsValidation = (data) => {
	const schema = Joi.object({
		user: Joi.string().required(),
		title: Joi.string().required().min(3).max(250),
		subtitle: Joi.string().min(3).max(1000).allow('', null),
		type: Joi.number().required().min(1),
		desc: Joi.string().required().min(50).max(10000),
		price: Joi.number().required().min(1).max(999999),
		photo: Joi.string().min(3).allow('', null),
	});
	return schema.validate(data);


};
module.exports = productsValidation;