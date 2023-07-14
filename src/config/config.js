import dotenv from 'dotenv'
import program from '../utils/commander.js'

dotenv.config({
    path: program.opts().mode === 'test' ? '.env.testing' : '.env'

})

export default{
    URL_MONGODB_ATLAS: process.env.URL_MONGODB_ATLAS,
    PORT: process.env.PORT,
    COOKIE_SECRET: process.env.COOKIE_SECRET,
    SESSION_SECRET: process.env.SESSION_SECRET,
    SALT: process.env.SALT,
    SECRET_KEY: process.env.SECRET_KEY
}