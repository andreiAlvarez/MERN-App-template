const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const bcryptjs = require('bcryptjs');

const User = require('../../models/User.model');

passport.use(
  'local',
  new LocalStrategy(
    {
      usernameField: 'email'
      // passReqToCallback: true // if we need to use request in the callback we can pass it like this
      // in that case the callback would look like: (req, email, password, next)
    },
    (email, password, next) => {
      User.findOne({ email })
        .then(userFromDB => {
          console.log('in pass: ', bcryptjs.compareSync(password, userFromDB.passwordHash));
          if (!userFromDB) {
            next(null, false, { message: 'Incorrect email! 🛬' });
            return;
          }

          if (!bcryptjs.compareSync(password, userFromDB.passwordHash)) {
            console.log('1');
            next(null, false, { message: 'Incorrect password! ❌' });
            return;
          }
          console.log('2');
          next(null, userFromDB);
        })
        .catch(err => next(err));
    }
  )
);
