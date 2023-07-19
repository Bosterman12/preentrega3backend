/*import { __dirname, __filename } from "../path.js";
import { createHash, validatePassword } from "./bcrypt.js";
import jwt from "jsonwebtoken";
import config from "../config/config.js";



export const generateToken = (user) => {
    const token = jwt.sign({user},config.SECRET_KEY_JWT, {expiresIn: '1h'})
    return token
}*/
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import config from '../config/config.js'

export const __dirname = dirname(fileURLToPath(import.meta.url))

export const hashData = async(data)=>{
    return bcrypt.hash(data,10)
}

export const compareData = async(data,hashData)=>{
    return bcrypt.compare(data,hashData)
}

export const generateToken = (user)=>{
    const token = jwt.sign({user},config.SECRET_KEY_JWT,{expiresIn: '1h'})
    return token
}



