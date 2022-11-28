const config = require("../config/app");

const User = require('../models/user');

const loadUser = async (req, res, next) => {
  try {
    // console.log(req.headers.authorization);

    if (!req.headers.authorization) next();

    // const token = parseToken(req);

    const authZeroUser = await fetchAuthZeroUser(req.headers.authorization);
    // const authZeroUser = req.headers.authorization;

    const user = await findOrCreateUser(authZeroUser);

    console.log(user);
    req.user = user;
    // console.log(authZeroUser);
    next();
  } catch (_error) {
      next();
  }
};

const fetchAuthZeroUser = async (authorizationValue) => {

  // It does get the token
  // console.log("Is token present: ", authorizationValue);

  // It returns the correct url
  // console.log(config.authorizationHost);

  const response = await fetch(`${config.authorizationHost}/userinfo`, {
    headers: { Authorization: authorizationValue },
  });

  // const text = await response.text();
  // console.log(text);

  return response.json();
};

const findOrCreateUser = async (authZeroUserJson) => {
  if (!authZeroUserJson) return;

  const existingUser = await User.findOne({ identifier: authZeroUserJson.sub });
  console.log(authZeroUserJson.sub)

  if (existingUser) return existingUser;

  const newUser = await User.create({
    identifier: authZeroUserJson.sub,
    email: authZeroUserJson.email,
    givenName: authZeroUserJson.given_name,
    familyName: authZeroUserJson.family_name,
    locale: authZeroUserJson.locale,
    picture: authZeroUserJson.picture,
  });
  console.log(newUser);
  return newUser;
  
};



// const parseToken = (req) => {

//   return req.headers.authorization.split(" ")[1];
// };

module.exports = loadUser;