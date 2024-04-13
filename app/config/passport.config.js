const LocalStrategy = require('passport-local').Strategy;

function initialize(passport, verifyLoginService) {
    const authenticateUser = (username, password, done) => {
        const user = verifyLoginService(username, password);
        if (user) {
            return done(null, user);
        } else {
            return done(null, false, { message: 'Incorrect username or password' });
        }
    }

    passport.use(new LocalStrategy(authenticateUser));

    passport.serializeUser((user, done) => { 
        const {password, ...userData} = user;
        done(null, userData);
    });

    passport.deserializeUser((id, done) => { 
        done(null, id);
    });
}


module.exports = initialize;