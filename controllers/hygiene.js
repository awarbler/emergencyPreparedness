const Hygiene = require("../models/hygiene");

const getAllHygienes = (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).send("Not Authenticated");
    }

    return Hygiene.find({})
      .then((data) => {
        console.log("======>", data);
        console.log("1.Calling 'send'");
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

const getHygieneByName = (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).send("Not Authenticated");
    }

    const name = req.params.name;

    if (!name) {
      res.status(400).send("Must include email.");
    }

    Hygiene.find({ name: name })
      .then((data) => {
        res.status(200).send(data[0]);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving the hygiene item."
        });
      });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createNewHygiene = (req, res) => {
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

const updateHygiene = (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).send("Not Authenticated");
    }

    const name = req.params.name;

    if (!name) {
      res.status(400).send("Must include name.");
    }

    if (!req.body.name || !req.body.quantity || !req.body.purchaseDate) {
      res.status(400).send({ message: "Input can not be empty!" });
      return;
    }

    Hygiene.findOne({ name: name }, function (err, hygiene) {
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
    if (!req.user) {
      return res.status(401).send("Not Authenticated");
    }

    const name = req.params.name;

    if (!name) {
      res.status(400).send({ message: "Name Invalid" });
      return;
    }

    Hygiene.deleteOne({ name: name }, (err, result) => {
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
  deleteHygiene
};
