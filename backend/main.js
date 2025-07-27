import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import UsersRouter from "./routes/Users.js";
import StoreRouter from "./routes/Store.js";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import axios from "axios"
import YogaRouter from "./routes/Yoga.js"

const app = express();

// ✅ CORS MUST BE FIRST
app.use(cors({
  origin: "https://30b331c5-e74d-42f4-b47d-181d7e278fa2-00-w1kjwxdjeqni.pike.replit.dev:8080",
  credentials: true
}));

app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.json());

async function connect() {
  await mongoose.connect("mongodb+srv://thegangstaguy001:NuLcOmlDKV6UGNoi@cluster0.nh1ewxi.mongodb.net/MaheshsharmaBlogsss?retryWrites=true&w=majority");
}
connect();

app.use("/api/users", UsersRouter);
app.use("/api/store", StoreRouter);
app.use("/api/yoga", YogaRouter)
app.get("/api", (req, res) => {
  res.json({ message: "Working!" });
});



app.listen(3000, () => {
  console.log("Server running on port 3000");
});
