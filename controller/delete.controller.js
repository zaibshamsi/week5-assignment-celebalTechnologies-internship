import Talent from "../db/students.schema.js";

export const deleteStudentController = async (req, res) => {
    try {
        const { id } = req.params;

        const deleted = await Talent.findByIdAndDelete(id);

        if (!deleted) {
            return res.status(404).json({ message: "student not found ooopsss" });
        }

        res.status(200).json({ message: "user deleted successfully" })
    } catch (error) {
        console.error("Delete error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
} 