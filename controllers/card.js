const Card = require('../models/card');

module.exports.getCards = (req, res) => {
  Card.find({})
    .orFail()
    .then((cards) => res.status(200).send(cards))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        res.status(404).send({ error: 'No cards found' });
        return;
      }
      res.status(500).send({ error: 'Server error' });
    });
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const { _id } = req.user;
  Card.create({ name, link, owner: _id })
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ error: err });
        return;
      }
      res.status(500).send({ error: 'Server error' });
    });
};

module.exports.deleteCard = (req, res) => {
  const { cardId } = req.params;
  Card.findByIdAndDelete(cardId)
    .orFail()
    .then((data) => res.status(200).send(data))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        res.status(404).send({ error: 'No cards found' });
        return;
      }
      res.status(500).send({ error: 'Server error' });
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
    .then((card) => res.status(200).send(card))
    .catch(() => {
      res.status(500).send({ error: 'Server error' });
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
    .then((card) => res.status(200).send(card))
    .catch(() => {
      res.status(500).send({ error: 'Server error' });
    });
};
