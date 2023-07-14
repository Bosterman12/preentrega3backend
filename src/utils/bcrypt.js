import bcrypt from 'bcrypt'
import config from '../config/config.js'

export const createHash = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(parseInt(config.SALT)))

console.log(createHash('coderhouse'))

export const validatePassword = (passwordSend, passwordBDD) => bcrypt.compareSync(passwordSend, passwordBDD)

const passwordEncriptado = createHash('coderhouse')

console.log(passwordEncriptado)
console.log(validatePassword('coderhouse', passwordEncriptado))