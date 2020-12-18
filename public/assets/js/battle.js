$(document).ready(function () {
  //   DOM Variables
  const qaSection = $("#qaSection");
  const questionSection = $("#questionSection");
  const answerChoices = $("#answerChoices");
  const userProgressBar = $("#userProgressBar");
  const opponentProgressBar = $("#opponentProgressBar");
  const userImage = $("#userImage");
  const opponentImage = $("#opponentImage");
  const animatedGif = $("#animatedGif");
  const opponentSection = $("#opponentSection");
  const audio = $("audio");
  const startBttn = $("#startBttn");
  const battleModal = $("#modal");

  //   JS Variables
  const queryURLQuestions = "/battle/questions";
  const queryURLCharacters = "/battle/characters";
  const correctImage = "/assets/correct.png";
  const incorrectImage = "/assets/incorrect.png";
  const fullUserHealth = 100;
  let questionIndex = 0;
  let opponentIndex = 0;
  let answerValidation;
  let opponent;
  let user = {};
  let questionArray = [];
  let charactersArray = [];
  let opponentsArray = [];
  let qaArray = {};
  const loadArray = [
    qaSection,
    questionSection,
    answerChoices,
    userProgressBar,
    userImage,
    audio,
  ];
  const onloadClearArray = [
    qaSection,
    questionSection,
    answerChoices,
    userProgressBar,
    opponentProgressBar,
    userImage,
    animatedGif,
    opponentImage,
    audio,
  ];

  const charImageArray = [
    "/assets/lauren.png",
    "/assets/peter.png",
    "/assets/crystal.png",
    "/assets/melissa.png",
    "/assets/jonathan.png",
    "/assets/user.png",
  ];

  // FUNCTION DEFINITION

  //ON LOAD
  function onload() {
    battleModal.removeClass("modal");
    battleModal.addClass("modal is-active");
    populateCharactersArray();
    assignOpponentArray();
    console.log(charImageArray);
    mergeImageNames();
    console.log(charactersArray);
    populateQuestionArray();
    console.log(questionArray);
    console.log(qaArray);
    shuffle(questionArray);
    console.log(questionArray);
    for (var i = 0; i < onloadClearArray.length; i++) {
      onloadClearArray[i].addClass("is-hidden");
    }
  }

  // Modal Functions

  function hideModal() {
    battleModal.removeClass("modal is-active");
    battleModal.addClass("modal");
    postModalLoad();
    createUser();
    populateOpponents(opponentIndex);
    populateQuestion(questionIndex);
  }
  //After Modal Closes
  function postModalLoad() {
    for (var i = 0; i < loadArray.length; i++) {
      loadArray[i].removeClass("is-hidden");
    }
    userProgressBar.removeClass();
    userProgressBar.addClass("progress is-success is-large");
    userProgressBar.attr("value", `${fullUserHealth}`);
    userProgressBar.attr("max", `${fullUserHealth}`);
  }

  //Character Functions
  function createUser() {
    console.log(charactersArray);
    user = charactersArray[5];
    user.health = fullUserHealth;
    console.log(user);
  }
  function populateCharactersArray() {
    $.ajax({
      url: queryURLCharacters,
      method: "GET",
      success: function (data) {
        charactersArray = data;
      },
      async: false,
    });
  }

  function mergeImageNames() {
    for (var i = 0; i < charactersArray.length; i++) {
      charactersArray[i].imgSrc = charImageArray[i];
    }
    createUser();
  }

  function assignOpponentArray() {
    for (var i = 0; i < charactersArray.length - 1; i++) {
      opponentsArray[i] = charactersArray[i];
    }
    createUser();
    console.log(opponentsArray);
  }
  // Populate Characters

  function populateOpponents(index) {
    opponentSection.empty();
    opponentProgressBar.removeClass("is-hidden");
    opponentProgressBar.attr("value", `${opponentsArray[index].health}`);
    opponentProgressBar.attr("max", `${opponentsArray[index].health}`);
    opponentProgressBar.addClass("is-success");
    console.log(opponentProgressBar);

    if (opponentIndex > 4) {
      alert("You win");
    } else {
      let opponentImage = `<img id="opponentImage" class="minion animate__animated animate__fadeInUp" src=${opponentsArray[index].imgSrc} alt= "${opponentsArray[index].name}">`;
      console.log(opponentImage);
      opponent = opponentsArray[index];
      console.log(opponent);
      opponentSection.append(opponentImage);
    }
  }
  //Question Functions
  //Populate the Question Array in order to loop questions
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

  //Array that consolidates answer choices to an array
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

  //Populates questions and answer choices
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
  }

  //Shuffles the question array in order to randomize order of question
  function shuffle(array) {
    var currentIndex = array.length,
      temporaryValue,
      randomIndex;

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
  }

  // Validates Answer Selection
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
      animatedGif.removeClass("is-hidden");
      animatedGif.attr("src", `${correctImage}`);

      console.log(answerValidation);
      opponent.health -= 50;
      if (opponent.health === 0) {
        opponentProgressBar.removeClass("is-warning");
        opponentIndex++;
        if (opponentIndex < 5) {
          alert("You win this round");
          user.health = fullUserHealth;
          userProgressBar.attr("value", user.health);
          userProgressBar.removeClass("is-warning");
          userProgressBar.addClass("is-success");
          console.log(opponent.health);
          hideModal();
        } else {
          alert("YOU WON THE GAME. YOU ARE A CODING BEAST!!");
        }
      } else {
        opponentProgressBar.attr(
          "value",
          `${opponentsArray[opponentIndex].health}`
        );
        opponentProgressBar.removeClass("is-success");
        opponentProgressBar.addClass("is-warning");
        console.log(opponent.health);
      }
    } else {
      answerValidation = "Wrong";
      answerChoices.empty();
      answerChoices.append(answerValidation);
      animatedGif.removeClass("is-hidden");
      animatedGif.attr("src", `${incorrectImage}`);
      console.log(answerValidation);
      user.health -= 50;
      if (user.health === 0) {
        userProgressBar.removeClass("is-warning");
        userProgressBar.attr("value", `${user.health}`);
        userImage.empty();
        userImage.attr(`src="/assets/minion_lose.png"`);
        alert("You LOST YOU SUCK");
      } else {
        userProgressBar.attr("value", `${user.health}`);
        userProgressBar.removeClass("is-success");
        userProgressBar.addClass("is-warning");
        console.log(user.health);
      }
    }
    animatedGif.addClass("is-hidden");
    questionIndex++;
    populateQuestion(questionIndex);
  }

  onload();

  // Event Listener
  answerChoices.on("click", checkAnswer);
  startBttn.on("click", hideModal);

  // END
});
