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

//   res.render("new-player");router.get("/player/new", (req, res) => {
// });

router.get("/questions/:id/edit", (req, res) => {
  db.Question.findOne({
    where: {
      id: req.params.id,
    },
  })
    .then((foundQuestion) => {
      console.log(foundQuestion.question);
      res.render("updateQuestion", {
        question: foundQuestion.question,
        optionA: foundQuestion.optionA,
        optionB: foundQuestion.optionB,
        optionC: foundQuestion.optionC,
        optionD: foundQuestion.optionD,
        answer: foundQuestion.answer,
        id: foundQuestion.id,
      });
      console.log(foundQuestion.optionD);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/api/questions", (req, res) => {
  db.Question.create(req.body)
    .then((newQuestion) => {
      res.json(newQuestion);
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
      console.log(response);
      res.json(response);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
