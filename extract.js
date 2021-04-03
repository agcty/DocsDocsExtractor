javascript: (function () {
  // {
  //     question: "",
  //     answers: [
  //       {
  //         content: "blablabala",
  //         isCorrect: false,
  //       },
  //     ],
  //   }

  function extract() {
    let questions = [];

    // 1. frage herauslesen
    const frage = document.getElementsByClassName("panel-heading")[0].innerText;

    // 2. alle möglichen antworten herausfiltern
    const possibleAnswers = document.getElementsByClassName("word-wrap");

    // 3. Text verschönern
    const possibleAnswersTransformed = [];

    for (item of possibleAnswers) {
      const color = window.getComputedStyle(item).color;
      const isCorrect = color == "rgb(61, 148, 215)";

      possibleAnswersTransformed.push({
        content: item.innerText,
        isCorrect: isCorrect,
      });
    }

    questions.push({
      question: frage,
      answers: possibleAnswersTransformed,
    });

    return questions;
  }

  const questions = extract();

  // 4. auf antworten klicken
  const answerButton = document.getElementById("sAnswer");
  //   answerButton.click();

  const nextQuestionButton = document.getElementById("sQuestionNext");

  console.log(questions);

  //   alert(frage.innerHTML);
})();
