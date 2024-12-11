const cors = require("cors");
const helmet = require("helmet");
const router = require("express").Router();
const userRouter = require("./users");
const itemRouter = require("./colothingitems");
const { loginUser, createUser } = require("../controllers/users");
const {
  validateUser,
  validateUserLogin,
} = require("../middlewares/validation");
const NotFoundError = require("../errors/not-found");

router.use(cors());
router.use(helmet());
router.use("/items", itemRouter);
router.post("/signin", validateUserLogin, loginUser);
router.post("/signup", validateUser, createUser);
router.use("/users", userRouter);

router.use((req, res, next) => {
  next(new NotFoundError("Not Found"));
});

module.exports = router;
