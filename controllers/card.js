const Card = require('../models/card');
const { responseStatus } = require('../utils/utils');

module.exports.getCards = (req, res) => {
  Card.find({})
    .orFail()
    .then((cards) => res.status(responseStatus.success.code).send(cards))
    .catch((err) => {
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

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const { _id } = req.user;
  Card.create({ name, link, owner: _id })
    .then((card) => res.status(responseStatus.success.code).send(card))
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

module.exports.deleteCard = (req, res) => {
  const { cardId } = req.params;
  Card.findByIdAndDelete(cardId)
    .orFail()
    .then((data) => res.status(responseStatus.success.code).send(data))
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

module.exports.addLike = (req, res) => {
  const { cardId } = req.params;
  const { _id } = req.user;
  Card.findByIdAndUpdate(
    cardId,
    {
      $addToSet: { likes: _id },
    },
    { new: true },
  )
    .orFail()
    .then((card) => res.status(responseStatus.success.code).send(card))
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

module.exports.deleteLike = (req, res) => {
  const { cardId } = req.params;
  const { _id } = req.user;
  Card.findByIdAndUpdate(
    cardId,
    {
      $pull: { likes: _id },
    },
    { new: true },
  )
    .orFail()
    .then((card) => res.status(responseStatus.success.code).send(card))
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
