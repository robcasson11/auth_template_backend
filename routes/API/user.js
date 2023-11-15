const express = require("express");
const router = express.Router();
const usersControllers = require("../../controllers/usersController");
const verifyRoles = require("../../middleware/verifyRoles");
const ROLES_LIST = require("../../config/roles_list");

router
  .route("/")
  .get(usersControllers.getAllUsers)
  .post(verifyRoles(ROLES_LIST.admin), usersControllers.handleNewUser)
  .put(verifyRoles(ROLES_LIST.admin), usersControllers.updateUser)
  .delete(verifyRoles(ROLES_LIST.admin), usersControllers.deleteUser);

router.route("/:id").get(usersControllers.getUser);

module.exports = router;
