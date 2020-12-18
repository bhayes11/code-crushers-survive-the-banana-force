const express = require("express");
const router = express.Router();

const db = require("../models");

router.get("/battle", (req, res) => {
  res.render("battle");
});

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
      res.render("admin", { questions: allQuestions });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/battle/questions", (req,res) => {
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
      res.json(allQuestions);
    })
    .catch((err) => {
      console.log(err);
    });
});
router.get("/battle/characters", (req,res) => {
  db.Character.findAll({
    attributes: [
      "name",
      "health",
    ],
  })
    .then((allCharacters) => {
      res.json(allCharacters);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/questions/:id/edit", (req, res) => {
  db.Question.findOne({
    where: {
      id: req.params.id,
    },
  })
    .then((foundQuestion) => {
      res.json({
        question: foundQuestion.question,
        optionA: foundQuestion.optionA,
        optionB: foundQuestion.optionB,
        optionC: foundQuestion.optionC,
        optionD: foundQuestion.optionD,
        answer: foundQuestion.answer,
        id: foundQuestion.id,
      });
    })
    .catch((err) => {
      console.log(err);
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

router.put("/api/questions/:id", (req, res) => {
  db.Question.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((updatedQuestion) => {
      res.json(updatedQuestion);
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
      res.json(response);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
