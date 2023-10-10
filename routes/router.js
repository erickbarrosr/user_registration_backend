const router = require("express").Router();
const usersRouter = require("./users");
const loginRouter = require("./login");

// Public Route
router.route("/").get((req, res) => {
  res.status(200).json({ message: "Hello World!" });
});

router.use("/", usersRouter);
router.use("/", loginRouter);

module.exports = router;
