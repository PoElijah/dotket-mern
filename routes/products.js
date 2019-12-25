const router = require('express').Router();
const Product = require('./../models/products');
const User = require('./../models/users');
const verify = require('./token');
const productValidation = require('./../services/validation/products');

//GET ALL PRODUCTS
router.get('/', (req, res) => {
	Product.find()
		.then(product => res.json(product))
		.catch(err => res.json({message: err}));
});

//ADD NEW PRODUCT
router.post('/', verify, (req, res) => {

	const {error} = productValidation(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	const product = new Product({
		user: req.body.user,
		title: req.body.title,
		subtitle: req.body.subtitle,
		type: req.body.type,
		desc: req.body.desc,
		price: req.body.price,
		photo: req.body.photo,
	});
	product.save()
		.then(product => res.json(product))
		.catch(err => res.send(err));
});

//GET SPECIFIC PRODUCT
router.get('/:productId', (req, res) => {
	Product.findById(req.params.productId)
		.then(product => {
			User.findById(product.user)
				.then(user => {
					res.status(200).json({...product._doc, user: {
									name: user.name,
									email: user.email,
									id: user._id,
									photo: user.photo
								}})
				})
				.catch(err => res.status(500).send(err))
		}).catch(err => res.status(500).send(err))
});

//DELETE PRODUCT
router.delete('/:productId', verify, (req, res) => {
	Product.remove({_id: req.params.productId})
		.then(product => res.json(product))
		.catch(err => res.json({message: err}));
});

//UPDATE PRODUCT
router.patch('/:productId', verify, (req, res) => {
	Product.updateOne({_id: req.params.productId}, {
		$set: {
			title: req.body.title,
			subtitle: req.body.subtitle,
			type: req.body.type,
			desc: req.body.desc,
			price: req.body.price,
			photo: req.body.photo,
		}
	})
		.then(product => res.json(product))
		.catch(err => res.json({message: err}));
});

module.exports = router;
