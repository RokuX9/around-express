const express = require('express');

const { PORT = 3000 } = process.env;
const cardsRoute = require('./routes/cards');
const usersRoute = require('./routes/users');

const app = express();

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
