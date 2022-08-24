const router = require('express').Router();
const fs = require('fs');
const path = require('path');

fs.readFile(path.join(__dirname, '/../data/users.json'), (err, data) => {
  if (err) {
    console.log(`error in reading users, error: ${err}`);
    return;
  }
  const dataParsed = JSON.parse(data);
  router.get('/', (req, res) => {
    res.status(200);
    res.json(dataParsed);
  });
  router.get('/:id', (req, res) => {
    const user = dataParsed.filter((item) => item._id === req.params.id);
    if (user.length === 1) {
      res.status(200);
      res.json(user[0]);
    } else {
      res.status(404);
      res.json({ message: 'User ID not found' });
    }
  });
});

module.exports = router;
