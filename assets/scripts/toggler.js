const togglers = {
  'about': {
    // То, на чем смотрим события
    containerToggler: document.querySelector('[data-elem-about]'),
    // То, что будем двигать
    togglerLine: document.querySelector('.about-toggler'),
    currentElem: 0,
    autoIdx: 0,
    currentOffset: 0,
    // То, к чему применяем изменение цвета
    btnsToggler: document.querySelector('[data-elem-about]').querySelectorAll('[data-elem-toggler]')
  },
  'plan': {
    containerToggler: document.querySelector('[data-elem-plan]'),
    togglerLine: document.querySelector('.plan-toggler'),
    currentElem: 0,
    autoIdx: 0,
    currentOffset: 0,
    btnsToggler: document.querySelector('[data-elem-plan]').querySelectorAll('[data-elem-toggler]')
  },
  'price': {
    containerToggler: document.querySelector('[data-elem-price]'),
    togglerLine: document.querySelector('.price-toggler'),
    currentElem: 0,
    autoIdx: 0,
    currentOffset: 0,
    btnsToggler: document.querySelector('[data-elem-price]').querySelectorAll('[data-elem-toggler]')
  }
};
const toggs = [
  togglers['about'],
  togglers['plan'],
  togglers['price']
];

let pageWidth = window.innerWidth;
let timer = null;
const time = 10000;

let canToggle = true;
let toggleTimeout = null;

autoChangeElem();


// FUNCTIONS
// Переключение цвета 
function switchBtn(idx, target) {
  let btns = target['btnsToggler'];
  let currentElem = target['currentElem'];

  btns[idx].classList.toggle('toggler-active');
  btns[currentElem].classList.toggle('toggler-active');
}

// Смена элементов
function changeElem(idx, target) {
  if (idx === target['currentElem']) {
    return;
  } else if (idx < 0) {
  	idx = target.btnsToggler.length - 1;
  } else if (idx > target.btnsToggler.length - 1) {
  	idx = 0;
  }

  switchBtn(idx, target);

  if (idx > target['currentElem']) {
    let offset = (idx - target['currentElem']) * 100;

    target['togglerLine'].style.transform = `translateX(${target['currentOffset'] - offset}%)`;
    target['currentOffset'] -= offset;
  }
  if (idx < target['currentElem']) {
    let offset = (target['currentElem'] - idx) * 100;

    target['togglerLine'].style.transform = `translateX(${target['currentOffset'] + offset}%)`;
    target['currentOffset'] += offset;
  }

  target['currentElem'] = idx;
  target['autoIdx'] = idx;
}

// Автоматическая смена элементов
function autoChangeElem() {
  if (pageWidth < 768) {
    timer = setInterval(() => {

      changeElem(togglers['plan'].autoIdx, togglers['plan']);
      changeElem(togglers['about'].autoIdx, togglers['about']);
      changeElem(togglers['price'].autoIdx, togglers['price']);

      changeAutoIdx();

    }, time)
  }
}

function changeAutoIdx() {
  const arr = [togglers['about'], togglers['price'], togglers['plan']];

  arr.forEach(toggler => {
    if (toggler.autoIdx === toggler.btnsToggler.length - 1) {
      toggler.autoIdx = 0;
    } else {
      toggler.autoIdx++;
    }
  });
}

// Обработчик на изменение размера экрана
function resizeHandler() {
  pageWidth = window.innerWidth;
  resetTogglerLine();
  clearInterval(timer);
  autoChangeElem();
}

// Обработчик кликов
function clickHandler(e, target) {
  if (e.target.dataset.elemToggler) {
    changeElem(e.target.dataset.elemToggler, target);
  }
}
// Обработчик колесика мыши
function wheelHandler(e, target) {
  if (canToggle && pageWidth < 768) {
    if (e.deltaX > 0) {
      changeElem(target['currentElem'] + 1, target);
    } else {
      changeElem(target['currentElem'] - 1, target)
    }
    
    canToggle = false;
  } else {
    clearInterval(toggleTimeout);
    toggleTimeout = setTimeout(resetToggleCan, 100);
  }
}
// Сброс таймаута
function resetToggleCan() {
	canToggle = true;
}

// Возвращение изначальных значений для элементов, которые прокручивались
function resetTogglerLine() {
	if (pageWidth > 767) {
		toggs.forEach(togg => {
			togg['currentElem'] = 0;
			togg['autoIdx'] = 0;
			togg['currentOffset'] = 0;
    	togg['togglerLine'].style.transform = `translateX(0)`;
		})
	}
}

// EVENT LISTENERS

toggs.forEach(togg => {
  togg['containerToggler'].addEventListener('click', (e) => {
    clickHandler(e, togg);
  });
  togg['containerToggler'].addEventListener('wheel', (e) => {
    wheelHandler(e, togg);
  })
});

window.onresize = () => resizeHandler();