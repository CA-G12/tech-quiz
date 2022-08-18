const form = document.querySelector('.quiz-form');
const inputs = Array.from(document.querySelectorAll('input'));
const categoryErrorMassage = document.querySelector('.error1');
const difficultyErrorMassage = document.querySelector('.error2');
let categoryInputValue;
let difficultyInputValue;

const setError = (ErrorMassageTag) => {
  const err = ErrorMassageTag;
  err.style.display = 'block';
};

const removeError = (ErrorMassageTag) => {
  const err = ErrorMassageTag;
  err.style.display = 'none';
};

const checkValidation = () => {
  categoryInputValue = document.querySelector('input[name="category"]:checked');
  difficultyInputValue = document.querySelector('input[name="difficulty"]:checked');

  if (categoryInputValue === null) {
    form.setAttribute('onsubmit', 'return false');
    setError(categoryErrorMassage);
  } else {
    removeError(categoryErrorMassage);
    form.setAttribute('onsubmit', 'return true');
  }

  if (difficultyInputValue === null) {
    setError(difficultyErrorMassage);
    form.setAttribute('onsubmit', 'return false');
  } else {
    removeError(difficultyErrorMassage);
  }

  if (categoryInputValue && difficultyInputValue) form.setAttribute('onsubmit', 'return true');
};

inputs.forEach((input) => {
  input.addEventListener('click', checkValidation);
});
