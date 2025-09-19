const questions = [
    {
        question: "What does HTML stand for",
        answers : [
            {text: "Hyperlinks and Text Markup Language", value: 1},
            {text: "Home Tool Markup Language", value: 2},
            {text: "Hyper Text Markup Language", value: 3},
        ]
    }, 
    {
        question: "Which HTML tag is used to define an internal stylesheet?",
        answers : [
            {text: "<css>", value: 1},
            {text: "<style>", value: 2},
            {text: "<script>", value: 3},
        ]
    },
    {
        question: "Which CSS property is used to change text color?",
        answers : [
            {text: "font-color", value: 1},
            {text: "Hetext-color", value: 2},
            {text: "color", value: 3},
        ]
    },
    {
        question: "How do you add a comment in CSS?",
        answers : [
            {text: "// comment", value: 1},
            {text: "<!-- comment -->", value: 2},
            {text: "/* comment */", value: 3},
        ]
    },
    {
        question: "Which JavaScript method is used to select an element by ID?",
        answers : [
            {text: "getElementsByClassName()", value: 1},
            {text: "getElementById()", value: 2},
            {text: "querySelectorAll()", value: 3},
        ]
    },
    {
        question: "What does DOM stand for?",
        answers : [
            {text: "Document Object Mapping", value: 1},
            {text: "Data Object Model", value: 2},
            {text: "Document Object Model", value: 3},
        ]
    },
    {
        question: "Which of the following is NOT a valid JavaScript data type?",
        answers : [
            {text: " String", value: 1},
            {text: "Boolean", value: 2},
            {text: "Float", value: 3},
        ]
    },
    {
        question: "Which CSS property is used to make a website responsive?",
        answers : [
            {text: "position", value: 1},
            {text: "transition", value: 2},
            {text: "media", value: 3},
        ]
    },
    {
        question: "In React, what is used to pass data from parent to child component?",
        answers : [
            {text: "Props", value: 1},
            {text: "State", value: 2},
            {text: "Context", value: 3},
        ]
    },
    {
        question: "Which attribute is used in HTML to provide alternate text for an image?",
        answers : [
            {text: "alt", value: 1},
            {text: "title", value: 2},
            {text: "src", value: 3},
        ]
    },
]

const questionElement = document.getElementById("questionElement");
const answerElement = document.getElementById("answerElement");
const nextButton = document.getElementById("nextButton");

let currentQuestionIndex = 0;
let A_s = 0;
let B_s = 0;
let C_s = 0;
 
function startQuiz(){
    currentQuestionIndex = 0;
    A_s = 0;
    B_s = 0;
    C_s = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer =>{
        const container = document.createElement("div");
        container.classList.add("btn");
        answerElement.appendChild(container);

        let idOverall = "option" + answer.value;
        const optionInput = document.createElement("input");
        optionInput.type = "radio"
        optionInput.id = idOverall;
        optionInput.name = "option" + questionNo;
        optionInput.value = answer.value;
        container.appendChild(optionInput);

        const optionLabel = document.createElement("label");
        optionLabel.htmlFor = idOverall;
        optionLabel.textContent = answer.text;
        container.appendChild(optionLabel); 


        container.addEventListener("click", selectAnswer);
    });
    nextButton.style.display = "none";
}

function resetState(){
    answerElement.innerHTML = "";
}

function selectAnswer(e){
    let selectedBtn = e.target;
    let isvalue = selectedBtn.dataset.value;
    if (isvalue === "1"){
        selectedBtn.classList.add("correct");
        A_s = A_s + 1;
    } else if (isvalue === "2"){
        selectedBtn.classList.add("correct");
        B_s = B_s + 1;
    } else if (isvalue === "3"){
        selectedBtn.classList.add("correct");
        C_s = C_s + 1;
    }
    // Array.from(answerElement.children).forEach(button =>{
    //     if(button.dataset.value === "true"){
    //         button.classList.add("correct");
    //     }
    //     button.disabled = true;
    // });
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex ++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }
    else{
        showScore();
    }
}

function showScore(){
    resetState();
    questionElement.innerHTML = `A: ${A_s} B: ${B_s} C: ${C_s}`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }
    else{
        startQuiz();
    }
});

startQuiz()