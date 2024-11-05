const cors = require("cors");
const helmet = require("helmet");
const router = require("express").Router();
const userRouter = require("./users");
const itemRouter = require("./colothingitems");
const { NOT_FOUND } = require("../utils/errors");
const { loginUser, createUser } = require("../controllers/users");

router.use(helmet());
router.use("/items", itemRouter);
router.post("/signin", loginUser);
router.post("/signup", createUser);
router.use("/users", userRouter);
router.use(cors());

router.use((req, res) => res.status(NOT_FOUND).send({ message: "Not Found" }));
// router.use(cors());

module.exports = router;
