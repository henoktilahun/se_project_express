const router = require("express").Router();
const {
  getClothingItem,
  createClothingItem,
  deleteClothingItem,
  likeClothingItem,
  dislikeClothingItem,
} = require("../controllers/clothingitems");

//router.get("/", () => console.log("GET users"));
router.get("/", getClothingItem);
router.post("/", createClothingItem);
router.delete("/:itemId", deleteClothingItem);
router.put("/:itemId/likes", likeClothingItem);
router.delete("/:itemId/likes", dislikeClothingItem);

module.exports = router;
