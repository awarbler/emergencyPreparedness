const Hygiene = require("../models/hygiene");
const User = require("../models/user");
const mongoose = require("mongoose");
// const { validationResult } = require("express-validator");
// const HttpError = require("../models/http.errors");

const getAllHygienes = (req, res) => {
  // #swagger.description = 'Get All hygiene items'
  try {
    if (!req.user) {
      return res.status(401).send("Not Authenticated");
    }
    Hygiene.find({})
      .then((data) => {
        // console.log("======>", data);
        // console.log("1.Calling 'send'");
        res.status(200).send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving Hygienes."
        });
      });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// const getHygieneById = (req, res) => {
//   // #swagger.description = 'Get hygiene by ID'
//   try {
//     if (!req.user) {
//       return res.status(401).send("Not Authenticated");
//     }
//     if (!ObjectId.isValid(req.parms.id)) {
//       res.status(400).send("Must be a valid id of a hygiene item.");
//     }
//     const hygieneID = req.params.id;

//     Hygiene.findById(hygieneID, (err, e) => {
//       if (err) {
//         res.status(500).send({
//           message: err.message || "Some error occurred while retrieving the hygiene item."
//         });
//       }
//       if (hygiene) {
//         res.status(200).send({
//           message: err.message || " There is not hygiene item by this id"
//         });
//       }
//     });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

const getHygieneByName = (req, res) => {
  // #swagger.description = 'Get hygiene by name'
  try {
    if (!req.user) {
      return res.status(401).send("Not Authenticated");
    }

    const name = req.params.name;

    if (!name) {
      res.status(400).send("Must use a valid  name to find a hygiene items.");
    }

    return Hygiene.find({ name: name })
      .then((data) => {
        res.status(200).send(data[0]);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving Hygienes."
        });
      });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createNewHygiene = async (req, res) => {
  // #swagger.description = 'add Hygiene item'
  // validation
  // const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //   return next(new HttpError("Invalid inputs passed, please check your data", 422));
  // }

  try {
    if (!req.user) {
      return res.status(401).send("Not Authenticated");
    }

    // if (!req.body.name || !req.body.quantity || !req.body.purchaseDate) {
    //   res.status(400).send({ message: "Input can not be empty!" });
    //   return;
    // }

    const hygiene = new Hygiene(req.body);
    return hygiene
      .save()
      .then((data) => {
        console.log("create new in hygiene", data);
        res.status(201).send(data);
      })
      .catch((err) => {
        if (err instanceof mongoose.Error.ValidationError) {
          res.status(422).send({ message: err.message || "Input is empty " });
        } else {
          res.status(500).send({
            message: err.message || "Some error occurred while creating the hygiene item."
          });
        }
      });
  } catch (err) {
    res.status(500).json(err);
  }
};

const updateHygiene = (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).send("Not Authenticated");
    }

    const name = req.params.name;

    console.log("===>", req.params.name);
    if (!name) {
      res.status(400).send({ message: "Must use a valid  name to find a hygiene items." });
      return;
    }

    // if (!hygieneName) {
    //   res.status(400).send("Must include name.");
    // }

    // if (!req.body.name || !req.body.quantity || !req.body.purchaseDate) {
    //   res.status(400).send({ message: "Input can not be empty!" });
    //   return;
    // }

    // return Hygiene.updateOne(
    //   { name: name },
    //   { quantity: quantity },
    //   { purchaseDate: purchaseDate },
    //   function (err, hygiene) {
    //     hygiene.name = req.body.name;
    //     hygiene.quantity = req.body.quantity;
    //     hygiene.purchaseDate = req.body.purchaseDate;
    //     hygiene.save(function (err) {
    //       if (err instanceof mongoose.Error.ValidationError) {
    //         res.status(422).send({ message: err.message || "Input is empty " });
    //       } else if (err) {
    //         res.status(500).json(err || "Some error occurred while creating the hygiene item.");
    //       } else {
    //         res.status(204).send();
    //         console.log(res.status(204).send());
    //       }
    //     });
    //   }
    // );

    const opts = { runValidators: true };
    const updateHygieneDoc = {
      name: req.body.name,
      quantity: req.body.quantity,
      purchaseDate: req.body.purchaseDate
    };

    return Hygiene.updateOne({ name: name }, updateHygiene, opts)
      .then((data, err) => {
        console.log("1. sending data");
        // hygiene.name = req.body.name;
        // hygiene.quantity = req.body.quantity;
        // hygiene.purchaseDate = req.body.purchaseDate;
        // hygiene.save(function (err) {
        //   if (err instanceof mongoose.Error.ValidationError) {
        //     res.status(422).send({ message: err.message || "Input can not be empty!" });
        //   } else if (err) {
        //     res.status(500).json(err || "Some error occurred while updating the hygiene item.");
        //   } else {
        res.status(204).send(data);
        console.log("create function in hygiene controller", data);
        console.log("=====>send the updated data");
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

const deleteHygiene = (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).send("Not Authenticated");
    }

    const name = req.params.name;

    if (!name) {
      res.status(400).send({ message: "Name Invalid" });
      return;
    }

    return Hygiene.deleteOne({ name: name })
      .then((result) => {
        res.status(200).send(result);
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

module.exports = {
  getAllHygienes,
  getHygieneByName,
  createNewHygiene,
  updateHygiene,
  deleteHygiene
};
