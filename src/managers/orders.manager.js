import { orderModel } from "../models/Orders.js"


export default class orderManager {

    async findAllOrders(){
        try{
            
            const orders = await orderModel.find()
            console.log(orders)
            return orders
        }catch(error) {
            return (error)
        }
    }

    async findOneOrderByid(id){
        try{
            const order = await orderModel.findById(id)
            return order
    
        }catch(error) {
            return (error)
        }
    }

    async createOneOrder(obj){
        try{
            const newOrder = await orderModel.create(obj)
            return newOrder
    
        }catch(error) {
            return (error)
        }
    }

    async updateOneOrder(id,obj){
        try{
            const updateOrder = await orderModel.updateOne({_id:id},{$set:obj})
            return updateOrder
    
        }catch(error) {
            return (error)
        }
    }

    async deleteOneOrder(id){
        try{
            const deleteOrder = await orderModel.deleteOne({_id:id})
            return deleteOrder
    
        }catch(error) {
            return (error)
        }
    }
    
}