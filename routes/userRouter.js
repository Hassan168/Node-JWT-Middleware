const router = require("express").Router();
const middleware = require("../middleware");

const userController = require("../controllers/userController");

router.post("/createUser", userController.createUser);
router.get(
  "/getAllUsers",
  middleware.authenticateJWT,
  userController.getAllUsers
);
router.get("/getUserByEmail", userController.getUserByEmail);
router.put("/updateUser", userController.updateUser);
router.delete("/deleteUser", userController.deleteUser);
////////////////////////////////////
router.post("/email", userController.mailservice);
////////////////////////////////////

module.exports = router;
