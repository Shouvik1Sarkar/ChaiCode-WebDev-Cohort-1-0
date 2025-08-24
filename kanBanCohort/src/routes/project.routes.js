import { Router } from "express";
import { validateToken } from "../middlewares/tokenValidators.middlewares.js";
import {
  addMemberToProject,
  createProject,
  deleteProject,
  getProjectById,
  getProjectMembers,
  getProjects,
  updateProject,
} from "../controllers/project.controllers.js";

const router = Router();

router.route("/createproject").post(validateToken, createProject);
router.route("/getproject/:id").get(getProjectById);
router.route("/getProjects").get(validateToken, getProjects);
router.route("/updateProject/:projectId").get(validateToken, updateProject);
router.route("/deleteProject/:projectId").get(validateToken, deleteProject);
router
  .route("/getProjectMembers/:projectId")
  .get(validateToken, getProjectMembers);
router
  .route("/addMemberToProject/:projectId")
  .get(validateToken, addMemberToProject);

export default router;
