const router = require("express").Router();
const {} = require("../controllers/clothingitems");

//router.get("/", () => console.log("GET users"));
router.get("/", () => console.log("GET items"));
router.post("/", () => console.log("POST items"));
router.delete("/:itemId", () => console.log("DELETE items"));

module.exports = router;
