const express = require("express");

const { requiresAuth } = require("express-openid-connect");

const router = express.Router();

const session = require("express-session");

var csrf = require('csurf');

var csrfProtection = csrf({ cookie: true })


const {
  save,
  index,
  profile,
  myGameList,
  deleteById,
  updateById
} = require("../controllers/game");


router.post("/save", requiresAuth(),  save);

router.get("/", requiresAuth(),  index);

router.get("/profile", requiresAuth(),   profile);

router.get("/my-game-list", requiresAuth(), myGameList);

router.post("/delete-by-id", requiresAuth(), deleteById);

router.post("/update-by-id", requiresAuth(), updateById);

module.exports = router;
