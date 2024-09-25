const router = require("express").Router();
const userRouter = require("./users");
const itemRouter = require("./colothingitems");
const {  NOT_FOUND } = require("../utils/errors");

router.use("/users", userRouter);
router.use("/items", itemRouter);
router.use((req, res) => res.status(NOT_FOUND).send({ message: "Not Found"}))

module.exports = router;
