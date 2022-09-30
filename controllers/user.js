const User = require('../models/user');
const { responseStatus } = require('../utils/utils');

module.exports.getUsers = (req, res) => {
  User.find({})
    .orFail()
    .then((users) => res.status(responseStatus.success.code).send(users))
    .catch((err) => {
      if (err.name === 'CastError') {
        res
          .status(responseStatus.badRequest.code)
          .send(responseStatus.badRequest.message(err.message));
        return;
      }
      if (err.name === 'DocumentNotFoundError') {
        res
          .status(responseStatus.notFound.code)
          .send(responseStatus.notFound.message());
        return;
      }
      res
        .status(responseStatus.serverError.code)
        .send(responseStatus.serverError.message());
    });
};

module.exports.getUserById = (req, res) => {
  const { id } = req.params;
  User.findById({ _id: id })
    .orFail()
    .then((user) => res.status(responseStatus.success.code).send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        res
          .status(responseStatus.badRequest.code)
          .send(responseStatus.badRequest.message(err.message));
        return;
      }
      if (err.name === 'DocumentNotFoundError') {
        res
          .status(responseStatus.notFound.code)
          .send(responseStatus.notFound.message());
        return;
      }
      res
        .status(responseStatus.serverError.code)
        .send(responseStatus.serverError.message());
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.status(responseStatus.success.code).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res
          .status(responseStatus.badRequest.code)
          .send(responseStatus.badRequest.message(err.message));
        return;
      }
      res
        .status(responseStatus.serverError.code)
        .send(responseStatus.serverError.message());
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
    .orFail()
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        res
          .status(responseStatus.badRequest.code)
          .send(responseStatus.badRequest.message(err.message));
        return;
      }
      if (err.name === 'DocumentNotFoundError') {
        res
          .status(responseStatus.notFound.code)
          .send(responseStatus.notFound.message());
        return;
      }
      res
        .status(responseStatus.serverError.code)
        .send(responseStatus.serverError.message());
    });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  const { _id } = req.user;
  User.findByIdAndUpdate(_id, { avatar }, { new: true, runValidators: true })
    .orFail()
    .then((user) => res.status(responseStatus.success.code).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        res
          .status(responseStatus.badRequest.code)
          .send(responseStatus.badRequest.message(err.message));
        return;
      }
      if (err.name === 'DocumentNotFoundError') {
        res
          .status(responseStatus.notFound.code)
          .send(responseStatus.notFound.message());
        return;
      }
      res
        .status(responseStatus.serverError.code)
        .send(responseStatus.serverError.message());
    });
};
