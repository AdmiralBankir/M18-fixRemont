'use strict';

const form = document.querySelector('.form');
const submnitBtn = form.querySelector('button[type="submit"]');
const successMessage = document.querySelector('#success').content.querySelector('.success').cloneNode(true);

const inputEmail = form.querySelector('input[type="email"]');

function isValidEmail(email) {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
}

const formCtrl = () => {
  submnitBtn.addEventListener('click', (evt) => {
    evt.preventDefault();
    form.append(successMessage);
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
