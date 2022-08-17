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

fetch('/quiz')
  .then((jsonData) => jsonData.json())
  .then((array) => () => {
    console.log(array);
    renderQuestions(array);
  })
  .catch((err) => console.log(err));
