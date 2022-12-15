const FirstAid = require("../models/firstAid");
const User = require("../models/user");
const mongoose = require("mongoose");

const getAllFirstAidItems = (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).send("Not Authenticated");
    } 
    
    FirstAid.find({})
      .then((data) => {
        console.log(data)
        res.status(200).send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving first-aid items."
        });
      });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getFirstAidItemByName = (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).send("Not Authenticated");
    }

    const name = req.params.name;

    if (!name) {
      res.status(400).send("Must include name.");
    }

    return FirstAid.find({ name: name })
      .then((data) => {
        console.log("Get by name", data)
        res.status(200).send(data[0]);
        console.log("Get by name", data)
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving first-aid item."
        });
      });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createNewFirstAidItem = (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).send("Not Authenticated");
    }

    const firstAid = new FirstAid(req.body);
    return firstAid
      .save()
      .then((data) => {
        console.log("Create function in firstAid controller", data);
        res.status(201).send(data);
      })
      .catch((err) => {
        if (err instanceof mongoose.Error.ValidationError) {
          res.status(422).send({ message: err.message || "Input can not be empty!" });
        }
        else { 
            res.status(500).send({
            message: err.message || "Some error occurred while creating the first-aid item."
          });
        }
      });
  } catch (err) {
    res.status(500).json(err);
  }
};

const updateFirstAidItem = (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).send("Not Authenticated");
    }
    const name = req.params.name;

    // console.log("===>", req.params.name)
      if (!name) {
        res.status(400).send({ message: 'Invalid name Supplied' });
        return;
      }

    const opts = { runValidators: true };
    const updateFirstAidDoc = {
      name: req.body.name,
      quantity: req.body.quantity,
      purchaseDate: req.body.purchaseDate,

    };

    return FirstAid.updateOne({ name: name }, updateFirstAidDoc, opts).then((data, err) => {
          console.log("1. sending the data")
          res.status(204).send(data);
        console.log("Create function in firstAid controller", data);
            
       
      })
      .catch((err) => {
        if (opts) {
          res.status(422).send({ message: err.message || "Input can not be empty!" });
        }
        else { 
            res.status(500).send({
            message: err.message || "Some error occurred while updating the first-aid item."
          });
        }
      });
  } catch (err) {
    res.status(500).json(err);
  }
};



const deleteFirstAidItem = (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).send("Not Authenticated");
    }
    const name = req.params.name;

    if (!name) {
      res.status(400).send({ message: "Name Invalid" });
      return;
    }
    console.log("===>in delete function", req.params.name)
    return FirstAid.deleteOne({ name: name })
      .then((result) => {
        console.log("Delete by name", result)
        res.status(200).send(result);
        console.log("Delete by name", result)
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Some error occurred while deleting the first-aid item."
        });
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
  deleteFirstAidItem
};
