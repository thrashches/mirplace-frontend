class Slider {
  elemId = null;
  elem = null;
  sliderItems = [];
  prevItem = null
  active = 0;
  nextItem = 1;
  interval = null;
  prevControl = null;
  nextControl = null

  constructor(elemId, interval) {
    this.elemId = elemId;
    this.interval = interval;
    this.elem = document.getElementById('slider');
    this.sliderItems = this.elem.querySelectorAll('.slider__item');
    this.prevItem = this.sliderItems.length - 1;
    const sliderControls = this.elem.querySelectorAll('.slider__controls__btn');
    if (sliderControls.length === 2) {
      this.prevControl = sliderControls[0];
      this.nextControl = sliderControls[1];
    }
    if (this.prevControl && this.nextControl) {
      this.prevControl.addEventListener('click', () => this.prev());
      this.nextControl.addEventListener('click', () => this.next());
    }

    setInterval(() => this.next(), this.interval);
  }

  next() {
    this.sliderItems[this.prevItem].classList.toggle('prev');
    this.sliderItems[this.active].classList.toggle('active');
    this.sliderItems[this.nextItem].classList.toggle('next');
    console.log(this.prevItem, this.active, this.nextItem);
    if (this.active + 1 < this.sliderItems.length && this.nextItem + 1 < this.sliderItems.length) {
      this.prevItem = this.active;
      this.active = this.nextItem;
      this.nextItem += 1;
    } else if (this.active + 1 < this.sliderItems.length && this.nextItem + 1 === this.sliderItems.length) {
      this.prevItem = this.active;
      this.active = this.nextItem;
      this.nextItem = 0;
    } else {
      this.prevItem = this.sliderItems.length - 1;
      this.active = 0;
      this.nextItem = 1;
    }
    this.sliderItems[this.prevItem].classList.toggle('prev');
    this.sliderItems[this.active].classList.toggle('active');
    this.sliderItems[this.nextItem].classList.toggle('next');
  }

  prev() {
    this.sliderItems[this.prevItem].classList.toggle('prev');
    this.sliderItems[this.active].classList.toggle('active');
    this.sliderItems[this.nextItem].classList.toggle('next');
    if (this.active - 1 >= 0) {
      if (this.prevItem > 0){
        this.prevItem = this.active - 2;
      } else {
        this.prevItem = this.sliderItems.length - 1;
      }
      this.nextItem = this.active;
      this.active -= 1;
    } else {
      this.active = this.sliderItems.length - 1;
      this.nextItem = 0;
      this.prevItem = this.active - 1;
    }
    this.sliderItems[this.prevItem].classList.toggle('prev');
    this.sliderItems[this.active].classList.toggle('active');
    this.sliderItems[this.nextItem].classList.toggle('next');
  }
}


const slider = new Slider('slider', 8000);
