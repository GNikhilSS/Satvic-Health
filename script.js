const questions = [
  {
    question: "What does HTML stand for",
    answers: [
      { text: "Hyperlinks and Text Markup Language", value: 1 },
      { text: "Home Tool Markup Language", value: 2 },
      { text: "Hyper Text Markup Language", value: 3 },
    ],
  },
  {
    question: "Which HTML tag is used to define an internal stylesheet?",
    answers: [
      { text: "<css>", value: 1 },
      { text: "<style>", value: 2 },
      { text: "<script>", value: 3 },
    ],
  },
  {
    question: "Which CSS property is used to change text color?",
    answers: [
      { text: "font-color", value: 1 },
      { text: "Hetext-color", value: 2 },
      { text: "color", value: 3 },
    ],
  },
];

const questionElement = document.getElementById("questionElement");
const answerElement = document.getElementById("answerElement");
const nextButton = document.getElementById("nextButton");

let currentQuestionIndex = 0;
let A_s = 0;
let B_s = 0;
let C_s = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  A_s = 0;
  B_s = 0;
  C_s = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    const container = document.createElement("div");
    container.classList.add("btn");
    answerElement.appendChild(container);

    let idOverall = "option" + questionNo + answer.value;
    const optionInput = document.createElement("input");
    optionInput.type = "radio";
    optionInput.id = idOverall;
    optionInput.name = "option";
    optionInput.value = answer.value;
    container.appendChild(optionInput);

    const optionLabel = document.createElement("label");
    optionLabel.htmlFor = idOverall;
    optionLabel.textContent = answer.text;
    container.appendChild(optionLabel);

    optionInput.addEventListener("click", selectOption);
  });
  nextButton.style.display = "none";
}

function resetState() {
  answerElement.innerHTML = "";
}

function selectOption() {
  // To select all radio elements
  const options = answerElement.querySelectorAll("input[type='radio']");
  // To change ui for selected option
  Array.from(options).forEach((option) => {
    console.log(option);
    const button = option.parentElement;
    button.classList.remove("correct");
    if (option.checked === true) {
      button.classList.add("correct");
    }
  });
  // To show the 'next' button when option clicked
  nextButton.style.display = "block";
}

function checkOption() {
  console.log(document.querySelectorAll(`input[name="option"]`));
  let selectedBtn = document.querySelector(`input[name="option"]:checked`);
  console.log(selectedBtn);
  let isValue = selectedBtn.value;
  if (isValue === "1") {
    selectedBtn.classList.add("correct");
    A_s = A_s + 1;
  } else if (isValue === "2") {
    selectedBtn.classList.add("correct");
    B_s = B_s + 1;
  } else if (isValue === "3") {
    selectedBtn.classList.add("correct");
    C_s = C_s + 1;
  }
  nextButton.style.display = "block";
}

function handleNextButton() {
  currentQuestionIndex++;
  checkOption();
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

function showScore() {
  resetState();
  questionElement.innerHTML = `A: ${A_s} B: ${B_s} C: ${C_s}`;
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

startQuiz();
