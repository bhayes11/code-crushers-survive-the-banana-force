$(document).ready(function () {
  $("#updateQuestion").on("submit", function (e) {
    e.preventDefault();
    const id = $(this).data("id");
    const question = $("#editQuestion").val();
    const optionA = $("#updateOptionA").val();
    const optionB = $("#updateOptionB").val();
    const optionC = $("#updateOptionC").val();
    const optionD = $("#updateOptionD").val();
    const answer = $("#updateAnswer").val();
    console.log(id);
    console.log(question);
    console.log(optionA); 
    console.log(optionB);
    console.log(optionC);
    console.log(optionD);
    console.log(answer);

    $.ajax({
      method: "PUT",
      url: `/api/questions/${id}`,
      data: {
        question,
        optionA,
        optionB,
        optionC,
        optionD,
        answer,
      },
    }).then((response) => {
      console.log(response);
      window.location.replace("/questions");
    });
  });
});
