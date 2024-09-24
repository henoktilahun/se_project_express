const router = require("express").Router();
const {getClothingItem, createClothingItem, deleteClothingItem} = require("../controllers/clothingitems");

//router.get("/", () => console.log("GET users"));
router.get("/", getClothingItem);
router.post("/", createClothingItem);
router.delete("/:itemId", deleteClothingItem);

module.exports = router;
