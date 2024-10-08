const router = require("express").Router();
const { updateUser, getUser } = require("../controllers/users");
const auth = require("../middlewares/auth");

router.use(auth);
router.get("/me", getUser);
router.patch("/me", updateUser);

module.exports = router;
