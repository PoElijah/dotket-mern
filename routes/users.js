const router = require('express').Router();
const User = require('./../models/users');
const verify = require('./token');

//GET ALL USERS
router.get('/', (req, res) => {
  User.find()
      .then(users => res.json(users))
      .catch(err => res.json({message: err}));
});

// //ADD NEW USER
// router.post('/', (req, res) => {
//   console.log(req.body);
//   const user = new User({
//     name: {
//       first: req.body.name.first,
//       last: req.body.name.last,
//       nickname: req.body.name.nickname
//     },
//     email: req.body.email,
//     password: req.body.password
//   });
//   user.save()
//       .then(user => res.json(user))
//       .catch(err => res.send(err));
// });

//GET SPECIFIC USER
router.get('/:userId', (req, res) => {
  User.findById(req.params.userId)
      .then(user => res.json(user))
      .catch(err => res.json({message: err}));
});

//DELETE USER
router.delete('/:userId', (req, res) => {
  User.remove({_id: req.params.userId})
      .then(user => res.json(user))
      .catch (err => res.json({message: err}));
});

//UPDATE USER
router.patch('/:userId', (req, res) => {
  User.updateOne({_id: req.params.userId}, {$set: {login: req.body.login}})
      .then(res => res.json(user))
      .catch (err => res.json({message: err}));
});

module.exports = router;
