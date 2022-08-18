const nextQuestionButton = document.querySelector('.next');
const submitButton = document.querySelector('.submit');

const selectedAnswers = [];
const rightAnswers = [];

const renderQuestions = (array) => {
  const questionsCont = document.querySelector('.questions');
  array.forEach((obj, ind) => {
    Object.keys(obj.correct_answers).forEach((ans) => {
      if (obj.correct_answers[ans] === 'true') {
        Object.keys(obj.answers).forEach((answer) => {
          if (ans.slice(0, 8) === answer) {
            rightAnswers.push(obj.answers[answer]);
          }
        });
      }
    });

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
  categorySpan.textContent = array[0].category;
  console.log(rightAnswers);
};

const showNextQuestion = (id) => {
  const numId = +id + 1;
  if (numId <= 10) {
    const questions = document.querySelectorAll('.question');
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, ind) => {
      const dott = dot;
      dott.style.backgroundColor = '#eee';
      if (ind === +id) {
        dott.style.backgroundColor = 'var(--main-two)';
      }
    });
    questions.forEach((question) => {
      const que = question;
      que.style.display = 'none';
      que.classList.remove('active');
    });
    document.querySelector(`[data-id="${numId}"]`).style.display = 'flex';
    document.querySelector(`[data-id="${numId}"]`).classList.add('active');
  }
  if (numId === 10) {
    submitButton.style.display = 'block';
    nextQuestionButton.style.display = 'none';
  }
};

const selectAnswer = (e) => {
  selectedAnswers.push(e.target.textContent);
  e.target.classList.add('selected');
  console.log(selectedAnswers);
};

const countResult = () => {
  let result = 0;
  rightAnswers.slice(1).forEach((answer, ind) => {
    const selected = selectedAnswers.slice(1);
    console.log(answer, '|||', selected[ind]);
    if (answer === selected[ind]) result += 1;
  });
  return result;
};

const showResult = () => {
  const resultCont = document.querySelector('.result-container');
  const congrats = document.querySelector('.congrats');
  const sorry = document.querySelector('.sorry');
  const finalResult = document.querySelector('.result-container .final');

  const score = countResult();
  document.querySelector('.main-content').style.display = 'none';
  resultCont.style.display = 'flex';
  finalResult.textContent = score;
  if (score < 5) {
    congrats.style.display = 'none';
    sorry.style.display = 'block';
  } else {
    congrats.style.display = 'block';
    sorry.style.display = 'none';
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

fetch('/questions')
  .then((jsonData) => jsonData.json())
  .then((array) => {
    console.log(array);
    renderQuestions(array);
  })
  .catch((err) => console.log(err));

nextQuestionButton.addEventListener('click', () => {
  const activeQuestion = document.querySelector('.questions .active');
  const id = activeQuestion.getAttribute('data-id');
  showNextQuestion(id);
});

document.querySelector('.questions').addEventListener('click', selectAnswer);

submitButton.addEventListener('click', showResult);
