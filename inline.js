function getData(callback) {
  chrome.storage.local.get("questiondata", function (data) {
    if (data.questiondata === undefined) {
      callback([]); // default value
    } else {
      callback(data.questiondata);
    }
  });
}

getData((questions) => {
  var rootDiv = document.createElement("div");

  for (item of questions) {
    var questionDiv = document.createElement("div");
    questionDiv.style.marginTop = "20px";

    var questionHeading = document.createElement("h2");
    questionHeading.innerText = item.question;

    questionDiv.appendChild(questionHeading);

    var answerOl = document.createElement("ul");

    for (answer of item.answers) {
      var listElement = document.createElement("li");
      listElement.innerText = answer.content.trim();

      if (answer.isCorrect) {
        listElement.style.color = "green";
      }

      answerOl.appendChild(listElement);
    }

    questionDiv.appendChild(answerOl);

    rootDiv.appendChild(questionDiv);
  }

  //   div.innerHTML = JSON.stringify(questions);

  document.body.appendChild(rootDiv);
});
