// Секция, где расположен слайдер
const section = document.querySelector('#section-movies');
// Элементы, задействованные в прокрутке слайдера с картинками 
const sliderImgs = document.querySelectorAll(".img-slider__element"),
      slider = document.querySelector(".img-slider"),
      imgNext = document.querySelector(".mdi-arrow-right"),
      imgPrev = document.querySelector(".mdi-arrow-left");
// Начальное значение сдвига основного блока с картинками
let currentSliderTransform = 0;
// Индекс центральной картинки
let currentSliderImage = Math.floor(slider.children.length / 2);
slider.children[currentSliderImage].classList.add('img-slider__element-current');

// Элементы, которые должны появиться или скрыться после нажатия  кнопок
const backdrop = document.querySelector('#backdrop');
const blockInfo = document.querySelector('#block-info');
// Кнопки для показа контактной  информации на больших экранах
const btnCall = document.querySelector('#btn-call'),
      btnEmail = document.querySelector('#btn-email');
// Кнопки для показа элементов на небольших экранах
const navbarLinks = document.querySelector('#navbar-links');
const navBtns = document.querySelectorAll('.navbar-toggler');

let canWheel = true; //Разрешено ли запускать ф-цию при использовании колесика
let timeoutWheel; //Переменная для хранения setTimeout

// Скрытие блока с контактной  информацией
function removeInfoBlock(target) {
  target.nextElementSibling.classList.remove('info-title');
} 
// Показ и скрытие блока с контактной  информацией
function addInfoBlock(target) {
  target.nextElementSibling.classList.add('info-title');
}

function hideInfoBlock(e) {
  if (e.target == blockInfo ||
    e.target == navBtns[1] ||
    e.target == navBtns[1].children[0] ||
    !blockInfo.className.includes('show-flex')) {
    return;
  }

  blockInfo.classList.toggle('show-flex');
}

// ФУНКЦИИ ДЛЯ СЛАЙДЕРА
function nextImage() {
  const numImgs = (slider.children.length - 1) / 2;
  if (currentSliderTransform <= numImgs * -258.6) {
    return;
  }
  
  slider.style.transform = `translateX(${currentSliderTransform - 258.6}px)`;
  slider.children[currentSliderImage].classList.remove('img-slider__element-current');
  slider.children[currentSliderImage + 1].classList.add('img-slider__element-current');
  currentSliderTransform -= 258.6;
  currentSliderImage += 1;
}
function prevImage() {
  const numImgs = (slider.children.length - 1) / 2;
  if (currentSliderTransform >= numImgs * 258.6) {
    return;
  }
  
  slider.style.transform = `translateX(${currentSliderTransform + 258.6}px)`;
  slider.children[currentSliderImage].classList.remove('img-slider__element-current');
  slider.children[currentSliderImage - 1].classList.add('img-slider__element-current');
  currentSliderTransform += 258.6;
  currentSliderImage -= 1;
}

function resetCanWheel() {
  canWheel = true;
}

function mainWheelHandler(e) {
  if (canWheel) {
    if (e.deltaX > 0) {
      nextImage();
    } else {
      prevImage();
    }
    
    canWheel = false;
  } else {
    clearInterval(timeoutWheel);
    timeoutWheel = setTimeout(resetCanWheel, 100);
  }
}

// Слушатели  событий
// При клике показать  меню быстрого перемещения по разделам сайта
navBtns[0].addEventListener('click', e => {
  e.preventDefault();

  navBtns[0].children[0].classList.toggle('line-to-crest');
  backdrop.classList.toggle('show');
  navbarLinks.classList.toggle('show');
  navbarLinks.parentElement.querySelector('a').classList.add('d-none');
  navBtns[1].classList.toggle('d-none');
});
// Скрыть меню после нажатия  на ссылку
navbarLinks.addEventListener('click', e => {
  if (!navbarLinks.className.includes('show')) {
    return;
  }

  if (e.target.className.includes('nav-item') ||
      e.target.className.includes('nav-link')) {

      navBtns[0].children[0].classList.toggle('line-to-crest');
      backdrop.classList.toggle('show');
      navbarLinks.classList.toggle('show');
      navbarLinks.parentElement.querySelector('a').classList.remove('d-none');
      navBtns[1].classList.toggle('d-none');
  }
});
// При клике показать  контактную  информацию
navBtns[1].addEventListener('click', e => {
  e.preventDefault();

  blockInfo.classList.toggle('show-flex');
});



// При клике на другое место скрывать контактную  информацию
document.addEventListener('click', hideInfoBlock);

// Показ информации при наведении на кнопку
let timeoutOne;
let timeoutTwo;
btnCall.addEventListener('mouseenter', e => {
  addInfoBlock(btnCall);
});
btnEmail.addEventListener('mouseenter', e => {
   addInfoBlock(btnEmail);    
});
// Скрытии информации при перемещении курсора
btnCall.addEventListener('mouseleave', e => {
  timeoutOne = setTimeout(() => {
    removeInfoBlock(btnCall);
  }, 2000);
});

btnEmail.addEventListener('mouseleave', e => {
  timeoutTwo = setTimeout(() => {
    removeInfoBlock(btnEmail);
  }, 2000);
});

// Продолжить показ информации после наведения на информационный блок
btnCall.nextElementSibling.addEventListener('mouseover', e => {
  clearTimeout(timeoutOne);
});
btnEmail.nextElementSibling.addEventListener('mouseover', e => {
   clearTimeout(timeoutTwo);  
});
// Скрыть информацию 
btnCall.nextElementSibling.addEventListener('mouseout', e => {
  timeoutOne = setTimeout(() => {
    removeInfoBlock(btnCall);
  }, 500);
});
btnEmail.nextElementSibling.addEventListener('mouseout', e => {
  timeoutTwo = setTimeout(() => {
    removeInfoBlock(btnEmail);
  }, 500);
});

// Прокрутка слайдера
imgNext.addEventListener('click', nextImage);
imgPrev.addEventListener('click', prevImage);

section.addEventListener('wheel', mainWheelHandler);
