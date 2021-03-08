'use strict';

class Slider {
  constructor(sliderLink) {
    this.slider = sliderLink;
    this.style = getComputedStyle(this.slider);
    this.slideWidth = this.style.getPropertyValue('--slide-width');
    this.slideGap = this.style.getPropertyValue('--slide-gap');
    this.sliderStep = 0;
    this.progress = 0;
    this.maxProgress = 0;
    this.numOfSlides = this.slider.querySelectorAll('.slider__item').length;
  };

  initSlider() {
    (this.slideWidth + this.slideGap).match(/\d+/g).forEach((item) => {
      this.sliderStep += +item
    })

    this.maxProgress = (this.numOfSlides - 1) * this.sliderStep;
  }

  step(direction) {
    this.progress += direction * this.sliderStep;

    if (Math.abs(this.progress) > this.maxProgress) {
      this.progress = this.maxProgress
    }

    if (this.progress > 0) {
      this.progress = 0;
    }

    this.update();
  };

  update() {
    this.slider.style = `transform: translateX(${this.progress}` + 'px)';
  };
}

const initSlider = () => {
  const sliderLink = document.querySelector('.slider');
  const slider = new Slider(sliderLink);
  slider.initSlider();

  const btnPrev = document.querySelector('.slider__btn--prev');
  const btnNext = document.querySelector('.slider__btn--next');

  btnPrev.addEventListener('click', () => slider.step(1));
  btnNext.addEventListener('click', () => slider.step(-1));

};

export {
  initSlider
};
