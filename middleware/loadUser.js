const appConfig = require('../config/app');
const User = require('../models/user');

const loadUser = async (req, res, next) => {
  // do we want to put this in a try ?
  // try{if (!req.headers.authorization)next();
  // const token = parseToken(req);
  // const authZeroUser = await fetchAuthZeroUser(token);
  // Lookup the user in _our_ database based on the
  // user info we got back from Auth0.
  //
  // If no User exists in our database yet, create
  // one and return it!
  // const user = await findOrCreateUser(authZeroUser);
  // Now we have a user. Set it on the request so we
  // can access it in controllers \o/
  // req.user = user ;
  // next(); } catch(_error){next();}};

  try {
  // console.log(req.headers.authorization);
  if (!req.headers.authorization) next();

  const authZeroUser = await fetchAuthZeroUser(req.headers.authorization);

  const user = await findOrCreateUser(authZeroUser);
  req.user = user;
  next();
  } catch (_error) {
    next();
  }
};

const fetchAuthZeroUser = async (authorizationValue) => {
  const response = await fetch(`${appConfig.authorizationHost}/userinfo`, {
    headers: { Authorization: authorizationValue }
  });

  return response.json();
};

const findOrCreateUser = async (authZeroUserJson) => {
  if (!authZeroUserJson) return;

  const existingUser = await User.findOne({ identifier: authZeroUserJson.sub });
  if (existingUser) return existingUser;

  // no user exists in our db yet, les create one with the info we got from auth0

  const newUser = await User.create({
    identifier: authoZeroJson.sub,
    email: authZeroUserJson.email,
    givenName: authZeroUserJson.given_name,
    familyName: authZeroUserJson.family_name,
    locale: authZeroUserJson.locale,
    picture: authZeroUserJson.picture
  });
  return newUser;
};



// const parseToken = (req) => {
//parse out the token. the token is in the authorization header like this:
// authorization: Bearer<token>
//return req.headers.authorization.split('')[1];
//};

module.exports = loadUser;
