const yourNavigation = $(".main-navbar__wrapper");
stickyDiv = "sticky";
yourHeader = $('.fixed-navbar__wrapper').height();

$(window).scroll(function () {
  if ($(this).scrollTop() > yourHeader) {
    yourNavigation.addClass(stickyDiv);
  } else {
    yourNavigation.removeClass(stickyDiv);
  }
});


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
    // console.log(this.prevItem, this.active, this.nextItem);
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
      if (this.prevItem > 0) {
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


const geoLink = document.getElementById('geoLink');
geoLink.addEventListener('click', (e) => {
  e.preventDefault();
  toggleGeoPopup();
})

function toggleGeoPopup() {
  const currentGeo = document.getElementById('currentGeo');
  currentGeo.classList.toggle('hidden');
}

class CitySearch {
  currentLocation = "Белгород"
  locations = [
    "Белгород",
    "Москва",
    "Санкт-Петербург",
    "Екатеринбург",
    "Казань",
    "Воронеж",
    "Ростов-на-Дону",
    "Пермь",
    "Самара",
    "Красноярск",
  ]
  filteredLocations = [
    "Белгород",
    "Москва",
    "Санкт-Петербург",
    "Екатеринбург",
    "Казань",
    "Воронеж",
    "Ростов-на-Дону",
    "Пермь",
    "Самара",
    "Красноярск",
  ]
  searchElem = null;
  resultsElem = null;

  constructor() {
    this.searchElem = document.getElementById("modalSearch");
    this.resultsElem = document.getElementById("searchResults");
    this.searchElem.addEventListener('input', (e) => this.filter(e.target.value));
    this.render();
  }

  filter(searchString) {
    this.filteredLocations = this.locations.filter((i) => i.toLowerCase().includes(searchString.toLowerCase()));
    this.render();
  }

  select(value) {
    this.currentLocation = value;
    this.searchElem.value = value;
    this.filter(value);
    this.render();
  }

  render() {
    this.resultsElem.innerHTML = "";
    for (let item of this.filteredLocations) {
      const elem = document.createElement('div');
      elem.classList.add('search-result');
      elem.innerText = item;
      elem.addEventListener('click', () => this.select(item));
      if (item === this.currentLocation) {
        elem.classList.add('search-result__selected');
      }

      this.resultsElem.appendChild(elem);
    }
  }
}

const citySearch = new CitySearch();


function toggleGeoModal() {
  const geoModal = document.getElementById('geoModal');
  geoModal.classList.toggle('hidden');
}
