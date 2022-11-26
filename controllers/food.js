const Food = require('../models/food');


const getAllFood = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).send("Not Authenticated");
    }

    Food.find({})
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || 'Some error occurred while retrieving the food items.'
        });
      });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getFoodByfoodName = async (req, res) => {
    try {
      if (!req.user) {
        return res.status(401).send("Not Authenticated");
      }

      const foodName = req.params.foodName;
      
      if (!foodName) {
        res.status(400).send('Must include the name of the food.')
      }
      
      Food.find({ foodName : foodName })
        .then((data) => {
          res.status(200).send(data[0]);
        })
        .catch((err) => {
          res.status(500).send({
            message: err.message || 'Some error occurred while retrieving the food item.'
          });
        });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };


  const createNewFoodItem = async (req, res) => {
    try {
      if (!req.user) {
        return res.status(401).send("Not Authenticated");
      }

      if (!req.body.foodName || !req.body.brandName || !req.body.quantity || !req.body.purchaseDate || !req.body.expirationDate || !req.body.orderNextByDate || !req.body.description) {
        res.status(400).send({ message: 'Input can not be empty!' });
        return;
      }

      const food = new Food(req.body);
      food
        .save()
        .then((data) => {
          console.log(data);
          res.status(201).send(data);
        })
        .catch((err) => {
          res.status(500).send({
            message: err.message || 'Some error occurred while creating the food item.'
          });
        });
    } catch (err) {
      res.status(500).json(err);
    }
  };
  
  const updateFoodItem = async (req, res) => {
    try {
      if (!req.user) {
        return res.status(401).send("Not Authenticated");
      }

      const foodName = req.params.foodName;

    if (!req.body.foodName || !req.body.brandName || !req.body.quantity || !req.body.purchaseDate || !req.body.expirationDate || !req.body.orderNextByDate || !req.body.description) {
        res.status(400).send({ message: 'Input can not be empty!' });
        return;
      }

  
      Food.findOne({ foodName: foodName }, function (err, food) {
        food.foodName = req.body.foodName;
        food.brandName = req.body.brandName;
        food.quantity = req.body.quantity;
        food.purchaseDate = req.body.purchaseDate;
        food.expirationDate = req.body.expirationDate;
        food.orderNextByDate = req.body.orderNextByDate;
        food.description = req.body.description;
        food.save(function (err) {
          if (err) {
            res.status(500).json(err || 'Some error occurred while updating the food item.');
          } else {
            res.status(204).send();
          }
        });
      });
    } catch (err) {
      res.status(500).json(err);
    }
    
  };
  
  
  const deleteFoodItem = async (req, res) => {
    try {
      if (!req.user) {
        return res.status(401).send("Not Authenticated");
      }
      
      const foodName = req.params.foodName;
  
      if (!foodName) {
        res.status(400).send({ message: 'Cannot Find food item' });
        return;
      }
  
      Food.deleteOne({ foodName: foodName }, (err, result) =>  {
        if (err) {
          res.status(500).json(err || 'Some error occurred while deleting the food item.');
        } else {
          res.status(200).send(result);
        }
      });

    } catch (err) {
      res.status(500).json(err);
    }
  };
  

module.exports = { getAllFood, getFoodByfoodName, createNewFoodItem, updateFoodItem, deleteFoodItem };