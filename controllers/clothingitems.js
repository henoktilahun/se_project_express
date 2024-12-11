const Clothingitem = require("../models/clothingitem");
const InternalServerError = require("../errors/internal-server");
const NotFoundError = require("../errors/not-found");
const BadRequestError = require("../errors/bad-request");
const ForbiddenError = require("../errors/forbidden");

// GET /items — returns all clothing items
const getClothingItem = (req, res, next) => {
  Clothingitem.find({})
    .then((items) => res.send(items))
    .catch((err) => {
      console.error(err);
      return next(
        new InternalServerError("An error has occured on the server")
      );
    });
};

// POST /items — creates a new item
const createClothingItem = (req, res, next) => {
  const { name, weather, imageUrl } = req.body;
  console.log(req);
  const owner = req.user._id;
  Clothingitem.create({ name, weather, imageUrl, owner })
    .then((item) => res.status(201).send(item))
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return next(new BadRequestError("Invalid data"));
      }
      return next(
        new InternalServerError("An error has occured on the server")
      );
    });
};

// DELETE /items/:itemId — deletes an item by _id
const deleteClothingItem = (req, res, next) => {
  const { itemId } = req.params;
  const userId = req.user._id;
  Clothingitem.findById(itemId)
    .orFail()
    .then((item) => {
      const ownderId = item.owner.toString();

      if (userId !== ownderId) {
        return next(new ForbiddenError("Insufficient Permissions"));
      }
      return Clothingitem.findByIdAndDelete(itemId)
        .orFail()
        .then(() => res.send(item));
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return next(new NotFoundError(err.message));
      }
      if (err.name === "CastError") {
        return next(new BadRequestError("Invalid data"));
      }
      return next(
        new InternalServerError("An error has occured on the server")
      );
    });
};

// PUT /items/:itemId/likes — like an item
const likeClothingItem = (req, res, next) => {
  const { itemId } = req.params;
  Clothingitem.findByIdAndUpdate(
    itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((item) => res.send(item))
    .catch((err) => {
      console.error(err);
      console.log(err.name);
      if (err.name === "DocumentNotFoundError") {
        return next(new NotFoundError(err.message));
      }
      if (err.name === "CastError") {
        return next(new BadRequestError("Invalid data"));
      }
      return next(
        new InternalServerError("An error has occured on the server")
      );
    });
};

// DELETE /items/:itemId/likes — unlike an item
const dislikeClothingItem = (req, res, next) => {
  const { itemId } = req.params;
  Clothingitem.findByIdAndUpdate(
    itemId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((item) => res.send(item))
    .catch((err) => {
      console.error(err);
      console.log(err.name);
      if (err.name === "DocumentNotFoundError") {
        return next(new NotFoundError(err.message));
      }
      if (err.name === "CastError") {
        return next(new BadRequestError("Invalid data"));
      }
      return next(
        new InternalServerError("An error has occured on the server")
      );
    });
};

module.exports = {
  getClothingItem,
  createClothingItem,
  deleteClothingItem,
  likeClothingItem,
  dislikeClothingItem,
};
