function extract(initialQuestions) {
  console.log(initialQuestions);
  let questions = initialQuestions || [];

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

  setData(questions, () => null);

  console.log(questions);

  return questions;
}

function getData(callback) {
  // expects function(value){...}
  chrome.storage.local.get("questiondata", function (data) {
    if (data.questiondata === undefined) {
      callback([]); // default value
    } else {
      callback(data.questiondata);
    }
  });
}

function setData(value, callback) {
  // expects function(){...}
  chrome.storage.local.set({ questiondata: value }, function () {
    if (chrome.runtime.lastError) {
      throw Error(chrome.runtime.lastError);
    } else {
      callback();
    }
  });
}

try {
  document.getElementById("sAnswer").click();
} catch (error) {
  console.log("sAnswer not there, skipping");
}

getData((initialQuestions) => extract(initialQuestions));

try {
  document.getElementById("sNextQuestion").click();
} catch (error) {
  console.log("sAnswer not there, skipping");
}

// const questions = extract();

// 4. auf antworten klicken
