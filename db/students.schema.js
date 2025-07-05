import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
    name:{ type: String, required: true},
    class:{type: Number, required:true},
    talent:{type: String, required: true}
})

const Talent = mongoose.model("Talent", studentSchema);
export default Talent;