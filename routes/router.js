const router = require("express").Router();
const usersRouter = require("./users");

// Public Route
router.route("/").get((req, res) => {
  res.status(200).json({ message: "Hello World!" });
});

router.use("/", usersRouter);

module.exports = router;
