const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const UsersModel = require("../models/UserModel");
const {
    JWT_TOKEN
} = require("../configs/configs");

var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken('Authorization');
opts.secretOrKey = JWT_TOKEN;
passport.use( new JwtStrategy(opts, async(payload, done) =>{

    try{
        console.log( 'payload', payload);
        const user =  await UsersModel.findById(payload.sub)
    if (user) {
        return done(null, user);
    } else {
        return done(null, false);
    }
    
    }catch(error){
        return done(err, false);
}

}));
// passport.use(new JwtStrategy({
//     jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken('Authorization'),
//     secretOrKey: JWT_TOKEN
//   },  (payload, done) => {

//     console.log( 'payload', payload);
//     try {
//       const user = await User.findById(payload.sub)
  
//       if (!user) return done(null, false)
  
//       done(null, user)
//     } catch (error) {
//       done(error, false)
//     }

//   }))