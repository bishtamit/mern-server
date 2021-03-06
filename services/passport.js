const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const keys = require('../config/keys')
const mongoose = require('mongoose')

const User = mongoose.model('users')

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.use(
    new GoogleStrategy({
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback '
    }, (accessToken, refreshToken, profile, done) => {
        User.findOne({                googleId: profile.id
            })
            .then(exUser => {
                console.log(exUser)
                if (exUser) {
                    console.log('user present')
                    done(null, exUser)
                } else {
                    console.log('adding the new user')
                    new User({
                        googleId: profile.id
                    }).save().then(user => done(null, user))

                }
            })

        // console.log({
        //     accessToken,
        //     refreshToken,
        //     profile,
        //     done
        // })
    })
)