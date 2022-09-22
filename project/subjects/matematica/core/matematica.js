const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
var currentLocation = window.location.pathname;
let availableQuestions = [];

let questions_content_1 = [
  {
    question: "Questão de Matemática 1.0",
    choice1: "1",
    choice2: "2",
    choice3: "3",
    choice4: "4",
    choice5: "5",
    answer: 1
},
{
    question: "Questão de Matemática 1.1",
    choice1: "1",
    choice2: "2",
    choice3: "3",
    choice4: "4",
    choice5: "5",
    answer: 1
}
];

let questions_content_2 = [
  {
      question: "Questão de Matemática 2.0",
      choice1: "1",
      choice2: "2",
      choice3: "3",
      choice4: "4",
      choice5: "5",
      answer: 1
  },
  {
      question: "Questão de Matemática 2.1",
      choice1: "1",
      choice2: "2",
      choice3: "3",
      choice4: "4",
      choice5: "5",
      answer: 1
  }
];

//CONSTANTS
const CORRECT_BONUS = 10;
let MAX_QUESTIONS = 0;

//function to determinate the max questions
if(currentLocation == "/study_with_me/project/subjects/matematica/content/matematica_1.html")
  MAX_QUESTIONS = 2;
else  
  MAX_QUESTIONS = 2;

startGame = () => {
  questionCounter = 0;
  score = 0;
  if(currentLocation == "/study_with_me/project/subjects/matematica/content/matematica_1.html")
    availableQuestions = [...questions_content_1];
  else
    availableQuestions = [...questions_content_2];
  getNewQuestion();
};

getNewQuestion = () => {

  if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);
    //go to the end page
    return window.location.assign("/study_with_me/project/end.html");
  }
  questionCounter++;
  progressText.innerText = `Questão ${questionCounter}/${MAX_QUESTIONS}`;
  //Update the progress bar
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  const questionIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionIndex];
  question.innerText = currentQuestion.question;

  choices.forEach(choice => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuestions.splice(questionIndex, 1);
  acceptingAnswers = true;
};

choices.forEach(choice => {
  choice.addEventListener("click", e => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      incrementScore(CORRECT_BONUS);
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

incrementScore = num => {
  score += num;
  scoreText.innerText = score;
};

startGame();