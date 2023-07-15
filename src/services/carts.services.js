import cartManager from "../managers/carts.manager.js";

const cartsManager = new cartManager

export const findAllCarts = async ()=> {
    try{
        const carts = await cartsManager.findAllCarts()
        return carts
    }catch(error) {
        return error
    }
}

export const findOneCartByid = async (id)=> {
    try{
        const cart = await cartsManager.findOneCartByid(id)
        return cart
    }catch(error) {
        return error
    }
}

export const createOneCart = async (obj)=> {
    try{
        
        const newCart = await cartsManager.createOneCart(obj)
        return newCart
    }catch(error) {
        return error
    }
}

export const updateOneCart = async (id,obj)=> {
    try{
        
        const updateCart = await cartsManager.updateOneCart(id,obj)
        return updateCart
    }catch(error) {
        return error
    }
}

export const deleteOneCart = async (id)=> {
    try{
        
        const deleteCart = await cartsManager.deleteOneCart(id)
        return deleteCart
    }catch(error) {
        return error
    }
}