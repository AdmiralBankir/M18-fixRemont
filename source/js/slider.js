'use strict';

import {
  debounce
} from './debounce.js';

class Slider {
  constructor(sliderLink) {
    this.slider = sliderLink;
    this.slides = this.slider.querySelectorAll('.slider__item');
    this.style = getComputedStyle(this.slider);
    this.slideWidth = this.style.getPropertyValue('--slide-width');
    this.slideGap = this.style.getPropertyValue('--slide-gap');
    this.sliderStep = 0;
    this.progress = 0;
    this.activeSlide = 0;
    this.maxProgress = 0;
    this.numOfSlides = this.slides.length;
    this.clickInterval = 1000;
  };

  initSlider() {
    (this.slideWidth + this.slideGap).match(/\d+/g).forEach((item) => {
      this.sliderStep += +item
    })

    this.activeSlide = Math.floor(this.numOfSlides / 2);
    this.maxProgress = (this.numOfSlides - 1) * this.sliderStep;

    this.progress = -this.activeSlide * this.sliderStep;
    this.update();
  }

  step(direction) {
    this.slides[this.activeSlide].classList.remove('slider__item--active');

    this.progress += direction * this.sliderStep;
    this.activeSlide -= direction;

    if (Math.abs(this.progress) > this.maxProgress) {
      this.progress = this.maxProgress
      this.activeSlide = this.numOfSlides - 1;
    }

    if (this.progress > 0) {
      this.progress = 0;
      this.activeSlide = 0;
    }

    this.update();
  };

  update() {
    this.slider.style = `transform: translateX(${this.progress}` + 'px)';
    this.slides[this.activeSlide].classList.add('slider__item--active');
  };
};

const initSlider = () => {
  const sliderLink = document.querySelector('.slider');
  const slider = new Slider(sliderLink);
  slider.initSlider();

  const btnPrev = document.querySelector('.slider__btn--prev');
  const btnNext = document.querySelector('.slider__btn--next');

  const onBtnSliderClick = debounce(slider.step, slider.clickInterval).bind(slider);

  btnPrev.addEventListener('click', () => onBtnSliderClick(1));
  btnNext.addEventListener('click', () => onBtnSliderClick(-1));

};

export {
  initSlider
};
