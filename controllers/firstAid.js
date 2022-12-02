const FirstAid = require("../models/firstAid");

// const getFavFirstAidStorage = async (req, res) => {
//   try {
//     if (!req.user) {
//       return res.status(401).send("Not Authenticated");
//     }

//     res.json(req.user.favFirstAidStorage);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

const getAllFirstAidItems = (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).send("Not Authenticated");
    }

    return FirstAid.find({})
      .then((data) => {
        console.log("1. Calling 'send'");
        res.status(200).send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message ||
            "Some error occurred while retrieving first-aid items.",
        });
      });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getFirstAidItemByName = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).send("Not Authenticated");
    }

    const name = req.params.name;

    if (!name) {
      res.status(400).send("Must include name.");
    }

    FirstAid.find({ name: name })
      .then((data) => {
        res.status(200).send(data[0]);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message ||
            "Some error occurred while retrieving first-aid item.",
        });
      });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createNewFirstAidItem = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).send("Not Authenticated");
    }

    if (!req.body.name || !req.body.quantity || !req.body.purchaseDate) {
      res.status(400).send({ message: "Input can not be empty!" });
      return;
    }

    const firstAid = new FirstAid(req.body);
    firstAid
      .save()
      .then((data) => {
        console.log(data);
        res.status(201).send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message ||
            "Some error occurred while creating the first-aid item.",
        });
      });
  } catch (err) {
    res.status(500).json(err);
  }
};

const updateFirstAidItem = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).send("Not Authenticated");
    }
    const name = req.params.name;
    //   if (!name) {
    //     res.status(400).send({ message: 'Invalid name Supplied' });
    //     return;
    //   }

    if (!req.body.name || !req.body.quantity || !req.body.purchaseDate) {
      res.status(400).send({ message: "Input can not be empty!" });
      return;
    }

    FirstAid.findOne({ name: name }, function (err, firstAid) {
      firstAid.name = req.body.name;
      firstAid.quantity = req.body.quantity;
      firstAid.purchaseDate = req.body.purchaseDate;
      firstAid.save(function (err) {
        if (err) {
          res
            .status(500)
            .json(
              err || "Some error occurred while updating the first-aid item."
            );
        } else {
          res.status(204).send();
        }
      });
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

const deleteFirstAidItem = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).send("Not Authenticated");
    }
    const name = req.params.name;

    if (!name) {
      res.status(400).send({ message: "Name Invalid" });
      return;
    }

    FirstAid.deleteOne({ name: name }, (err, result) => {
      if (err) {
        res
          .status(500)
          .json(
            err || "Some error occurred while deleting the first-aid item."
          );
      } else {
        res.status(200).send(result);
      }
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  getAllFirstAidItems,
  getFirstAidItemByName,
  createNewFirstAidItem,
  updateFirstAidItem,
  deleteFirstAidItem,
};
