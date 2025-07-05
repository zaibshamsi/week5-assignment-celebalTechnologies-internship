import express from "express";
import mongoose from "mongoose";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { studentRoutes } from "./Routes/student.routes.js";
import dotenv from "dotenv";
dotenv.config(); 

const app = express();

const mongoURI = process.env.MONGO_URI;
const port = process.env.PORT;

const _filename = fileURLToPath(import.meta.url);
const _dirName = path.dirname(_filename)

app.use(express.static(path.join(_dirName, "public")))
app.use(express.json());

app.get("/", (req,res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
})
app.use("/student", studentRoutes);

mongoose.connect(mongoURI, {
}).then(() => {
    console.log("connnected to mongo db")
    app.listen(port, () => {
        console.log("Server is listening on port 3000")
    })
})

.catch((error) => {
console.log("error in connecting to mongo db" , error);
})