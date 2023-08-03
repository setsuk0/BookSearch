const { AuthenticationError } = require('apollo-server-express');
const jwt = require('jsonwebtoken');

// Set token secret and expiration date
const secret = 'mysecretsshhhhh';
const expiration = '2h';

module.exports = {
  // Function for authentication in GraphQL context
  authMiddleware: function ({ req }) {
    // Allows token to be sent via headers
    const token = req.headers.authorization;

    if (!token) {
      throw new AuthenticationError('You have no token!');
    }

    try {
      // Verify token and get user data out of it
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch {
      console.log('Invalid token');
      throw new AuthenticationError('Invalid token!');
    }
  },
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };

    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};

