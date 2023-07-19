import {Schema, model} from "mongoose";
import paginate from "mongoose-paginate-v2";

const ordersSchema = new Schema({
  order_number: {
    type: Number,
    required: true,
  },
  cart: {
    type : String,
    required: true
    //type: mongoose.SchemaTypes.ObjectId,
    //ref: 'cart',
  },
  user: {
    type : String,
    required: true
    //type: mongoose.SchemaTypes.ObjectId,
    //ref: 'users',
  },
  products: {
    type: String,
    required: true
    //type: mongoose.SchemaTypes.ObjectId,
     // ref: 'products',
  },
  price: {
    type: Number,
    required: true,
  },
})

export const orderModel = model('orders', ordersSchema)