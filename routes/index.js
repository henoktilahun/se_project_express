const router = require("express").Router();
const userRouter = require("./users");
const itemRouter = require("./colothingitems");

router.use("/users", userRouter);
router.use("/items", itemRouter);

module.exports = router;
