const Game = require("../modules/game");
const { Schema } = require("mongoose");

const { ObjectId } = Schema.Types;

exports.save = async (req, res, next) => {
  try {
    console.log("req", req.body);
    const { score } = req.body;
    const { email } = req.oidc.user;
    const game = await Game.create({ email, score });
    return res.json(game);
  } catch (e) {
    console.log(e);
  }
};

exports.index = async (req, res) => {
  res.render("index", {
    path: "/"
  });
};

exports.profile = async (req, res, next) => {
  const { email, name, picture } = req.oidc.user;

  res.render("profile", {
    path: "/profile",
    email,
    name,
    picture: picture || ""
  });
};

exports.myGameList = async (req, res, next) => {
  const { email } = req.oidc.user;
  let gameList = await Game.find({ email });
  console.log("gamelist", gameList);
  let list = gameList;
  res.render("my-game-list", {
    path: "/my-game-list",
    gameList: list
  });
};

exports.deleteById = async (req, res, next) => {
  try {
    const { id } = req.body;
    console.log("id", id);
    await Game.deleteOne({ _id: id });
    return res.redirect("/my-game-list");
  } catch (e) {
    console.log(e);
  }
};
