import { Router } from "express";
import { transporter } from "../utils/nodemailer.js";

const router = Router()


router.get('/', async(req,res) =>{

    try{
        await transporter.sendMail({
            to: 'bandi_alejandro@yahoo.com.ar',
            subject:'PRIMER CORREO CODERHOUSE',
            text:'probando primer email'
        })
        res.status(200).send('Mail sent')
    }catch(error) {
        res.status(200).json({message : error})
    }
    
})
export default router