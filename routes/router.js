const router = require("express").Router();

router.route("/").get((req, res) => {
  res.status(200).json({ message: "Hello World!" });
});

module.exports = router;
