import Talent from "../db/students.schema.js";

export const updateListController = async (req, res) => {
   try {
    const { id } = req.params;
    const { name, class: studentClass, talent } = req.body;

    const updatedStudent = await Talent.findByIdAndUpdate(
      id,
      { name, class: studentClass, talent },
      { new: true } 
    );

    if (!updatedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json({ message: "Student updated successfully", student: updatedStudent });
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }

}