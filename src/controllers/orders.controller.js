import { findAllOrders, findOneOrderByid, createOneOrder, updateOneOrder, deleteOneOrder } from "../services/orders.services.js"

export const findAllOrder = async (req,res) => {
    try{
        const orders = await findAllOrders()
            
           res.status(200).json({message: "orders found", orders})
        
           
           console.log(orders)
          
           
        
        
        
            
    }catch(error) {
        res.status(500).json({error})
    }
}

export const findOneorder = async (req,res) => {

    const {id} = req.params
    try{
        const order = await findOneOrderByid(id)
        if(order) {
            res.status(200).json({message: "order found", order:id})

        }else{
            res.status(400).json({message: "no product"})
        }
    }catch(error) {
        res.status(500).json({error})
    }
}

/*export const createOrder = async (req, res) => {
    const order = await createOneOrder({} )
    res.send("orden creada")
    
  }*/

 export const createOrder= async (req, res) => {
    
    const { code, amount, purchaser } = req.body
    if (!code || !amount || !purchaser) {
        return res.status(400).json({ message: 'Data missing' })
      }
    try {
      const newOrder = await createOneOrder(req.body)
      res.status(200).json({ message: 'Order created', order: newOrder })
    } catch (error) {
      res.status(500).json({ error })
    }
  }

  export const updateOrder = async (req,res) => {
    const id = req.params.id
    const {order_nunber, cart, user, products, price} = req.body
    try {
        const updateOrder = await updateOneOrder({_id:id},{order_nunber, cart, user, products, price})
        res.status(200).json({ message: 'order updated', order: updateOrder })
        
    } catch(error) {
        res.status(500).json({ error })
    }
}

 export const deleteOrder = async (req,res) => {
    const id = req.params.id
    try{
        const deleteOneOrd = await deleteOneOrder({_id: id})
        res.status(200).json({ message: 'Order deleted' })
    
    }catch(error){
        res.status(500).json({ error })
    }
    
}
