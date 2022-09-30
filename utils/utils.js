module.exports.responseStatus = {
  success: {
    code: 200,
  },
  badRequest: {
    code: 400,
    message: (err) => ({ message: err }),
  },
  notFound: {
    code: 404,
    message: () => ({ message: 'Not found' }),
  },
  serverError: {
    code: 500,
    message: () => ({ message: 'Server error' }),
  },
};

module.exports.serverURL = 'mongodb://localhost:27017/aroundb';
