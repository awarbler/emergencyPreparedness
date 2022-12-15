const User = require("../models/user");
const mongoose = require("mongoose");

const getAllUsers = async (req, res) => {
  try {
    User.find({})
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving users."
        });
      });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getUserByEmail = async (req, res) => {
  try {
    const email = req.params.email;

    if (!email) {
      res.status(400).send("Must include email.");
    }

    return User.find({ email: email })
      .then((data) => {
        res.status(200).send(data[0]);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving user."
        });
      });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const email = req.params.email;

    if (!email) {
      res.status(400).send({ message: "Invalid email Supplied" });
      return;
    }

    // if (!req.body.userName || !req.body.email || !req.body.password) {
    //   res.status(400).send({ message: 'Input can not be empty!' });
    //   return;
    // }

    const opts = { runValidators: true };
    const updateUserDoc = {
      identifier: req.body.identifier,
      email: req.body.email,
      givenName: req.body.givenName,
      familyName: req.body.familyName,
      locale: req.body.locale,
      picture: req.body.picture
    };

    // return User.updateOne({ email: email }, updateUserDoc, opts)
    //   .then((data, err) => {
    //     console.log("1. sending data");
    //     res.status(204).send(data);
    //     console.log("create function in hygiene controller", data);
    //   })

    //   .catch((err) => {
    //     if (opts) {
    //       res.status(422).send({ message: err.message || "Input can not be empty!" });
    //     } else {
    //       res.status(500).send({
    //         message: err.message || "Some error occurred while updating the first-aid item."
    //       });
    //     }
    //   });
    return User.updateOne({ email: email }, updateUserDoc, opts)
      .then((data, err) => {
        console.log("1. sending the data");
        res.status(204).send(data);
        console.log("Create function in user controller", data);
      })
      .catch((err) => {
        if (opts) {
          res.status(422).send({ message: err.message || "Input can not be empty!" });
        } else {
          res.status(500).send({
            message: err.message || "Some error occurred while updating the first-aid item."
          });
        }
      });
  } catch (err) {
    res.status(500).json(err);
  }
};

const deleteUser = async (req, res) => {
  try {
    const email = req.params.email;

    if (!email) {
      res.status(400).send({ message: "Email Invalid" });
      return;
    }
    console.log("===>in delete function", req.params.email);

    return User.deleteOne({ email: email })
      .then((result) => {
        console.log("Delete by email", result);
        res.status(200).send(result);
        console.log("Delete by email", result);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving Hygienes."
        });
      });
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = { getAllUsers, getUserByEmail, updateUser, deleteUser };
