const Clothingitem = require("../models/clothingitem")

// GET /items — returns all clothing items
const getClothingItem = (req, res) => {
  Clothingitem.find({})
    .then((items) => res.status(200).send(items))
    .catch((err) => {
      console.error(err);
      return res.status(500).send({ message: err.message });
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
        return res.status(400).send({ message: err.message });
      }
      return res.status(500).send({ message: err.message });
    });
};

// DELETE /items/:itemId — deletes an item by _id
const deleteClothingItem = (req, res) => {
  Clothingitem.findByIdAndDelete(req.user.id)
    .then((item) => res.status(200).send(item))
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return res.status(400).send({ message: err.message });
      }
      return res.status(500).send({ message: err.message });
    });
};

module.exports = { getClothingItem, createClothingItem, deleteClothingItem }