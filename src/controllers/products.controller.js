import { findAllProducts, findOneProductByid, createOneProduct, updateOneProduct,deleteOneProduct } from "../services/products.services.js";

export const findAllProd = async (req,res) => {
    try{
        const products = await findAllProducts()
            
           res.render('home', {
                products: products.docs,
                
                user: req.session.user
                
                
               
    
                })
           //res.status(200).json({message: "products found", products})
           //res.send(products)
           
           //console.log(products)
          
           
        
        
        
            
    }catch(error) {
        res.status(500).json({error})
    }
}

export const findOneprod = async (req,res) => {

    const {id} = req.params
    try{
        const user = await findOneProductByid(id)
        if(user) {
            res.status(200).json({message: "product found", product:id})

        }else{
            res.status(400).json({message: "no product"})
        }
    }catch(error) {
        res.status(500).json({error})
    }
}

export const createOneProd = async (req, res) => {
    const { title, description, code, category, price, stock, status, tumbnail } = req.body
    if (!title || !description || !code || !category  || !price|| !stock|| !status || !tumbnail) {
      return res.status(400).json({ message: 'Data missing' })
    }
    try {
      const newProduct = await createOneProduct(req.body)
      res.status(200).json({ message: 'Product created', product: newProduct })
    } catch (error) {
      res.status(500).json({ error })
    }
  }

  export const updateOneProd = async (req,res) => {
    const id = req.params.id
    const {title, description, code, category, price, stock, status, tumbnail} = req.body
    try {
        const updateProd = await updateOneProduct({_id:id},{title, description, code, category, price, stock, status, tumbnail})
        res.status(200).json({ message: 'Product updated', product: updateProd })
        
    } catch(error) {
        res.status(500).json({ error })
    }
}

 export const deleteProd = async (req,res) => {
    const id = req.params.id
    try{
        const deleteOneProd = await deleteOneProduct({_id: id})
        res.status(200).json({ message: 'Product deleted' })
    
    }catch(error){
        res.status(500).json({ error })
    }
    
}
