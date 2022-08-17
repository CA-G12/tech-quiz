const nextQuestionButton = document.querySelector('.next');
const submitButton = document.querySelector('.submit');
// ? Getting the category value.
const categoryRadioInputs = document.querySelectorAll('.category-container input');
let selectedCategory = null;
categoryRadioInputs.forEach((radio) => {
  radio.addEventListener('click', (e) => {
    selectedCategory = e.target;
  });
});

const renderQuestions = (array) => {
  const questionsCont = document.querySelector('.questions');
  array.forEach((obj, ind) => {
    const question = document.createElement('section');
    question.classList.add('question');
    question.setAttribute('data-id', ind + 1);
    questionsCont.appendChild(question);

    const questionText = document.createElement('h1');
    questionText.classList.add('question-text');
    questionText.textContent = obj.question;
    question.appendChild(questionText);

    const answersObj = obj.answers;
    Object.keys(answersObj).forEach((answer) => {
      if (answersObj[answer] !== null) {
        const option = document.createElement('p');
        option.classList.add('choice');
        option.textContent = answersObj[answer];
        question.appendChild(option);
      }
    });
  });
  const categorySpan = document.querySelector('.header .category-span');
  categorySpan.textContent = selectedCategory.value;
};

const showNextQuestion = (id) => {
  const questions = document.querySelectorAll('.questions .question');
  questions.forEach((question) => {
    const que = question;
    que.style.display = 'none';
  });
  questions.querySelector(`[data-id=${id}]`).style.display = 'flex';
};

const showSubmitButton = () => {
  const activeQuestion = document.querySelector('.questions .active');
  if (activeQuestion.getAttribute('data-set') === 10) {
    submitButton.style.display = 'block';
    nextQuestionButton.style.display = 'none';
  }
};

const timer = () => {
  const minutes = document.querySelector('.timer .minutes');
  const seconds = document.querySelector('.timer .seconds');
  setInterval(() => {
    let newSeconds = parseInt(seconds.textContent, 10);
    newSeconds += 1;
    if (String(newSeconds).length === 1) {
      seconds.textContent = `0${newSeconds}`;
    }
  }, 1000);
  setInterval(() => {
    let newMinutes = parseInt(minutes.textContent, 10);
    newMinutes += 1;
    if (String(newMinutes).length === 1) {
      minutes.textContent = `0${newMinutes}`;
    }
  }, 60000);
};

timer();

fetch('/quiz')
  .then((jsonData) => jsonData.json())
  .then((array) => () => {
    console.log(array);
    renderQuestions(array);
  })
  .catch((err) => console.log(err));

nextQuestionButton.addEventListener('click', () => {
  const activeQuestion = document.querySelector('.questions .active');
  showNextQuestion(activeQuestion.getAttribute('data-is'));
  showSubmitButton();
});
