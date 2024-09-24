const router = require("express").Router();
const {getClothingItem, createClothingItem, deleteClothingItem} = require("../controllers/clothingitems");

//router.get("/", () => console.log("GET users"));
router.get("/", getClothingItem);
router.post("/", createClothingItem);
router.delete("/:itemId", deleteClothingItem);
router.put("/:itemId/likes", () => console.log("PUT_like item"))
router.delete("/:itemId/likes", () => console.log("DELETE_unlike item"))


module.exports = router;
