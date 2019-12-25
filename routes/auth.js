const router = require('express').Router();
const User = require('./../models/users');
const Joi = require('@hapi/joi');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const verify = require('./token');

const registerValidation = (data) => {
	const schema = Joi.object({
		name: {
			first: Joi.string().required().min(2).max(100),
			last: Joi.string().required().min(2).max(100),
			nickname: Joi.string().min(2).max(100).allow('', null),
		},
		email: Joi.string().required().min(6).max(255).email(),
		password: Joi.string().required().min(8).max(255)
	});
	return schema.validate(data);
};
const loginValidation = (data) => {
	const schema = Joi.object({
		email: Joi.string().required().min(6).max(255).email(),
		password: Joi.string().required().min(8).max(255)
	});
	return schema.validate(data);
};
//REGISTER NEW USER
router.post('/register', async (req, res) => {
	//VALIDATING DATA
	const { error } = registerValidation(req.body);
	if(error) return res.status(400).send(error.details[0].message);

	//IF USER ALREADY EXIST
	const userExist = await User.findOne({email: req.body.email});
	if (userExist) return res.status(400).send('User already registered');

	//HASH PASSWORD
	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(req.body.password, salt);


	//ADD USER
	const user = new User({
		name: {
			first: req.body.name.first,
			last: req.body.name.last,
			nickname: req.body.name.nickname
		},
		email: req.body.email,
		password: hashedPassword,
	});
	user.save()
		.then(res => res.json(res))
		.catch(err => res.send(err))
});


//LOGIN
router.post('/login', async (req, res) => {
	//VALIDATING DATA
	const { error } = loginValidation(req.body);
	if(error) return res.status(400).send(error.details[0].message);
	//IF USER EXIST
	const user = await User.findOne({email: req.body.email});
	if (!user) return  res.status(400).send('User not found');
	//PASSWORD CHECK
	const validPass = await bcrypt.compare(req.body.password, user.password);
	if(!validPass) return res.status(400).send('Invalid password');
	//CREATE AND ASSIGN A TOKEN
	const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
	res.header('token', token);
	const userInfo = {
		id: user._id,
		name: user.name,
		photo: user.photo,
		email: user.email,
		token: token,
	};
	res.send(userInfo);
});

//GET MY INFO

router.post('/login/me', verify, async (req, res) => {
	res.status(200).send(req.user)
});


module.exports = router;
