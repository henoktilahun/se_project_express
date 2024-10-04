const User = require("../models/user");
const {
  BAD_REQUEST,
  INTERNAL_SERVER_ERROR,
  NOT_FOUND,
} = require("../utils/errors");

// GET /users
const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((err) => {
      console.error(err);
      return res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: "An error has occurred on the server" });
    });
};

// POST /user
const createUser = (req, res) => {
  const { name, avatar, email, password } = req.body;
  User.findOne({ email })
    .then((user) => {
      if (!user) {
        User.create({ name, avatar })
          .then((user) => res.status(201).send(user))
          .catch((err) => {
            console.error(err);
            if (err.name === "ValidationError") {
              return res.status(BAD_REQUEST).send({ message: "Invalid data" });
            }
            return res
              .status(INTERNAL_SERVER_ERROR)
              .send({ message: "An error has occurred on the server" });
          });
      }
    })
    .catch((err) => {
      res.status(401).send({ message: err.message });
    });
};

// GET /users/:id
const getUser = (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return res.status(NOT_FOUND).send({ message: err.message });
      }
      if (err.name === "CastError") {
        return res.status(BAD_REQUEST).send({ message: "Invalid data" });
      }
      return res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: "An error has occurred on the server" });
    });
};

const loginUser = (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error("Incorrect email or password"));
      }

      return bcrypt.compare(password, user.password);
    })
    .then((matched) => {
      if (!matched) {
        // the hashes didn't match, rejecting the promise
        return Promise.reject(new Error("Incorrect email or password"));
      }

      // authentication successful
      res.send({ message: "Everything good!" });
    })
    .catch((err) => {
      res.status(401).send({ message: err.message });
    });
};

module.exports = { getUsers, createUser, getUser };
