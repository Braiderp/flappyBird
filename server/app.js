const express = require("express");

const { auth, requiresAuth } = require("express-openid-connect");

const app = express();

require("dotenv").config();

const port = process.env.PORT || 3000;

const config = {
  authRequired: false,
  auth0Logout: true,
  baseURL: process.env.BASE_URL,
  clientID: process.env.CLIENT_ID,
  issuerBaseURL: process.env.ISSUER_BASE_URL,
  secret: process.env.SECRET
};

console.log("config", config);

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

// req.isAuthenticated is provided from the auth router
// app.get("/", requiresAuth(), (req, res) => {
//   res.send(req.oidc.isAuthenticated() ? "Logged in" : "Logged out");
// });

app.get("/game", requiresAuth(), (req, res, next) => {
  const user = req.oidc.user;
  res.json(user);
});

app.listen(port, () => {
  console.log(`listening on port: ${port}`);
});
