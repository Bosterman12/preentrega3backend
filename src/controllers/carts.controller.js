import { findAllCarts, findOneCartByid, createOneCart, updateOneCart, deleteOneCart } from "../services/carts.services.js";

export const findCarts = async (req,res) => {
    try{
        const carts = await findAllCarts()
        if(carts) {
            
            res.status(200).json({message: "carts found", carts})
           
           
        }else{
            res.status(200).json({message: "no carts"})
        }
    }catch(error) {
        res.status(500).json({error})
    }
}

export const findOneCart = async (req,res) => {

    const id = req.params.cid
    try{
        const cart = await findOneCartByid(id)
        if(cart) {
            res.status(200).json({message: "cart found", cart:id})

        }else{
            res.status(400).json({message: "no cart"})
        }
    }catch(error) {
        res.status(500).json({error})
    }
}

export const createCart = async (req, res) => {
    const cart = await createOneCart({})
    res.send("carrito creado")
  }

  export const updateCart = async (req,res) => {
    const cid = req.params.cid
    const pid = req.params.pid
    const { quantity } = req.body

    const cart = await findOneCartByid({_id: cid})
    
        try {
         
          const addProductCart = {
            id_prod: pid,
            cant: quantity
          }
          cart.products.push(addProductCart)
          await updateOneCart({_id: cid}, cart)
        } catch (err) {
          console.log(err)
        }
        res.send('Producto agregdo al carrito')
      
  }

 export const deleteCart= async (req,res) => {
    const cid = req.params.cid
    const pid = req.params.pid
    const cart = await findOneCartByid({_id: cid})
    try{

        const productfind = cart.products
        const productToDelete  = productfind.findIndex((prod) => prod.id_prod == pid)

        productfind.splice(productToDelete, 1)

        await updateOneCart({_id : cid}, {products: productfind})
       // const deleteOneProd = await deleteOneCart({_id: id})
        res.status(200).json({ message: 'Product deleted' })
    
    }catch(error){
        res.status(500).json({ error })
    }
    
}
