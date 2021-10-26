require("dotenv").config();

const express = require("express");

const { auth } = require("express-openid-connect");

const app = express();

const bodyParser = require('body-parser'); // CSRF Body parsing

const session = require("express-session");

const cookieParser = require('cookie-parser'); // CSRF Cookie parsing

const uri = `mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@web-development-2.cglha.mongodb.net/game`;

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

const mongoose = require("mongoose");

const port = process.env.PORT || 3000;

var csrf = require('csurf');

var cors = require('cors');

const path = require("path");

const gameRoutes = require("./routes/gameRoutes");


const config = {
  authRequired: false,
  auth0Logout: true,
  baseURL: process.env.BASE_URL,
  clientID: process.env.CLIENT_ID,
  issuerBaseURL: process.env.ISSUER_BASE_URL,
  secret: process.env.SECRET
};


app.use(
  session({
    secret: process.env.SECRET
  })
);


app.use(cookieParser());

var csrfProtection = csrf({ cookie: true })

app.use(cors());

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.loggedIn;
  res.locals.csrfToken = req.csrfToken;
  next();
});

app.use(auth(config));
app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.static(path.join(__dirname, "./public")));

app.use("/", gameRoutes);

mongoose
  .connect(uri)
  .then(result => {
    console.log("port", port);
    app.listen(port);
  })
  .catch(err => {
    console.log(err);
  });
