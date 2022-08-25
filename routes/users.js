const router = require('express').Router();
const fs = require('fs');
const path = require('path');

router.get('/', async (req, res) => {
  try {
    const data = await fs.promises.readFile(
      path.join(__dirname, '/../data/users.json'),
    );
    res.status(200);
    res.json(JSON.parse(data));
  } catch (err) {
    res.status(500).send({ message: `Internal server error: ${err}` });
  }
});
router.get('/:id', async (req, res) => {
  try {
    const data = await fs.promises.readFile(
      path.join(__dirname, '/../data/users.json'),
    );
    const user = JSON.parse(data).find((item) => item._id === req.params.id);
    if (user) {
      res.status(200);
      res.json(user);
    } else {
      res.status(404);
      res.json({ message: 'User ID not found' });
    }
  } catch (err) {
    res.status(500).send({ message: `Internal server error: ${err}` });
  }
});

module.exports = router;
