const jwt = require('jsonwebtoken');
const User = require('./../models/users');

module.exports = async function(req, res, next) {
	const token = req.header('token');
	const data = jwt.verify(token, process.env.TOKEN_SECRET);
	if(!token) return res.status(401).send('Access denied');
	try {
		// req.user = jwt.verify(token, process.env.TOKEN_SECRET);
		const user = await User.findOne({ _id: data._id});
		if (!user) {
			res.status(400).send('Invalid Token');
		}
		req.user = {
			id: user._id,
			name: user.name,
			photo: user.photo,
			email: user.email,
			token: token,
		};
		req.token = token;
		next()
	} catch (err) {
		res.status(400).send('Invalid Token');
	}
};