const express = require('express');
const mongoose = require('mongoose');
const { serverURL } = require('./utils/utils');

mongoose.connect(serverURL);

const { PORT = 3000 } = process.env;
const cardsRoute = require('./routes/cards');
const usersRoute = require('./routes/users');

const app = express();

app.use(express.json());
app.use((req, res, next) => {
  req.user = {
    _id: '63361a9b89c45c19cd90ee5b',
  };

  next();
});
app.use('/cards', cardsRoute);
app.use('/users', usersRoute);

app.use((req, res, next) => {
  res.status(404);
  res.json({ message: 'Requested resource not found' });
  next();
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
