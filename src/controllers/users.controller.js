/*export const createUser = (req, res) => {
    res.send({ status : 'success', message: 'Usuario creado'})
}*/

import { findAll, findOne, createOne } from "../services/users.services.js";

export const findAllUsers = async (req,res) => {
    try{
        const users = await findAll()
        if(users) {
            res.status(200).json({message: "users found", users})

        }else{
            res.status(200).json({message: "no users"})
        }
    }catch(error) {
        res.status(500).json({error})
    }
}

export const findOneUser = async (req,res) => {

    const {id} = req.params
    try{
        const user = await findOne(id)
        if(user) {
            res.status(200).json({message: "user found", user:id})

        }else{
            res.status(400).json({message: "no user"})
        }
    }catch(error) {
        res.status(500).json({error})
    }
}

export const createOneUser = async (req, res) => {
    const { first_name, last_name, email, gender, password } = req.body
    if (!first_name || !last_name || !email || !gender || !password) {
      return res.status(400).json({ message: 'Data missing' })
    }
    try {
      const newUser = await createOne(req.body)
      res.status(200).json({ message: 'User create', user: newUser })
    } catch (error) {
      res.status(500).json({ error })
    }
  }