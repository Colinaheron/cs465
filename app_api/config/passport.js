const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const User = mongoose.model('users');

passport.use(new LocalStrategy(
  {
    usernameField: 'email',
  },
  async (username, password, done) => {
    try {
      // Find the user with the provided email
      const user = await User.findOne({ email: username });
      
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }

      // Check if the password is valid
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }

      // Authentication successful, return the user
      return done(null, user);
    } catch (err) {
      // Handle errors during user lookup
      return done(err);
    }
  }
));
