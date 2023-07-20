import {Schema, model} from "mongoose";
import paginate from "mongoose-paginate-v2";

const ordersSchema = new Schema({
 /* order_number: {
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
})*/

code: { type: String, unique: true, require: true },
pucharse_datetime: { type: Date, default: Date.now },
amount: { type: Number, require: true },
purchaser: { type: String, require: true }
})

export const orderModel = model('orders', ordersSchema)