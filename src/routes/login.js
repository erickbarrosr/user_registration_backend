const router = require("express").Router();
const {
  loginController,
  checkToken,
} = require("../controllers/loginController");

router.route("/auth/login").post((req, res) => loginController.login(req, res));

router
  .route("/user/:id")
  .get(checkToken, (req, res) => loginController.authenticate(req, res));

module.exports = router;
