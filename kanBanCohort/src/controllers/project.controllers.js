import { ApiError } from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js";
import { User } from "../models/user.models.js";
import { Project } from "../models/project.models.js";
import { UserRolesEnum } from "../utils/constants.js";
import { asyncHandler } from "../utils/async-handler.js";

const getProjects = async (req, res) => {
  // const projects = await Project.find();
  // return res
  //   .status(200)
  //   .json(new ApiResponse(200, projects, "All projects fetched successfully."));

  const userId = req.user;
  console.log("usre id : ", userId);

  const projects = await Project.find({
    createdBy: userId._id,
  });

  return res
    .status(200)
    .json(
      new ApiResponse(200, projects, "User projects fetched successfully.")
    );
};

const getProjectById = asyncHandler(async (req, res) => {
  // get project by id
  const id = req.params;
  console.log("ID: ", id.id);
  const project = await Project.findById({ _id: id.id });
  if (!project) {
    throw new ApiError(401, "Invalid id.");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, project, "Project found from id."));
});

const createProject = asyncHandler(async (req, res) => {
  // create project
  const user_data = req.user;
  console.log("UserData: ", user_data);

  if (!user_data) {
    throw new ApiError(401, "User data AccessToken not found.");
  }
  const user = await User.findById({ _id: user_data._id });
  console.log("User: ", user);
  if (!user) {
    throw new ApiError(403, "User not found. ");
  }

  console.log("RANDOM");
  const { name, description } = req.body;
  console.log("USER");

  const existedTaskName = await Project.findOne({ name });

  if (existedTaskName) {
    throw new ApiError(500, "❌Task Name already exists.❌");
  }
  const project = await Project.create({
    name,
    description: description || "",
    createdBy: user._id,
    members: [
      {
        user: user._id,
        role: UserRolesEnum.PROJECT_ADMIN,
      },
    ],
  });

  return res
    .status(200)
    .json(new ApiResponse(201, project, "Create Project controller success."));
});

const updateProject = asyncHandler(async (req, res) => {
  // update project
  const user_data = req.user;
  console.log("UserData: ", user_data);

  if (!user_data) {
    throw new ApiError(401, "User data AccessToken not found.");
  }
  const user = await User.findById({ _id: user_data._id });
  console.log("User: ", user);
  if (!user) {
    throw new ApiError(403, "User not found. ");
  }

  const { projectId } = req.params;

  console.log("Project id: ", projectId);

  const project = await Project.findById(projectId);
  console.log("Project: ", project);

  const { name, description } = req.body;

  if (!name && !description) {
    throw new ApiError(500, "at least one is required");
  }

  let isAdmin = false;

  project.members.some((m) => {
    console.log(m.user === user._id);
    if (m.user.toString() === user._id.toString()) {
      if (m.role == "project_admin") {
        isAdmin = true;
      }
    }
  });

  if (!isAdmin) {
    throw new ApiError(500, "You are not admin.");
  }

  if (name) {
    project.name = name;
  }
  if (description) {
    project.description = description;
  }
  return res
    .status(200)
    .json(new ApiResponse(200, project, "Project updated successfully."));
});

const deleteProject = async (req, res) => {
  const user_data = req.user;
  console.log("UserData: ", user_data);

  if (!user_data) {
    throw new ApiError(401, "User data AccessToken not found.");
  }
  const user = await User.findById({ _id: user_data._id });
  console.log("User: ", user);
  if (!user) {
    throw new ApiError(403, "User not found. ");
  }

  const { projectId } = req.params;

  console.log("Project id: ", projectId);

  const project = await Project.findById(projectId);

  if (!project) {
    throw new ApiError(404, "Project not found. ");
  }

  let isAdmin = false;

  // if true isAdmin is True

  isAdmin = project.members.some(
    (m) =>
      m.user.toString() === user._id.toString() && m.role == "project_admin"
  );

  if (!isAdmin) {
    throw new ApiError(500, "You are not admin.");
  }

  const isDeleted = await project.deleteOne();
  if (!isDeleted) {
    throw new ApiError(500, "You are not admin.");
  }
  return res.status(200).json(new ApiResponse(200, null, "DELETEEEEEEEEEED"));
};

const getProjectMembers = asyncHandler(async (req, res) => {
  // get project members
  const user_data = req.user;
  console.log("UserData: ", user_data);

  if (!user_data) {
    throw new ApiError(401, "User data AccessToken not found.");
  }
  const user = await User.findById({ _id: user_data._id });
  console.log("User: ", user);
  if (!user) {
    throw new ApiError(403, "User not found. ");
  }

  const { projectId } = req.params;
  console.log("PROJECT_ID: ", projectId);
  const project = await Project.findById(projectId);

  console.log("PROJECT", project);

  if (!project) {
    throw new ApiError(403, "Project not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, project.members, "Members fetched"));
});

const addMemberToProject = async (req, res) => {
  // add member to project

  const user_data = req.user;
  console.log("UserData: ", user_data);

  if (!user_data) {
    throw new ApiError(401, "User data AccessToken not found.");
  }
  const user = await User.findById({ _id: user_data._id });
  console.log("User: ", user);
  if (!user) {
    throw new ApiError(403, "User not found. ");
  }
  const { projectId } = req.params;
  const project = await Project.findById(projectId);

  if (!project) {
    throw new ApiError(404, "Project not found. ");
  }

  let isAdmin = false;

  // if true isAdmin is True

  isAdmin = project.members.some(
    (m) =>
      m.user.toString() === user._id.toString() && m.role == "project_admin"
  );

  if (!isAdmin) {
    throw new ApiError(500, "You are not admin.");
  }
  const { memberName } = req.body;
  if (!memberName) {
    throw new ApiError(500, "Member bot found.");
  }
  const new_user = await User.findById(memberName);
  if (!new_user) {
    throw new ApiError(500, "Member bot found.");
  }
  project.members.push({ user: new_user._id, role: UserRolesEnum.MEMBER });
  await project.save();
  // console.log("NEW USER: ", new_user);

  return res
    .status(200)
    .json(new ApiResponse(200, project, "addition complete"));
};

const deleteMember = asyncHandler(async (req, res) => {
  // delete member from project
  const user_data = req.user;
  console.log("UserData: ", user_data);

  if (!user_data) {
    throw new ApiError(401, "User data AccessToken not found.");
  }
  const user = await User.findById({ _id: user_data._id });
  console.log("User: ", user);
  if (!user) {
    throw new ApiError(403, "User not found. ");
  }
  const { projectId } = req.params;
  const project = await Project.findById(projectId);

  if (!project) {
    throw new ApiError(404, "Project not found. ");
  }

  let isAdmin = false;

  // if true isAdmin is True

  isAdmin = project.members.some(
    (m) =>
      m.user.toString() === user._id.toString() && m.role == "project_admin"
  );

  if (!isAdmin) {
    throw new ApiError(500, "You are not admin.");
  }
  const { memberName } = req.body;
  if (!memberName) {
    throw new ApiError(500, "Can't keep name field empty.");
  }

  console.log("MEMBERS: ", memberName);
  project.members.forEach((m) => {
    if (m.user.toString() === memberName) {
      project.members.splice(project.members.indexOf(m), 1);
    }
  });
  await project.save();

  console.log("-----after delete", project.members);
  return res.status(200).json(new ApiResponse(200, project, "Member deleted"));
});

const updateMemberRole = asyncHandler(async (req, res) => {
  // update member role
  const user_data = req.user;

  console.log("UserData: ", user_data);

  if (!user_data) {
    throw new ApiError(401, "User data AccessToken not found.");
  }
  const user = await User.findById({ _id: user_data._id });
  console.log("User: ", user);
  if (!user) {
    throw new ApiError(403, "User not found. ");
  }
  const { projectId } = req.params;
  const project = await Project.findById(projectId);

  if (!project) {
    throw new ApiError(404, "Project not found. ");
  }

  let isAdmin = false;

  // if true isAdmin is True

  isAdmin = project.members.some(
    (m) =>
      m.user.toString() === user._id.toString() && m.role == "project_admin"
  );

  if (!isAdmin) {
    throw new ApiError(500, "You are not admin.");
  }
  const { memberName, role } = req.body;
  if (!memberName) {
    throw new ApiError(500, "Can't keep name field empty.");
  }

  console.log("MEMBERS: ", memberName);
  project.members.forEach((m) => {
    if (m.user.toString() === memberName) {
      m.role = role;
    }
  });
  await project.save();

  console.log("-----after delete", project.members);
  return res.status(200).json(new ApiResponse(200, project, "Member deleted"));
});

export {
  addMemberToProject,
  createProject,
  deleteMember,
  deleteProject,
  getProjectById,
  getProjectMembers,
  getProjects,
  updateMemberRole,
  updateProject,
};
