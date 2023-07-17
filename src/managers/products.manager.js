import { productModel } from "../models/Products.js";

export default class productManager {

    async findAllProducts(){
        try{
            //const products = await productModel.find()
           //console.log(products)
            //return products
            const options = {
                page: 1,
                limit: 5,
                sort: {price: -1}
            }
            const products = await productModel.paginate({category: "fiambre"}, options)
            return products
        }catch(error) {
            return (error)
        }
    }

    async findOneProductByid(id){
        try{
            const product = await productModel.findById(id)
            return product
    
        }catch(error) {
            return (error)
        }
    }

    async createOneProduct(obj){
        try{
            const newProduct = await productModel.create(obj)
            return newProduct
    
        }catch(error) {
            return (error)
        }
    }

    async updateOneProduct(id,obj){
        try{
            const updateProduct = await productModel.updateOne({_id:id},{$set:obj})
            return updateProduct
    
        }catch(error) {
            return (error)
        }
    }

    async deleteOneProduct(id){
        try{
            const deleteProduct = await productModel.deleteOne({_id:id})
            return deleteProduct
    
        }catch(error) {
            return (error)
        }
    }
    
}