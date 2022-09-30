const User = require('../models/user');

module.exports.getUsers = (req, res) => {
  User.find({})
    .orFail()
    .then((users) => res.status(200).send(users))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        res.status(404).send({ error: 'Users not found' });
        return;
      }
      res.status(500).send({ error: 'Server error' });
    });
};

module.exports.getUserById = (req, res) => {
  const { id } = req.params;
  User.findById({ _id: id })
    .orFail(() => {
      res.status(404).send({ error: 'No user found' });
    })
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        res.status(404).send({ error: 'User not found' });
        return;
      }
      if (err.name === 'ValidationError') {
        res.status(400).send({ error: err });
        return;
      }
      res.status(500).send({ error: 'Server error' });
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ error: err });
        return;
      }
      res.status(500).send({ error: 'Server error' });
    });
};

module.exports.updateProfile = (req, res) => {
  const { name, about } = req.body;
  const { _id } = req.user;
  User.findByIdAndUpdate(
    _id,
    { name, about },
    { new: true, runValidators: true },
  )
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ error: err });
        return;
      }
      res.status(500).send({ error: 'Server error' });
    });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  const { _id } = req.user;
  User.findByIdAndUpdate(_id, { avatar }, { new: true, runValidators: true })
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ error: err });
        return;
      }
      res.status(500).send({ error: 'Server error' });
    });
};
