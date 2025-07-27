import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  instructorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Instructor"
  },
  date: {
    type: Date,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ["pending", "confirmed", "cancelled", "completed"],
    default: "pending"
  },
  ziina_id: {
    type: String,
    required: true
  },
  mobile: {
    type: String
  }
})

export default mongoose.model("BookSession", bookSchema)