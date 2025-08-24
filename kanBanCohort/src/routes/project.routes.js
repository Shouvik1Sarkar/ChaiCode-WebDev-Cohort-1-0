import { Router } from "express";
import { validateToken } from "../middlewares/tokenValidators.middlewares.js";
import {
  addMemberToProject,
  createProject,
  deleteMember,
  deleteProject,
  getProjectById,
  getProjectMembers,
  getProjects,
  updateMemberRole,
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
router.route("/deleteMember/:projectId").post(validateToken, deleteMember);
router
  .route("/updateMemberRole/:projectId")
  .post(validateToken, updateMemberRole);

export default router;
