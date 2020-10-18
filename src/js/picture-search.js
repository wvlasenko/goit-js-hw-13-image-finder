import api from './api-service.js';
import createMarkup from './markups-creator.js';
const debounce = require('debounce');

const refs = {
  input: document.querySelector('#search-form'),
  output: document.querySelector('.gallery'),
  button: document.querySelector('button[data-action="load-more"]'),
};

const inputSearchQuery = refs.input.addEventListener(
  'input',
  debounce(() => {
    api.query = refs.input.elements.query.value;
    refs.output.innerHTML = '';
    api.resetPage();
    buttonDiactivation();
    galleryRender();
  }, 500),
);

function injectMarkup(hits) {
  const markup = createMarkup(hits);
  if (markup !== undefined) {
    refs.output.insertAdjacentHTML('beforeend', markup);
  }
  if (hits.length < 12) {
    buttonDiactivation();
  } else {
    buttonActivation();
  }
}

function galleryRender() {
  if (api.query !== '') {
    api.fetchPictures().then(hits => {
      if (hits.length !== 0) {
        injectMarkup(hits);
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth',
        });
      } else {
        baseInfo();
      }
    });
  }
}

function buttonActivation() {
  refs.button.classList.remove('button-hidden');
  refs.button.classList.add('button');
  refs.button.addEventListener('click', galleryRender);
}

function buttonDiactivation() {
  refs.button.classList.remove('button');
  refs.button.classList.add('button-hidden');
  refs.button.removeEventListener('click', galleryRender);
}
