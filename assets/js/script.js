// Quiz variables
var startBtn = document.querySelector(".button");
var enterBtn = document.querySelector("#enter");
var timerEl = document.querySelector("#clock");
var questionEl = document.querySelector("#questions");
var userChoiceEl = document.querySelector("#user-choices");
var feedbackEl = document.querySelector("#feedback");
var initialsEl = document.querySelector("#user-initials");
var questionIndex = 0;
var time = questions.length * 15;
var timerId;

// Quiz functions

// Start button event listener
startBtn.addEventListener("click",function beginQuiz () {
  var startScreenEl = document.getElementById("start-screen");
  startScreenEl.setAttribute("class", "hide");
  questionEl.removeAttribute("class", "hide");
  timerId = setInterval(setTime, 1000);
  timerEl.textContent = time;
  setQuestions();
});

// Running timer
function setTime() {
  time--;
  timerEl.textContent = time;

  if (time <= 0) {
    endQuiz();
  }
}

// Question selector
function setQuestions() {
  var selectedQuestion = questions[questionIndex];
  var subjectEl = document.getElementById("questions-subject");
  subjectEl.textContent = selectedQuestion.subject;

//   Clears previous question choices
  userChoiceEl.innerHTML = "";

// Creats buttons for each choice
  selectedQuestion.choices.forEach(function(choice, i) {
    var userChoice = document.createElement("button");
    userChoice.setAttribute("class", "choice");
    userChoice.setAttribute("value", choice);

    userChoice.textContent = i + 1 + ". " + choice;
    userChoice.onclick = questionFeedback;
    userChoiceEl.appendChild(userChoice);
  });
}

// Answer feedback
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

  feedbackEl.setAttribute("class", "feedback");
  setTimeout(function() {
    feedbackEl.setAttribute("class", "feedback hide");
  }, 1000);

  // Next question
  questionIndex++;

  // Time evaluator
  if (questionIndex === questions.length) {
    endQuiz();
  } else {
    setQuestions();
  }
}

// End quiz function
function endQuiz() {
  clearInterval(timerId);
  var endScreenEl = document.getElementById("end-screen");
  endScreenEl.removeAttribute("class");

  var finalScoreEl = document.getElementById("final-score");
  finalScoreEl.textContent = time;

  questionEl.setAttribute("class", "hide");
}

enterBtn.addEventListener("click", function saveUserScore() {
  var initials = initialsEl.value.trim();

  if (initials !== "") {
    // Get saved scores from localstorage, or set to empty array
    var highscores =
      JSON.parse(window.localStorage.getItem("user-scores")) || [];

    // New score object for new user
    var newScore = {
      score: time,
      initials: initials
    };

    // Save to localstorage
    highscores.push(newScore);
    window.localStorage.setItem("user-scores", JSON.stringify(highscores));

    // Takes user to next page
    window.location.href = "scores.html";
  }
});
