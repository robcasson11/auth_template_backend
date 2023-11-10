const express = require("express");
const router = express.Router();
const usersController = require("../../controllers/usersController");
//const verifyJWT = require("../../middleware/verifyJWT")

router
  .route("/")
  .get(usersController.getAllUsers)
  //To protect a single rout, require the funtion above and use in the request like example bellow
  //.get(verifyJWTusersController.getAllUsers)
  .post(usersController.createNewUser)
  .put(usersController.updateUser)
  .delete(usersController.deleteUser);

router.route("/:id").get(usersController.getUser);

module.exports = router;
