import Talent from "../db/students.schema.js";

export const getListController = async (req, res) => {
    try{
        const students = await Talent.find()
        res.status(200).json({students});
    }
    catch(error){
        console.error("fetch error: ", error);
        res.status(500).json({message:"server errorrrrrr..."})
    }
}