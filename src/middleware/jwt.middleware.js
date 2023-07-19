import jwt from 'jsonwebtoken'
import config from '../config/config.js'

export const jwtValidation =  (req, res, next) =>{
    const authorizationHeader = req.get('Authorization')
    const token = authorizationHeader.split(' ')[1]
    const isValidToken = jwt.verify(token, config.SECRET_KEY_JWT)
    console.log(isValidToken);
    //console.log(token)
    if(isValidToken){
        req.user = isValidToken.user
        next()
    }
    res.status(401).json({message: 'Autentication error'})
}
