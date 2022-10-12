// Quiz variables
var startBtn = document.querySelector(".button");
var timerEl = document.querySelector("#clock");
var questionEl = document.querySelector("#questions");
var userChoiceEl = document.querySelector("#user-choices");
var feedbackEl = document.querySelector("#feedback");
var questionIndex = 0;
var time = questions.length * 15;
var timerId;

// Quiz functions
startBtn.addEventListener("click",function beginQuiz () {
  var startScreenEl = document.getElementById("start-screen");
  startScreenEl.setAttribute("class", "hide");
  questionEl.removeAttribute("class", "hide");
  timerId = setInterval(setTime, 1000);
  timerEl.textContent = time;
  setQuestions();
});

function setTime() {
  time--;
  timerEl.textContent = time;

  if (time <= 0) {
    quizEnd();
  }
}

function setQuestions() {
  var selectedQuestion = questions[questionIndex];
  var subjectEl = document.getElementById("questions-subject");
  subjectEl.textContent = selectedQuestion.subject;
  userChoiceEl.innerHTML = "";

  selectedQuestion.choices.forEach(function(choice, i) {
    var userChoice = document.createElement("button");
    userChoice.setAttribute("class", "choice");
    userChoice.setAttribute("value", choice);

    userChoice.textContent = i + 1 + ". " + choice;
    userChoice.onclick = questionFeedback;
    userChoiceEl.appendChild(userChoice);
  });
}

function questionFeedback() {
    if (this.value !== questions[questionIndex].answer) {
        // penalize time
        time -= 15;
    
        if (time < 0) {
          time = 0;
        }
        timerEl.textContent = time;
        feedbackEl.textContent = "Incorrect!";
        feedbackEl.style.color = "red";
        feedbackEl.style.textAlign = "center"
        feedbackEl.style.fontSize = "400%";
    } else {
        feedbackEl.textContent = "Correct!";
        feedbackEl.style.color = "green";
        feedbackEl.style.textAlign = "center"
        feedbackEl.style.fontSize = "400%";
    }
  // 
  feedbackEl.setAttribute("class", "feedback");
  setTimeout(function() {
    feedbackEl.setAttribute("class", "feedback hide");
  }, 1000);

  // next question
  questionIndex++;

  // time checker
  if (questionIndex === questions.length) {
    quizEnd();
  } else {
    setQuestions();
  }
}

function quizEnd() {
  // stop timer
  clearInterval(timerId);

  // show end screen
  var endScreenEl = document.getElementById("end-screen");
  endScreenEl.removeAttribute("class");

  // show final score
  var finalScoreEl = document.getElementById("final-score");
  finalScoreEl.textContent = time;

  // hide questions section
  questionEl.setAttribute("class", "hide");
}
