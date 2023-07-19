import orderManager from "../managers/orders.manager.js";

const ordersManager = new orderManager

export const findAllOrders = async ()=> {
    try{
        const orders = await ordersManager.findAllOrders()
    
        return orders
    }catch(error) {
        return error
    }
}

export const findOneOrderByid = async (id)=> {
    try{
        const order = await ordersManager.findById(id)
        return order
    }catch(error) {
        return error
    }
}

export const createOneOrder = async (obj)=> {
    try{
        
        const newOrder = await ordersManager.createOneOrder(obj)
        return newOrder
    }catch(error) {
        return error
    }
}

export const updateOneOrder = async (id,obj)=> {
    try{
        
        const updateOrder = await ordersManager.updateOneOrder(id,obj)
        return updateOrder
    }catch(error) {
        return error
    }
}

export const deleteOneOrder = async (id)=> {
    try{
        
        const deleteOrder = await ordersManager.deleteOneOrder(id)
        return deleteOrder
    }catch(error) {
        return error
    }
}