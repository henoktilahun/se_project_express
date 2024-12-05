const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const {
  BAD_REQUEST,
  INTERNAL_SERVER_ERROR,
  NOT_FOUND,
  CONFLICT,
  UNAUTHORIZED
} = require("../utils/errors");
const { JWT_SECRET } = require("../utils/config");
const {InternalServerError, NotFoundError, BadRequestError, UnauthorizedError, ForbiddenError, ConflictError} = require("../middlewares/error-handler")

// POST /user
const createUser = (req, res, next) => {
  const { name, avatar, email, password } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({ name, avatar, email, password: hash }))
    .then(() => res.status(201).send({ name, avatar, email }))
    .catch((err) => {
      console.error(err);
      if (err.code === 11000) {
        //return res.status(CONFLICT).send({ message: "Email address already exists" });
        return next(new ConflictError("Email address already exists"));
      }
      if (err.name === "ValidationError") {
        return next(new BadRequestError("Invalid data"));
        //return res.status(BAD_REQUEST).send({ message: "Invalid data" });
      }
      return next(new InternalServerError('An error has occured on the server'))
      // return res
      //   .status(INTERNAL_SERVER_ERROR)
      //   .send({ message: "An error has occurred on the server" });
    });
};

// GET /users/:id
const getUser = (req, res, next) => {
  const userId = req.user._id;
  User.findById(userId)
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return next(new NotFoundError(err.message));
        //return res.status(NOT_FOUND).send({ message: err.message });
      }
      if (err.name === "CastError") {
        return next(new BadRequestError("Invalid data"));
        //return res.status(BAD_REQUEST).send({ message: "Invalid data" });
      }
      return next(new InternalServerError('An error has occured on the server'))
      // return res
      //   .status(INTERNAL_SERVER_ERROR)
      //   .send({ message: "An error has occurred on the server" });
    });
};

const loginUser = (req, res, next) => {
  const { email, password } = req.body;
  if (!email) {
    return next(new BadRequestError("Email is required"));
    //return res.status(BAD_REQUEST).send({ message: 'Email is required' });
  }
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });

      res.send({ token });
    })
    .catch((err) => {
      console.error(err);
      if (err.message === "Illegal arguments: undefined, string") {
        return next(new BadRequestError(err.message));
        // return res
        //   .status(BAD_REQUEST)
        //   .send({ message: err.message });
      }
      if (err.message === "Incorrect email or password") {
        return next(new UnauthorizedError("Incorrect email or password"));
        // return res
        //   .status(UNAUTHORIZED)
        //   .send({ message: "Incorrect email or password" });
      }
      return next(new InternalServerError('An error has occured on the server'))
      // return res
      //   .status(INTERNAL_SERVER_ERROR)
      //   .send({ message: "An error has occurred on the server" });
    });
};

const updateUser = (req, res, next) => {
  const { name, avatar } = req.body;
  const userId = req.user._id;
  User.findByIdAndUpdate(
    userId,
    { name, avatar },
    { new: true, runValidators: true }
  )
    .then((user) => {
      if (!user) {
        return next(new NotFoundError("Not Found"));
        //return res.status(NOT_FOUND).send({ message: "Not Found" });
      }
      return res.send(user);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        return next(new BadRequestError("Invalid data"))
        //return res.status(BAD_REQUEST).send({ message: "Invalid data" });
      }
      return next(new InternalServerError("An error has occurred on the server"))
      // return res
      //   .status(INTERNAL_SERVER_ERROR)
      //   .send({ message: "An error has occurred on the server" });
    });
};

module.exports = { createUser, getUser, loginUser, updateUser };
