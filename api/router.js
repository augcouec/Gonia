const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");
const projectController = require("../controllers/project");

// User routes
router.get("/users/:id", userController.getUser);
router.get("/users", userController.getUsers);
router.post("/users/create", userController.createUser);
router.put("/users/:id", userController.updateUser);
router.delete("/users/:id", userController.deleteUser);

// Project routes
router.get("/projects/:id", projectController.getProject);
router.get("/projects", projectController.getProjects);
router.post("/projects/create", projectController.createProject);
router.put("/projects/:id", projectController.updateProject);
router.delete("/projects/:id", projectController.deleteProject);

module.exports = router;