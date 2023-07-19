import { cartModel } from "../models/Cart.js";

export default class cartManager {

    async findAllCarts(){
        try{
            const carts = await cartModel.find()
           console.log(carts)
            return carts
    
        }catch(error) {
            return (error)
        }
    }

    async findOneCartByid(id){
        try{
            const cart = await cartModel.findOne(id)
            return cart
    
        }catch(error) {
            return (error)
        }
    }

    async createOneCart(obj){
        try{
            const newCart = await cartModel.create(obj)
            return newCart
            
        }catch(error) {
            return (error)
        }
    }

    async updateOneCart(id,obj){
        try{
            const updateCart = await cartModel.updateOne({_id:id},{$set:obj})
            return updateCart
    
        }catch(error) {
            return (error)
        }
    }

    async deleteOneCart(id){
        try{
            const deleteCart = await cartModel.deleteOne({_id:id})
            return deleteCart
    
        }catch(error) {
            return (error)
        }
    }
    
}