
//import 'dotenv/config'
import express from 'express'
import productRouter from './routes/products.routes.js'
import cartRouter from './routes/cart.routes.js'
import { __dirname, __filename } from './path.js'
import multer from 'multer'
import { engine } from 'express-handlebars'
import * as path from 'path'
import { info } from 'console'
import mongoose from 'mongoose'
import { Server } from 'socket.io'
import { userModel } from './models/Users.js'
import { cartModel } from './models/Cart.js'
import { productModel } from './models/Products.js'
import { messageModel } from './models/Messages.js'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import  FileStore  from 'session-file-store'
import MongoStore from 'connect-mongo'
import './utils/bcrypt.js'
import passport from 'passport'
import routerSession from './routes/session.routes.js'
import userRouter from './routes/users.routes.js'
import initializePassport from './config/passport.js'
import handlebars from 'express-handlebars'
import config from './config/config.js'
import './config/dbConfig.js'




const app = express()
const PORT = config.PORT
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'src/public/img')
    },
    filename: (req, file, cb) => {
        cb(null, `${file.originalname}`)
    }
}) 


/*mongoose.connect(config.URL_MONGODB_ATLAS)
//mongoose.connect("mongodb+srv://bandialejandro:Bocha101@cluster0.b47bksn.mongodb.net/?retryWrites=true&w=majority")
.then(() => console.log("DB is connected"))
.catch((error) => console.log("error en MongoDB Atlas:", error))*/

// Express

const server = app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`)})


//Handlebars

app.engine('handlebars', engine({
    runtimeOptions:{
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true,
    },
    helpers: {eq: function(a, b, options){
        if(a===b){
            return options.fn(this);
        }
        else{
            return options.inverse(this)
        }
    }}
}))
app.set('view engine', 'handlebars')
app.set('views', path.resolve(__dirname, './views'))

//Middleware
app.use(express.json())
app.use(express.urlencoded({extended:true}))
const upload = (multer({storage:storage}))
app.use(cookieParser(config.COOKIE_SECRET))





console.log(__dirname)

//Socket
const io = new Server(server, {cors: {origin:"*"} })
const mensajes = []

io.on ('connection', (socket) => {
    console.log("Cliente conectado")
    socket.on("mensaje", info =>{
        console.log(info)
        //mensajes.push(info)
        //io.emit("mensajes", mensajes)
    })
    socket.on("nuevoProducto", (prod) => {
        console.log(prod)
    })
})

app.use((req, res, next) => {
    req.io = io
     next()

})


//cookies
app.get('/setCookie', (req, res) =>{
    res.cookie('CookieCookie', "Id: 545",{maxAge:3600000, signed: true}).send("Cookie firmada")
    //res.send("Cookie creada")
})

app.get('/getCookie', (req, res) =>{
    res.send(req.signedCookies)
})

app.get('/deleteCookie', (req, res) =>{
    res.clearCookie('CookieCookie').send("Cookie eliminada")
    })

//session

const fileStorage = FileStore(session);


app.use(session({
    //app.use(cookieParser())
    store : MongoStore.create({
        //mongoUrl:'mongodb+srv://bandialejandro:Bocha101@cluster0.b47bksn.mongodb.net/?retryWrites=true&w=majority',
        mongoUrl: config.URL_MONGODB_ATLAS,
        mongoOptions: {useNewUrlParser: true, useUnifiedTopology: true},
        ttl: 210,
        //collectionName: 'sessions',
    }),
    //secret : 'secret',
    secret: config.SESSION_SECRET,
    //resave: false,
    resave: true,
    //saveUninitialized: false,
    saveUninitialized: true,

    //cookie: {maxAge: 60000}
}))

//await mongoose.connect(config.URL_MONGODB_ATLAS).then(() => console.log("MongoDB conectado"))

//Passport
initializePassport()
app.use(passport.initialize())
app.use(passport.session())

//Rutas
app.use('/session', routerSession,(req, res) =>{
    res.render('sessions/login')
    //res.redirect('api/product')
})
app.use('/user', userRouter /*, (req, res) =>{
    res.render('sessions/register')
}*/) 



app.get('/session', (req, res) =>{
    if(req.session.counter){
        req.session.counter++
        res.send(`Ingresaste ${req.session.counter} veces`)
}else{
    req.session.counter = 1
    res.send(`Hola esta es la primera vez que ingreso`)
} })

app.use('/api/product', productRouter)
app.use('/api/cart', cartRouter)
app.use( '/api/product' ,express.static(__dirname + '/public'))
app.post('/upload', upload.single('product'), (req, res) => {
    console.log(req.body)
    console.log(req.file)
    res.send("imagen subida")
})

app.get("/", (req, res) => {
    res.render('index')
})
app.get("/api/product", (req, res) => {
    res.render('home')})

app.get("/api/errorLogin", (req, res) => {
    res.render('errorLogin')
})

console.log(process.argv)
console.log(config.SECRET_KEY)