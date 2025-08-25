import { Router } from "express";
import { validateToken } from "../middlewares/tokenValidators.middlewares.js";
import {
  createTask,
  deleteTask,
  updateTask,
} from "../controllers/task.controllers.js";

const router = Router({ mergeParams: true });

router.route("/createtask").post(validateToken, createTask);
router.route("/updateTask/:taskId").post(validateToken, updateTask);
router.route("/deleteTask/:taskId").get(validateToken, deleteTask);

export default router;
