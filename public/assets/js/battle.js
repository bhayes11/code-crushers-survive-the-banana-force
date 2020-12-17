$(document).ready(function () {
  const questionSection = $("#questionSection");
  const answerChoices = $("#answerChoices");
  const queryURLQuestions = "/battle/questions";
  const queryURLCharacters = "/battle/characters";
  let questionIndex = 0;
  let answerValidation;
  let questionArray = [];
  let charactersArray = [];
  let qaArray = {};
  const charImageArray = ["/assets/minion_armor.jpg","/assets/minion_no_armor.jpg","/assets/minion_armor.jpg","/assets/minion_no_armor.jpg","/assets/minion_armor.jpg","/assets/minion_armor.jpg"]

  function populateCharactersArray(){
    $.ajax({
        url: queryURLCharacters,
        method: "GET",
        success: function (data) {
          charactersArray = data;
        },
        async: false,
      });
    };
  populateCharactersArray();
  console.log(charImageArray);
  mergeImageNames();
  
  console.log(charactersArray)
  function mergeImageNames(){
    for (var i=0; i<charactersArray.length;i++){
    charactersArray[i].imgSrc = charImageArray[i];
    };
  };
  
  function populateQuestionArray() {
    $.ajax({
      url: queryURLQuestions,
      method: "GET",
      success: function (data) {
        questionArray = data;
      },
      async: false,
    });
  }
  populateQuestionArray();
  console.log(questionArray);
  
  function updateQaARRAY() {
    qaArray = {
      question: questionArray[questionIndex].question,
      choices: [
        questionArray[questionIndex].optionA,
        questionArray[questionIndex].optionB,
        questionArray[questionIndex].optionC,
        questionArray[questionIndex].optionD,
      ],
      answer: questionArray[questionIndex].answer,
    };
  }
  console.log(qaArray);

  function populateQuestion(index) {
    questionSection.empty();
    answerChoices.empty();
    questionSection.append(questionArray[index].question);
    updateQaARRAY();
    for (var i = 0; i < qaArray.choices.length; i++) {
      const answerBttns = document.createElement("button");
      answerBttns.setAttribute("data-index", i);
      answerBttns.setAttribute(
        "class",
        "button is-warning is-rounded is-small my-3 is-fullwidth"
      );

      answerBttns.append(qaArray.choices[i]);
      answerChoices.append(answerBttns);
    }
  };

  function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  };
  shuffle(questionArray);
  console.log(questionArray);



  populateQuestion(questionIndex);
  // console.log(questionArray);
  function checkAnswer(event) {
    let answerIndex = event.target.getAttribute("data-index");
    event.preventDefault();

    if (
      event.target.matches("button") &&
      qaArray.choices[answerIndex] === questionArray[questionIndex].answer
    ) {
      answerValidation = "Correct!";
      answerChoices.empty();
      answerChoices.append(answerValidation);
      console.log(answerValidation);
    } else {
      answerValidation = "Wrong";
      answerChoices.empty();
      answerChoices.append(answerValidation);
      console.log(answerValidation);
    }

    questionIndex++;
    setTimeout(populateQuestion(questionIndex), 3000);
  }

  // Event Listener
  answerChoices.on("click", checkAnswer);

  // END
});

// "/battle/characters"