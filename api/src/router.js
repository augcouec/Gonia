const express = require("express");
const router = express.Router();
const passport = require("./services/passport");
const userController = require("./controllers/user");
const projectController = require("./controllers/project");
const authenticationController = require("./controllers/authentication");

// User routes
router.get("/users/count", userController.getUsersCount);
router.get("/users/:id", userController.getUser);
router.get("/users", userController.getUsers);
router.post("/users/create", userController.createUser);
router.put("/users/:id", userController.updateUser);
router.delete("/users/:id", userController.deleteUser);

// Project routes
router.get("/projects/count", projectController.getProjectsCount);
router.get("/projects/:id", projectController.getProject);
router.get("/projects", projectController.getProjects);
router.post("/projects/create", projectController.createProject);
router.put("/projects/:id", projectController.updateProject);
router.delete("/projects/:id", projectController.deleteProject);

// Authentication
router.post(
  "/signin",
  passport.authenticate("local"),
  authenticationController.signin
);

module.exports = router;
