import { Router } from "express";
import passport from "passport";
//import { createUser } from "../controllers/users.controller.js";
import { findOneUser, findAllUsers, createOneUser } from "../controllers/users.controller.js";

const userRouter = Router()

userRouter.get('/register', async (req, res) =>{
    res.render('sessions/register')
})

userRouter.post('/register', passport.authenticate('register'), createOneUser)

userRouter.get(
    '/githubregister',
    passport.authenticate('githubSignup', { scope: ['user:email'] })
  )

 userRouter.get('/github', 
  passport.authenticate('githubSignup', { failureRedirect: '/session/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('../api/product');
  })

  userRouter.get(
    '/googleSignup',
    passport.authenticate('googleStrategy', { scope: ['profile'] })
  ) 

  userRouter.get('/google', 
  passport.authenticate('googleStrategy', { failureRedirect: '/session/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('../api/product');
  })

userRouter.get('/',findAllUsers)
userRouter.get('/:id', findOneUser)
//userRouter.post('/register', createOneUser)

export default userRouter