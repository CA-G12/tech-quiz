const form = document.querySelector(".quiz-form");
const startBtn = document.querySelector(".start-button");
const inputs = Array.from(document.querySelectorAll("input"));
const categoryErrorMassage = document.querySelector(".error1");
const difficultyErrorMassage = document.querySelector(".error2");
let categoryInputValue;
let difficultyInputValue;



inputs.forEach((input) => {
    input.addEventListener("click", () => {
        checkValidation();
    });
});
function checkValidation() {
    categoryInputValue = document.querySelector('input[name="category"]:checked');
    difficultyInputValue = document.querySelector('input[name="difficulty"]:checked');

    if (categoryInputValue === null) {
        form.setAttribute("onsubmit", "return false");
        setError(categoryErrorMassage);
    } else {
        removeError(categoryErrorMassage);
        form.setAttribute("onsubmit", "return true");

    }

    if (difficultyInputValue === null) {
        setError(difficultyErrorMassage);
        form.setAttribute("onsubmit", "return false");
    } else {
        removeError(difficultyErrorMassage);
    }

    if (categoryInputValue && difficultyInputValue) form.setAttribute("onsubmit", "return true");

}

function setError(ErrorMassageTag) {
    ErrorMassageTag.style.display = "block";
}

function removeError(ErrorMassageTag) {
    ErrorMassageTag.style.display = "none";
}

