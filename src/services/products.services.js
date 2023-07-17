import  productManager  from "../managers/products.manager.js";

const productsManager = new productManager

export const findAllProducts = async ()=> {
    try{
        const products = await productsManager.findAllProducts()
    
        return products
    }catch(error) {
        return error
    }
}

export const findOneProductByid = async (id)=> {
    try{
        const product = await productsManager.findById(id)
        return product
    }catch(error) {
        return error
    }
}

export const createOneProduct = async (obj)=> {
    try{
        
        const newProduct = await productsManager.createOneProduct(obj)
        return newProduct
    }catch(error) {
        return error
    }
}

export const updateOneProduct = async (id,obj)=> {
    try{
        
        const updateProduct = await productsManager.updateOneProduct(id,obj)
        return updateProduct
    }catch(error) {
        return error
    }
}

export const deleteOneProduct = async (id)=> {
    try{
        
        const deleteProduct = await productsManager.deleteOneProduct(id)
        return deleteProduct
    }catch(error) {
        return error
    }
}