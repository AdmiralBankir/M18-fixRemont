'use strict';

const form = document.querySelector('.form');
const submnitBtn = form.querySelector('button[type="submit"]');
const successMessage = document.querySelector('#success').content.querySelector('.success').cloneNode(true);

const formCtrl = () => {
  submnitBtn.addEventListener('click', (evt) => {
    evt.preventDefault();
    form.append(successMessage);
  });
};

export {
  formCtrl
};
