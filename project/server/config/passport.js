const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const { User } = require('../config/sequelize')
const keys = {
    secretOrKey: "someSecretKey"
}
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;


module.exports = passport => {
    
    console.log(opts)
    /*passport.use(
      new JwtStrategy(opts, (jwt_payload, done) => {
        User.findOne({
            where:{
                id: jwt_payload.id
            }
        })
        .then(user => {
            if(user){
                return done(null, user)
            }
            return done(null, false)
        })
        .catch(err => {
            console.log(err)
        })
      })
    );*/
  };
  