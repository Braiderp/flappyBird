const express = require("express");

const { requiresAuth } = require("express-openid-connect");

const router = express.Router();

const {
  save,
  index,
  profile,
  myGameList,
  deleteById
} = require("../controllers/game");

router.post("/save", requiresAuth(), save);

router.get("/", requiresAuth(), index);

router.get("/profile", requiresAuth(), profile);

router.get("/my-game-list", requiresAuth(), myGameList);

router.post("/delete-by-id", requiresAuth(), deleteById);
module.exports = router;
