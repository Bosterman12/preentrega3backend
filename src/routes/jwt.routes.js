import { Router } from "express";
import { userModel } from "../models/Users.js";
import { compareData, generateToken } from "../utils/jwt.js";
import { jwtValidation } from "../middleware/jwt.middleware.js";
import passport from "passport";


const router = Router()

router.post('/login', async(req,res) => {
    const {email, password} = req.body
    
    const userDB = await userModel.findOne({email})
    console.log(userDB)
    if(!userDB){
        return res.status(401).send('Wrong email or password')
    }
    const isPassword = await compareData(password, userDB.password)
    if(!isPassword){
        return res.status(401).send('Wrong email or password')
    }
    const token = generateToken(userDB)
    res.status(200).json({message:'Login', token})
})

/*router.get('/validation', jwtValidation, (req,res) =>{
   const {email} = req.user
    res.send(`Probando ${email}`)
    //res.send('Probando')
})*/

router.get('/validation', passport.authenticate('jwtStrategy',{session : false}) , (req,res) =>{
    const {email} = req.user
     res.send(`Probando ${email}`)
     //res.send('Probando')
 })

export default router