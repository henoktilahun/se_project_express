const router = require("express").Router();
const { updateUser, getUser } = require("../controllers/users");
const auth = require("../middlewares/auth");
const { validateUpdateUser } = require("../middlewares/validation");

router.use(auth);
router.get("/me", getUser);
router.patch("/me", validateUpdateUser, updateUser);

module.exports = router;
