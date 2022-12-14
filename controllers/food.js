const Food = require("../models/food");
const mongoose = require("mongoose");

const getAllFood = (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).send("Not Authenticated");
    }

    return Food.find({})
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving the food items."
        });
      });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getFoodByfoodName = (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).send("Not Authenticated");
    }

    const foodName = req.params.foodName;

    if (!foodName) {
      res.status(400).send("Must include the name of the food.");
    }

    return Food.find({ foodName: foodName })
      .then((data) => {
        res.status(200).send(data[0]);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving the food item."
        });
      });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createNewFoodItem = (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).send("Not Authenticated");
    }

    const food = new Food(req.body);
    return food
      .save()
      .then((data) => {
        console.log(data);
        res.status(201).send(data);
      })
      .catch((err) => {
        if (err instanceof mongoose.Error.ValidationError) {
          res.status(422).send({ message: err.message || "Input is empty " });
        } else {
          res.status(500).send({
            message: err.message || "Some error occurred while creating the food item."
          });
        }
      });
  } catch (err) {
    res.status(500).json(err);
  }
};

const updateFoodItem = (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).send("Not Authenticated");
    }

    const foodName = req.params.foodName;

    console.log("===>", req.params.foodName);
    if (!foodName) {
      res.status(400).send({ message: "Must use a valid  name to find a food item." });
      return;
    }

    return Food.findOne({ foodName: foodName }, function (err, food) {
      food.foodName = req.body.foodName;
      food.quantity = req.body.quantity;
      food.purchaseDate = req.body.purchaseDate;
      food.expirationDate = req.body.expirationDate;
      food.orderNextByDate = req.body.orderNextByDate;
      food.description = req.body.description;
      food.save(
        function (err) {
        if (err instanceof mongoose.Error.ValidationError) {
          res.status(422).send({ message: err.message || "Input can not be empty!" });
        } 
        else if (err) {
          res.status(500).json(err || "Some error occurred while updating the food item.");
        } 
        else {
          res.status(204).send();
          console.log("=====>send the updated data");
          
        }
      });
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

const deleteFoodItem = (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).send("Not Authenticated");
    }

    const foodName = req.params.foodName;

    if (!foodName) {
      res.status(400).send("Cannot Find food item" );
      return;
    }

    return Food.deleteOne({ foodName: foodName})
      .then((result) => {
        res.status(200).send(result);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving Food."
        });
      });
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  getAllFood,
  getFoodByfoodName,
  createNewFoodItem,
  updateFoodItem,
  deleteFoodItem
};
