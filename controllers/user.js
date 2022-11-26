const User = require('../models/user');


const getAllUsers = async (req, res) => {
  try {
    User.find({})
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || 'Some error occurred while retrieving users.'
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
        res.status(400).send('Must include email.')
      }
      
      User.find({ email : email })
        .then((data) => {
          res.status(200).send(data[0]);
        })
        .catch((err) => {
          res.status(500).send({
            message: err.message || 'Some error occurred while retrieving user.'
          });
        });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };


  // const createNewUser = async (req, res) => {
  //   try {
  //     if (!req.body.userName || !req.body.email || !req.body.password) {
  //       res.status(400).send({ message: 'Input can not be empty!' });
  //       return;
  //     }

  //     const user = new User(req.body);
  //     user
  //       .save()
  //       .then((data) => {
  //         console.log(data);
  //         res.status(201).send(data);
  //       })
  //       .catch((err) => {
  //         res.status(500).send({
  //           message: err.message || 'Some error occurred while creating the user.'
  //         });
  //       });
  //   } catch (err) {
  //     res.status(500).json(err);
  //   }
  // };
  
  const updateUser = async (req, res) => {
    try {
      const email = req.params.email;

      if (!email) {
        res.status(400).send({ message: 'Invalid email Supplied' });
        return;
      }

      // if (!req.body.userName || !req.body.email || !req.body.password) {
      //   res.status(400).send({ message: 'Input can not be empty!' });
      //   return;
      // }

  
      User.findOne({ email: email }, function (err, user) {
        // user.userName = req.body.userName;
        // user.email = req.body.email;
        // user.password = req.body.password;
        user.familyName = req.body.familyName;
        user.save(function (err) {
          if (err) {
            res.status(500).json(err || 'Some error occurred while updating the user.');
          } else {
            res.status(204).send();
          }
        });
      });
    } catch (err) {
      res.status(500).json(err);
    }
    
  };
  
  
  const deleteUser = async (req, res) => {
    try {
      const email = req.params.email;
  
      if (!email) {
        res.status(400).send({ message: 'Email Invalid' });
        return;
      }
  
      User.deleteOne({ email: email }, (err, result) =>  {
        if (err) {
          res.status(500).json(err || 'Some error occurred while deleting the user.');
        } else {
          res.status(200).send(result);
        }
      });

    } catch (err) {
      res.status(500).json(err);
    }
  };
  

module.exports = { getAllUsers, getUserByEmail, updateUser, deleteUser };