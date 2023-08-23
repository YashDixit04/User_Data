
const LocalStrategy = require('passport-local').Strategy //local variable store  and .strategy is local strategy
const bcrypt = require('bcrypt')

function initialize(passport, getUserByEmail, getUserById) {

  // authenticateUser the user (correct emailId and password finding)
  const authenticateUser = async (email, password, done) => {
    const user = getUserByEmail(email) // return the user by email or can't find email
    if (user == null) {
      return done(null, false, { message: 'No user with that email' })
     }
    try {
      if (await bcrypt.compare(password, user.password)) {
        return done(null, user)
      } else {
        return done(null, false // because password not match 
          , { message: 'Password incorrect' }) //if password was not match
      }
    } catch (e) {
      return done(e)
    }
  }

  passport.use(new LocalStrategy({ usernameField: 'email' }, // To use the localStorage  
  authenticateUser ))
  
  passport.serializeUser((user, done) => done(null, user.id))
  passport.deserializeUser((id, done) => {
    return done(null, getUserById(id))
  })
}

module.exports = initialize;