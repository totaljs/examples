var passport = require('passport');
var TwitterStrategy = require('passport-twitter').Strategy;

passport.use(new TwitterStrategy({ consumerKey: CONFIG('twitter-key'), consumerSecret: CONFIG('twitter-secret'), callbackURL: 'http://127.0.0.1/login/twitter/callback/' }, function(token, tokenSecret, profile, done) {
    done(null, profile);
}));

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(obj, done) {
    done(null, obj);
});

framework.middleware('passport.js', function(next) {
    var self = this;
    passport.initialize()(self.req, self.res, next);
});