$(document).ready(function () {
  console.log("My new question form will go here.");
  console.log(
    "I can write all my actual code in a javascript file. Not inside a handlebars file. "
  );

  $("#createQuestion").on("submit", function (e) {
    e.preventDefault();
    const question = $("#question").val();
    const optionA = $("#optionA").val();
    const optionB = $("#optionB").val();
    const optionC = $("#optionC").val();
    const optionD = $("#optionD").val();
    const answer = $("#answer").val();
    console.log(question);
    console.log(optionA);
    console.log(optionB);
    console.log(optionC);
    console.log(optionD);
    console.log(answer);

    $.ajax({
      method: "POST",
      url: "/api/questions",
      data: {
        question,
        optionA,
        optionB,
        optionC,
        optionD,
        answer,
      },
    }).then((response) => {
      window.location.replace("/questions");
    });
  });
});
