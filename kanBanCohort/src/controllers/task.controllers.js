import { Project } from "../models/project.models.js";
import { Task } from "../models/task.models.js";
import { User } from "../models/user.models.js";
import { ApiResponse } from "../utils/api-response.js";
import { asyncHandler } from "../utils/async-handler.js";
import { ApiError } from "../utils/api-error.js";

// get all tasks
const getTasks = async (req, res) => {
  // get all tasks
};

// get task by id
const getTaskById = asyncHandler(async (req, res) => {
  // get task by id
});

// create task
const createTask = asyncHandler(async (req, res) => {
  // create task

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

  const { title, description } = req.body;

  // if (!taskName) {
  //   throw new ApiError(500, "at least one is required");
  // }
  // 68a9b73b2a6b1c2a38522cda
  console.log("User id: ", user._id);
  let isAdmin = false;
  project.members.some((m) => {
    console.log("m.user: ", m.user);
    console.log(user._id.toString() === m.user.toString());
    if (m.user.toString() === user._id.toString()) {
      if (m.role == "project_admin") {
        isAdmin = true;
      }
    }
  });

  if (!isAdmin) {
    throw new ApiError(500, "You are not admin.");
  }

  const task = await Task.create({
    title,
    description,
    project: project._id,
    assignedTo: [user._id],
    assignedBy: user._id,
  });

  await task.save();

  return res
    .status(200)
    .json(new ApiResponse(200, task, "This is it. Task created."));
});

// update task
const updateTask = async (req, res) => {
  // update task
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

  const project = await Project.findById({ _id: projectId });
  console.log("Project: ", project);

  const { taskId } = req.params;
  console.log("TASKID: ", taskId);
  if (!taskId) {
    throw new ApiError(403, "Task not found.");
  }
  const task = await Task.findById({ _id: taskId });

  if (!task) {
    console.log("TASK: ", task);
    throw new ApiError(400, "Task not found.");
  }

  const { title, description } = req.body;
  if (!title || !description) {
    throw new ApiError(403, "Title and Description both can not be empty.");
  }

  if (title) {
    task.title = title;
  }
  if (!description) {
    task.description = description;
  }

  await task.save();

  return res.status(200).json(new ApiResponse(200, task, "Task got Updated"));
};

// delete task
const deleteTask = async (req, res) => {
  // delete
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

  const project = await Project.findById({ _id: projectId });
  console.log("Project: ", project);

  const { taskId } = req.params;
  console.log("TASKID: ", taskId);
  if (!taskId) {
    throw new ApiError(403, "Task not found.");
  }
  const task = await Task.findById({ _id: taskId });

  if (!task) {
    console.log("TASK: ", task);
    throw new ApiError(400, "Task not found.");
  }

  let isAdmin = false;
  project.members.some((m) => {
    console.log("m.user: ", m.user);
    console.log(user._id.toString() === m.user.toString());
    if (m.user.toString() === user._id.toString()) {
      if (m.role == "project_admin") {
        isAdmin = true;
      }
    }
  });
  console.log("Check------------1", isAdmin);
  console.log("Check------------1");
  if (!isAdmin) {
    throw new ApiError(500, "You are not admin.");
  }
  console.log("Check------------2");
  console.log("TASKKK-----------", task._id.toString());
  await task.deleteOne({ _id: task._id.toString() });
  // if (!isDeleted) {
  //   throw new ApiError(500, "You are not admin.");
  // }
  // await task.save();

  return res
    .status(200)
    .json(new ApiResponse(200, "This is it. Task deleted."));
};

// create subtask
const createSubTask = async (req, res) => {
  // create subtask
};

// update subtask
const updateSubTask = async (req, res) => {
  // update subtask
};

// delete subtask
const deleteSubTask = async (req, res) => {
  // delete subtask
};

export {
  createSubTask,
  createTask,
  deleteSubTask,
  deleteTask,
  getTaskById,
  getTasks,
  updateSubTask,
  updateTask,
};
