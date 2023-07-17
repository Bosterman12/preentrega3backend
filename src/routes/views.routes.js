import { Router } from "express";

const router = Router()

router.get('/',(req,res)=>{
    res.render('index')
})

router.get('/product',(req,res)=>{
    res.render('home')
})

router.get('/cart',(req,res)=>{
    res.render('product')
})

router.get('/session/login',(req,res)=>{
    res.render('sessions/login')
})

router.get('/user/register',(req,res)=>{
    res.render('sessions/register')
})

router.get('/api/errorlogin',(req,res) =>{
    res.render('errorLogin')
} )

export default router

