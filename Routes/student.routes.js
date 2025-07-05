import { Router } from "express";
import { createTalentController } from "../controller/create.controller.js";
import { getListController } from "../controller/getList.controller.js";
import { deleteStudentController } from "../controller/delete.controller.js";
import { updateListController } from "../controller/update.controller.js";

export const studentRoutes = Router();

studentRoutes.post("/create", createTalentController);
studentRoutes.get("/list", getListController);
studentRoutes.put("/update/:id", updateListController);
studentRoutes.delete("/delete/:id",deleteStudentController);