import mongoose from "mongoose"

const orderSchema = new mongoose.Schema({
   userId: {
     type: mongoose.Schema.Types.ObjectId,
     ref: "User",
   },
  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Store",
        
      },
      quantity: {
        type: Number,
        required: true,
        default: 1
      }
    }
  ],
 address: [
    {
      state: {
        type: String,
        required: true
      },
      city: {
        type: String,
        required: true
      },
      street: {
        type: String,
        required: true
      },
      pincode: {
        type: Number,
        required: true
      }
    }
  ],
  status: {
    type: String,
    default: "pending"
  },
  ziina_id: {
    type: String,
    default: ""
  }
})

export default mongoose.model("Order", orderSchema)