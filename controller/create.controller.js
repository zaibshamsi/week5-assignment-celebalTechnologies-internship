import Talent from "../db/students.schema.js";

export const createTalentController = async (req, res) => {
  try {
    console.log("Received data:", req.body);

    const student = new Talent(req.body);
    
    const {name , class:studentClass, talent} = req.body;

    const existingStudent = await Talent.findOne({
        name,
        class: studentClass,
        talent
    })
    if(existingStudent) {
        return res.status(409).json({message:"student already exist"})
    }
    await student.save();

 
    return res.status(200).json({ message: "Talent saved", student });
  } catch (error) {
    console.error("Backend error:", error);


    return res.status(500).json({ 
      message: "Server error occurred",
      error: error.message 
    });
  }
};
 