const router = require('express').Router();
const fs = require('fs');
const path = require('path');

fs.readFile(path.join(__dirname, '/../data/cards.json'), (err, data) => {
  if (err) {
    console.log(`error in reading cards, error: ${err}`);
    return;
  }
  const dataParsed = JSON.parse(data);
  router.get('/', (req, res) => {
    res.status(200);
    res.json(dataParsed);
  });
  router.get('/:id', (req, res) => {
    const card = dataParsed.filter((item) => item._id === req.params.id);
    if (card.length === 1) {
      res.status(200);
      res.json(card[0]);
    } else {
      res.status(404);
      res.json({ message: 'Card ID not found' });
    }
  });
});

module.exports = router;
