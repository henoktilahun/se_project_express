const Clothingitem = require("../models/clothingitem")
const { BAD_REQUEST, INTERNAL_SERVER_ERROR, NOT_FOUND } = require("../utils/errors")

// GET /items — returns all clothing items
const getClothingItem = (req, res) => {
  Clothingitem.find({})
    .then((items) => res.status(200).send(items))
    .catch((err) => {
      console.error(err);
      return res.status(INTERNAL_SERVER_ERROR).send({ message: err.message });
    });
};

// POST /items — creates a new item
const createClothingItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;
  const owner = req.user._id
  Clothingitem.create({ name, weather, imageUrl, owner })
    .then((item) => res.status(201).send(item))
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return res.status(BAD_REQUEST).send({ message: err.message });
      }
      return res.status(INTERNAL_SERVER_ERROR).send({ message: err.message });
    });
};

// DELETE /items/:itemId — deletes an item by _id
const deleteClothingItem = (req, res) => {
  const { itemId } = req.params;
  Clothingitem.findByIdAndDelete(itemId)
    .orFail()
    .then((item) => res.status(200).send(item))
    .catch((err) => {
      console.error(err);
      console.log(err.name);
      if (err.name === "DocumentNotFoundError") {
        return res.status(NOT_FOUND).send({ message: err.message });
      } else if (err.name === "CastError") {
        return res.status(BAD_REQUEST).send({ message: err.message });
      }
      return res.status(INTERNAL_SERVER_ERROR).send({ message: err.message });
    });
};

// PUT /items/:itemId/likes — like an item
const likeClothingItem = (req, res) => {
  const ownder = req.user._id
}

// DELETE /items/:itemId/likes — unlike an item

module.exports = { getClothingItem, createClothingItem, deleteClothingItem }