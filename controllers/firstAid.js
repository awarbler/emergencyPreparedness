const FirstAid = require("../models/firstAid");
const User = require("../models/user");
const mongoose = require("mongoose");
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

// const getUserByIdentifier = (req) => {

//   const identifier = req.params.identifier;
//   const user = req.user.identifier;
//   const findUser = User.find( route => route.user == user);
//   const findUser = User.find({ identifier: identifier }).then((data) => {
//     console.log(data)
//     res.status(200).send(data);
//   });

//   return findUser;
// }



const getAllFirstAidItems = (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).send("Not Authenticated");
    } 
    // else if (req.user && req.user.identifier === req.user ) {
    //   return getAllFirstAidItems();
    // }

    // getUserByIdentifier(req.user);

    // const identifier = req.params.identifier;
    // const findUser = User.findOne({ identifier: identifier }).then((data) => {
    //   console.log("return user", data)
      
    //   return data;
    // });
    // console.log("testing getUserByIdentifier", findUser)
    // console.log("Testing req.user", req.user.identifier)
    

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

    // if (!req.body.name || !req.body.quantity || !req.body.purchaseDate) {
    //   res.status(400).send({ message: "Input can not be empty!" });
    //   return;
    // }

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

    console.log("===>", req.params.name)
      if (!name) {
        res.status(400).send({ message: 'Invalid name Supplied' });
        return;
      }

    // if (!req.body.name || !req.body.quantity || !req.body.purchaseDate) {
    //   res.status(400).send({ message: "Input can not be empty!" });
    //   return;
    // }

    return FirstAid.findOne({ name: name }, function (err, firstAid) {
      firstAid.name = req.body.name;
      firstAid.quantity = req.body.quantity;
      firstAid.purchaseDate = req.body.purchaseDate;
      firstAid.save(function (err) {
        if (err instanceof mongoose.Error.ValidationError) {
          res.status(422).send({ message: err.message || "Input can not be empty!" });
        } 
        else if (err) {
          res.status(500).json(err || "Some error occurred while updating the first-aid item.");
        } 
        else {
          res.status(204).send();
          console.log(res.status(204).send())
        }
      });
    });
    // const updateFirstAidDoc = {
    //   name: req.body.name,
    //   quantity: req.body.quantity,
    //   purchaseDate: req.body.purchaseDate,

    // };

    // return FirstAid.updateOne(updateFirstAidDoc).then((data) => {
    //     console.log("Create function in firstAid controller", data);
    //     res.status(204).send(data);
    //   })
    //   .catch((err) => {
    //     if (err instanceof mongoose.Error.ValidationError) {
    //       res.status(422).send({ message: err.message || "Input can not be empty!" });
    //     }
    //     else { 
    //         res.status(500).send({
    //         message: err.message || "Some error occurred while updating the first-aid item."
    //       });
    //     }
    //   });
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
    // return FirstAid.deleteOne({ name: name }, (err, result) => {
    //   if (err) {
    //     res.status(500).json(err || "Some error occurred while deleting the first-aid item.");
    //   } else {
    //     res.status(200).send(result);
    //     console.log(result)
    //   }
    // });
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
