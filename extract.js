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

  const images = document.getElementsByClassName("img-fluid");

  const imageList = [];

  for (image of images) {
    imageList.push(image.src);
  }

  if (possibleAnswersTransformed.length > 0) {
    questions.push({
      question: frage,
      answers: possibleAnswersTransformed,
      images: imageList,
    });
  }

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

getData((initialQuestions) => {
  extract(initialQuestions);
});

try {
  document.getElementById("sNextQuestion").click();
} catch (error) {
  console.log("sAnswer not there, skipping");
}

if (document.getElementById("result")) {
  window.location.href = chrome.extension.getURL("result.html");
}
