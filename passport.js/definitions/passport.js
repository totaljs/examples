var passport = require('passport');
var TwitterStrategy = require('passport-twitter').Strategy;

passport.use(new TwitterStrategy({ consumerKey: CONFIG('twitter-key'), consumerSecret: CONFIG('twitter-secret'), callbackURL: CONFIG('twitter-callback') }, function(token, tokenSecret, profile, done) {
    done(null, profile);
}));

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(obj, done) {
    done(null, obj);
});

F.middleware('passport.js', passport.initialize());