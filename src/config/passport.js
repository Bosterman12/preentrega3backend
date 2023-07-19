import local from 'passport-local'
import passport from 'passport'
import { createHash, validatePassword } from '../utils/bcrypt.js'
import { userModel} from '../models/Users.js'
import { Strategy as GithubStrategy} from 'passport-github2'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import { Strategy as jwtStrategy, ExtractJwt } from 'passport-jwt'
import config from './config.js'

const LocalStrategy = local.Strategy



const initializePassport = () => {
    passport.use('register', new LocalStrategy(
        {passReqToCallback: true, usernameField: 'email'}, async(req, username, password, done) =>{
            const {first_name, last_name, email, gender} = req.body
            try{
                const user = await userModel.findOne({email:email})

                if(user){
                    return done (null, false)
                }
                const passwordHash = createHash(password)
                const userCreated = await userModel.create({
                    first_name: first_name,
                    last_name: last_name,
                    email: email,
                   
                    gender: gender,
                    password: passwordHash
                })
                console.log(userCreated)
                return done (null, userCreated)
            }catch(error) {
                return done(error)

            }
        }
    ))

    passport.serializeUser((user, done) =>{
        done(null, user._id)
    })

    passport.deserializeUser(async (id, done) =>{
        const user = await userModel.findById(id)
        done(null, user)
    })

    passport.use('login', new LocalStrategy({usernameField: 'email'}, async(username, password, done) =>{
        try{
            const user = await userModel.findOne({email: username})

            if (!user){
                return done (null, false)
            }

            if (validatePassword(password, user.password)){
                return done (null, user)
            }
        }catch(error){
            return done (error)
        }
    }  ))

    passport.use(
        'githubSignup',
        new GithubStrategy(
          {
            clientID: 'Iv1.98e5aaa5d252831a',
            clientSecret: '472b7d13196d38f26e5d22fe313e1addc60392ad',
            callbackURL: 'http://localhost:4000/user/github',
          },
          async (accessToken, refreshToken, profile, done) => {
            const { name, email } = profile._json
            try {
              const userDB = await userModel.findOne({ email })
              if (userDB) {
                return done(null, userDB)
              }
              const user = {
                first_name: name.split(' ')[0],
                last_name: name.split(' ')[1] || '',
                email,
                password: ' ',
              }
              const newUserDB = await userModel.create(user)
              done(null, newUserDB)
            } catch (error) {
              done(error)
            }
          }
        )
      )
      passport.use(
        'googleStrategy',
        new GoogleStrategy(
          {
            clientID: config.GOOGLE_CLIENT_ID,
            clientSecret: config.GOOGLE_CLIENT_SECRET,
            callbackURL: 'http://localhost:4000/user/google',
          },
         async (accessToken, refreshToken, profile, done) =>{
          console.log(profile);
          const {given_name, family_name, email} = profile._json
          try{
            const userDB = await userModel.findOne({email})
            if(userDB){
              return done (null, userDB)
            }
            const user = {
              first_name: given_name,
              last_name: family_name || '',
              email: email,
              password: ' ',
            }
            const newUserDB = await userModel.create(user)
            done(null, newUserDB)
          }catch(error){
            done(error)
          }
         } 
          ))

      passport.use('jwtStrategy',
      new jwtStrategy(
        {
          jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
          secretOrKey: config.SECRET_KEY_JWT,
        },
        async (jwt_payload, done) =>{
          //console(jwt_payload)
          done(null, jwt_payload.user)

        }
      ))

}

    export default initializePassport