const router = require("express").Router();
const userRouter = require("./users");
const itemRouter = require("./colothingitems");
const { NOT_FOUND } = require("../utils/errors");
const { loginUser, createUser } = require("../controllers/users");
const auth = require("../middlewares/auth");
const cors = require("cors");

router.use("/items", itemRouter);
router.post("/signin", loginUser);
router.post("/signup", createUser);

router.use(auth);
router.use("/users", userRouter);

router.use((req, res) => res.status(NOT_FOUND).send({ message: "Not Found" }));
router.use(cors());
module.exports = router;
