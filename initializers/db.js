const mongoose = require("mongoose");
const dbConfig = require("../config/db");

const database = {
  initialize: async () => {
    try {
      await mongoose.connect(dbConfig.url);
    } catch (err) {
      console.error(err);
      return false;
    }
    console.log("Connected to the Database");
    return true;
  }
};
module.exports = database;
