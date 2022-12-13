const Hygiene = require("../models/hygiene");
const { validationResult } = require("express-validator");
const HttpError = require("../models/http.errors");

const createNewHygiene = async (req, res) => {
  // #swagger.description = 'add Hygiene item'
  // validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError("Invalid inputs passed, please check your data", 422));
  }

  try {
    if (!req.user) {
      return res.status(401).send("Not Authenticated");
    }

    if (!req.body.name || !req.body.quantity || !req.body.purchaseDate) {
      res.status(400).send({ message: "Input can not be empty!" });
      return;
    }

    const hygiene = new Hygiene(req.body);
    hygiene
      .save()
      .then((data) => {
        console.log(data);
        res.status(201).send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Some error occurred while creating the hygiene item."
        });
      });
  } catch (err) {
    res.status(500).json(err);
  }
};

const getAllHygienes = (req, res) => {
  // #swagger.description = 'Get All hygiene items'
  try {
    if (!req.user) {
      return res.status(401).send("Not Authenticated");
    }
    return Hygiene.find({})
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
    if (!req.params.name) {
      return res.status(400).json("Must use a valid  name to find a hygiene items.");
    }
    const name = req.params.name;
    return Hygiene.find({ name: name }).then((document) => {
      console.log("=======>", data);
      res.json(document[0]);
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateHygiene = (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).send("Not Authenticated");
    }

    const hygieneName = req.params.name;

    // if (!hygieneName) {
    //   res.status(400).send("Must include name.");
    // }

    // if (!req.body.name || !req.body.quantity || !req.body.purchaseDate) {
    //   res.status(400).send({ message: "Input can not be empty!" });
    //   return;
    // }

    Hygiene.findOne({ name: hygieneName }, function (err, hygiene) {
      hygiene.name = req.body.name;
      hygiene.quantity = req.body.quantity;
      hygiene.purchaseDate = req.body.purchaseDate;
      hygiene.save(function (err) {
        if (err) {
          res.status(500).json(err || "Some error occurred while updating the hygiene item.");
        } else {
          res.status(204).send();
        }
      });
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

const deleteHygiene = (req, res) => {
  try {
    // if (!req.user) {
    //   return res.status(401).send("Not Authenticated");
    // }

    const hygieneName = req.params.name;

    if (!hygieneName) {
      res.status(400).send({ message: "Name Invalid" });
      return;
    }

    Hygiene.deleteOne({ name: hygieneName }, (err, result) => {
      if (err) {
        res.status(500).json(err || "Some error occurred while deleting the hygiene item.");
      } else {
        res.status(200).send(result);
      }
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
  deleteHygiene,
  getHygieneById
};
