import { userModel } from "../models/Users.js";


export default class userManager {

    async findAll(){
        try{
            const users = await userModel.find()
           
            return users
    
        }catch(error) {
            return (error)
        }
    }

    async findOneByid(id){
        try{
            const user = await userModel.findById(id)
            return user
    
        }catch(error) {
            return (error)
        }
    }

    async createOne(obj){
        try{
            const newUuser = await userModel.create(obj)
            return newUuser
    
        }catch(error) {
            return (error)
        }
    }

    async updateOne(id,obj){
        try{
            const updateUuser = await userModel.updateOne({_id:id},{$set:obj})
            return updateUuser
    
        }catch(error) {
            return (error)
        }
    }

    async deleteOne(id){
        try{
            const deleteUuser = await userModel.deleteOne({_id:id})
            return deleteUuser
    
        }catch(error) {
            return (error)
        }
    }
    
}
