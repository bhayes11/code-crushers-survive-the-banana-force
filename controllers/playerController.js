const express = require("express");
const router = express.Router();

const db = require("../models");

router.get("/questions", (req, res) => {
  db.Question.findAll({
    attributes: [
      "id",
      "question",
      "optionA",
      "optionB",
      "optionC",
      "optionD",
      "answer",
    ],
  })
    .then((allQuestions) => {
      console.log(allQuestions);
      res.render("admin", { questions: allQuestions });
      // res.json(allQuestions);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/player/new", (req, res) => {
  res.render("new-player");
});

router.get("/players/:id/edit", (req, res) => {
  db.Player.findOne({
    where: {
      id: req.params.id,
    },
  }).then((foundPlayer) => {
    console.log(foundPlayer.email);
    res.render("edit-player", {
      email: foundPlayer.email,
      password: foundPlayer.password,
      firstName: foundPlayer.firstName,
      lastName: foundPlayer.lastName,
      id: foundPlayer.id,
    });
  });
});

router.post("/api/questions", (req, res) => {
  db.Question.create(req.body)
    .then((newPlayer) => {
      res.json(newPlayer);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.put("/api/players/:id", (req, res) => {
  db.Player.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((updatedPlayer) => {
      res.json(updatedPlayer);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.delete("/api/questions/:id", (req, res) => {
  db.Question.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((response) => {
      console.log(response);
      res.json(response);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
