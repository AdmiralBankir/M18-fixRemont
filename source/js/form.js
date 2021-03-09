'use strict';

const form = document.querySelector('.form');
const submnitBtn = form.querySelector('button[type="submit"]');
const successMessage = document.querySelector('#success').content.querySelector('.success').cloneNode(true);

const inputEmail = form.querySelector('input[type="email"]');
const inputsWrapper = form.querySelectorAll('.form__input');

function isValidEmail(email) {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
};

function isInputsValid() {
  return !(Array.from(inputsWrapper).some((input) => {
    return input.classList.contains('form__input--invalid');
  }));
};

function isInputsNotEmpty() {
  let isEmpty = 0;
  const requiredInputs = form.querySelectorAll('input[required]');

  requiredInputs.forEach((input) => {
    isEmpty += (input.value.trim() === '');
  })

  return !isEmpty;
};

const formCtrl = () => {
  submnitBtn.addEventListener('click', (evt) => {
    if(isInputsValid() && isInputsNotEmpty()) {
      form.append(successMessage);
      evt.preventDefault();
    }
  });

  inputEmail.addEventListener('input', (evt) => {
    const input = evt.target;
    const email = input.value;

    if (isValidEmail(email)) {
      input.parentNode.classList.remove('form__input--invalid');
    } else {
      input.parentNode.classList.add('form__input--invalid');
    }

    if (!email) {
      input.parentNode.classList.remove('form__input--invalid');
    }
  });
};

export {
  formCtrl
};
