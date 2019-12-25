const router = require('express').Router();
const path = require('path');
const verify = require('./token');
const User = require('./../models/users');

router.post('/image', verify, (req, res) => {
	if (!req.files || Object.keys(req.files).length === 0) {
		return res.status(400).send('No files were uploaded.');
	}
	console.log(req);
	const file = req.files.file;
	const file_path = path.join(process.cwd(), 'public/images', file.name);

	file.mv(file_path, function(err) {
		if (err) {
			return res.status(500).send(err);
		} else {
			User.updateOne({_id: req.user.id}, {$set: {photo: file.name}})
				.then(res => res.json(user))
				.catch (err => res.json({message: err}));
			res.status(200).send(req.user);
		}

	});

});

module.exports = router;