const restartButton = document.getElementById("restart");
const aButton = document.getElementById("a");
const bButton = document.getElementById("b");
const cButton = document.getElementById("c");
const questionText = document.getElementById("question-text");
const startButton = document.getElementById("start");
const startScreen = document.getElementById("start-screen");
const questionsBlock = document.getElementById("question-area");
const userScore = document.getElementById("user-score");
const submitInitials = document.getElementById("submit-initials");
const initials = document.getElementById("initials");
const submitForm = document.getElementById("submitForm");
const scores = "high scores";
const highScoreString = localStorage.getItem("high scores");
const highScores = JSON.parse(highScoreString) ?? [];
let gameRoundRecords = null;
const answerType = document.getElementById("answerType");
const nameScoresContainer = document.getElementById("nameScoresContainer");

let currentQuestion = 0;
var score = 0;
var secondsLeft = 120;

//initialize gamerounds from localstorage
const localStorageResult = localStorage.getItem("gameRoundRecords" ?? "[]");
const lastGameReound = JSON.parse(localStorageResult);
gameRoundRecords = new Map(lastGameReound);
showPlayerScores(gameRoundRecords);
// a series of multiple choice questions

let questions = [
  {
    question: "Which built-in method combines the text of two strings and returns a new string?",
    answers: {
      a: "append()",
      b: "concat()",
      c: "attach()",
    },
    correctAnswer: "b",
    answer: "concat()",
    options: ["append()", "concat()", "attach()"],
  },

  {
    questNumber: 2,
    question: "Which JavaScript label catches all the values, except for the ones specified?",
    answers: {
      a: "catch",
      b: "label",
      c: "default",
    },
    correctAnswer: "c",
    answer: "default",
    options: ["catch", "label", "default"],
  },

  {
    questNumber: 3,
    question: "What will the following code return? Boolean(2<8)",
    answers: {
      a: "true",
      b: "false",
      c: "NaN",
    },
    correctAnswer: "a",
    answer: "true",
    options: ["true", "false", "NaN"],
  },
];

// option for restart button
restartButton.addEventListener("click", restart);

// create a function to generate questions
function createQuestion() {
  questionText.innerHTML = questions[currentQuestion].question;
  aButton.innerHTML = questions[currentQuestion].answers.a;

  aButton.onclick = () => {
    // if (questions[currentQuestion].correctAnswer === "a") {
    //   if (score < 3) {
    //     score++;
    //   }
    // }
    // userScore.innerHTML = score;
    // next();
    checkAnswer("a");
  };

  bButton.innerHTML = questions[currentQuestion].answers.b;
  bButton.onclick = () => {
    checkAnswer("b");
  };

  cButton.innerHTML = questions[currentQuestion].answers.c;
  cButton.onclick = () => {
    // if (questions[currentQuestion].correctAnswer === "a") {
    //   if (score < 3) {
    //     score++;
    //   }
    // }
    // userScore.innerHTML = score;
    // next();

    checkAnswer("c");
  };
}

// create a function to check answers correct or wrong
function checkAnswer(answerOption) {
  if (questions[currentQuestion].correctAnswer === answerOption) {
    // correctAnswer
    answerType.textContent = "Correct answer";
    score++;
  } else {
    //wrong answer
    answerType.textContent = "Wrong answer";
  }
  userScore.innerHTML = score;

  //go to next question after 5 seconds delay
  setTimeout(() => {
    next();
  }, 2_000);
}

function showStartButton() {
  startButton.classList.remove("hidden");
}

// function to call questions
function showQuestionBlock() {
  questionsBlock.classList.remove("hidden");
}

// function to hide start screen
function hideStartScreen() {
  startScreen.classList.add("hidden");
}

startButton.addEventListener("click", () => {
  // alert("Quiz Started");

  showStartButton();
  showQuestionBlock();
  hideStartScreen();
  answerType.textContent = "...";

  createQuestion();
  // createNextQuestion();

  setInterval(function () {
    // console.log(secondsLeft);
    time.innerText = secondsLeft;
    secondsLeft--;
  }, 1000);
});
function restart() {
  currentQuestion = 0;
  aButton.classList.remove("hide");
  bButton.classList.remove("hide");
  cButton.classList.remove("hide");
  score = 0;
  userScore.innerHTML = score;
  secondsLeft = 120;
  createQuestion();

  window.location.reload();
}

function next() {
  currentQuestion++;
  if (currentQuestion > 2) {
    endQuiz();
  } else {
    createQuestion();
  }

  answerType.textContent = "...";
}

function endQuiz(score) {
  alert("Quiz Ended!");

  questionsBlock.classList.add("hidden");
  submitInitials.classList.remove("hidden");
}

function addNameAndScoreToLocalStorage(name, score) {
  // console.table({ name, score });

  gameRoundRecords.set(name, score);
  localStorage.setItem("gameRoundRecords", JSON.stringify([...gameRoundRecords]));
}

function showPlayerScores(_gameRoundRecords) {
  const nameScoresHtml = [...gameRoundRecords]
    .map((round) => {
      const [name, _score] = round;
      return `<li>Name: ${name}  Score: ${_score}</li>`;
    })
    .join("");

  nameScoresContainer.innerHTML = nameScoresHtml;
}

submitForm.addEventListener("submit", (event) => {
  event.preventDefault();
  var input = initials.value;
  console.log(input);

  addNameAndScoreToLocalStorage(event.target.elements.initial.value, score);

  showPlayerScores(gameRoundRecords);

  //  get the name
  //  get the score
  //  save both to localStorage
  //
});