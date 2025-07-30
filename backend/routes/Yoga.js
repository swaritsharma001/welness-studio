import express from "express";
import Instructor from "../models/Instructor.js";
import { verifyToken, verifyAdmin } from "../jwt.js";
import BookSession from "../models/BookSession.js"
import axios from "axios"

const router = express.Router()

router.post("/instructor/add", verifyAdmin, async (req, res) => {
  try {
    const { name, price, description, image, rating } = req.body || {};
    if (!name || !price || !description || !image || !rating) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const data = new Instructor({ name, price, description, image, rating });
    const saved = await data.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

router.get("/instructor", async (req, res) => {
  try {
    const instructors = await Instructor.find();
    res.status(200).json(instructors);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch instructors" });
  }
});

router.delete("/instructor/:id", verifyAdmin, async (req, res) => {
  try {
    const deleted = await Instructor.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Not found" });
    res.status(200).json({ message: "Instructor deleted" });
  } catch (err) {
    res.status(500).json({ message: "Deletion failed" });
  }
});

router.post("/book", verifyToken, async (req, res) => {
  try {
    const { instructorId, date, time, mobile} = req.body || {};
    if (!instructorId || !date || !time) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const data = new BookSession({
      userId: req.user.id,
      instructorId,
      date,
      time,
      mobile
    });

    const amoun = await Instructor.findById(instructorId)
    const amount = amoun.price
    const tax = Math.round(amount * 0.08)
    const finalAmount = amount + tax

    const response = await axios.post(
      "https://api-v2.ziina.com/api/payment_intent",
      {
        amount: finalAmount * 100,
        currency_code: "AED",
        message: "Session payment",
        success_url: "https://www.dubaifitmovement.xyz/",
        cancel_url: "https://www.dubaifitmovement.xyz/",
        failure_url: "https://www.dubaifitmovement.xyz/",
        test: true,
        transaction_source: "directApi",
        customer: {
          email: req.user.email || "default@email.com"
        },
        metadata: {
          order_id: data._id,
          user_id: req.user.id
        }
      },
      {
        headers: {
          Authorization: `Bearer 7kwu51197gFeeztgA2r8gX1YZmGINOXi2+W/2JKfXuh3jK1FyPBaMZy7NWd4LJJY`,
          "Content-Type": "application/json",
        },
    }      );
    data.ziina_id = response.data.id
    const saved = await data.save();
    const pay = response.data.redirect_url
    console.log(pay)
    res.status(201).json(pay);
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: "Something went wrong" });
  }
});

async function getIsPaymentDn(id){
  const res = await axios.get(`https://api-v2.ziina.com/api/payment_intent/${id}`, {
    headers: {
      Authorization: `Bearer 7kwu51197gFeeztgA2r8gX1YZmGINOXi2+W/2JKfXuh3jK1FyPBaMZy7NWd4LJJY`
    }
  })
  
  if(res.data.status === "completed"){
    return true
  }
  return false
}

router.get("/book", verifyToken, async (req, res) => {
  try {
    const sessions = await BookSession.find()
      .populate("userId", "name")
      .populate("instructorId", "name");

    for (let s of sessions) {
      if (s.ziina_id) {
        const isDn = await getIsPaymentDn(s.ziina_id);
        s.status = isDn ? "confirmed" : "pending";
        await s.save(); // Save the individual session
      }
    }

    res.status(200).json(sessions);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to fetch sessions" });
  }
});

router.delete("/book/:id", verifyToken, async (req, res) => {
  try {
    const deleted = await BookSession.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Not found" });
    res.status(200).json({ message: "Session deleted" });
  } catch (err) {
    res.status(500).json({ message: "Deletion failed" });
  }
});

router.patch("/book/status/:id", verifyToken, async (req, res) => {
  try {
    const { status } = req.body || {};
    if (!["pending", "confirmed", "cancelled", "completed"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }
    const updated = await BookSession.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "Not found" });
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: "Update failed" });
  }
});

router.get("/allBookedInstrector", async (req, res)=>{
  try {
    const data = await BookSession.find().populate("instructorId").populate("userId")
    //check if instructor id is null then remove it from booking
    data.forEach(async (item) => {
      if(item.instructorId === null){
        await BookSession.findByIdAndDelete(item._id)
        
      }
      if(item.userId === null){
        await BookSession.findByIdAndDelete(item._id)
      }
    })
    
    
    res.status(200).json(data)
  } catch (error) {
    console.log(error)
  }
})

router.post("/updateStatusIns", async (req, res) =>{
  try {
    const {id, status} = req.body
    const data = await BookSession.findByIdAndUpdate(id, {status}, {new: true})
    res.status(200).json(data)
  } catch (error) {
    res.status(500).json({message: "Something went wrong"})
  }
})
export default router;