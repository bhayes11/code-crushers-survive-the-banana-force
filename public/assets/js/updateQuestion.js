$(document).ready(function () {
  $("#updateQuestion").on("submit", function (e) {
    e.preventDefault();
    const id = $(this).data("id");
    const question = $("#question").val();
    const optionA = $("#optionA").val();
    const optionB = $("#optionB").val();
    const optionC = $("#optionC").val();
    const optionD = $("#optionD").val();
    const answer = $("#answer").val();

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
