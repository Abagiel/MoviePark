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

let pageWidth = window.innerWidth;
let timer = null;
const time = 2000;

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
	const about = togglers['about'];
	const price = togglers['price'];
	const plan = togglers['plan'];

	if (about.autoIdx === about.btnsToggler.length - 1) {
		about.autoIdx = 0;
	} else {
		about.autoIdx++;
	}

	if (price.autoIdx === price.btnsToggler.length - 1) {
		price.autoIdx = 0;
	} else {
		price.autoIdx++;
	}

	if (plan.autoIdx === plan.btnsToggler.length - 1) {
		plan.autoIdx = 0;
	} else {
		plan.autoIdx++;
	}
}

// Обработчик на изменение размера экрана
function resizeHandler() {
	pageWidth = window.innerWidth;
	clearInterval(timer);
	autoChangeElem();
}

// EVENT LISTENERS
const about = togglers['about']['containerToggler'];
const plan = togglers['plan']['containerToggler'];
const price = togglers['price']['containerToggler'];

about.addEventListener('click', e => {
	if (e.target.dataset.elemToggler) {
		changeElem(e.target.dataset.elemToggler, togglers['about']);
	}
});
plan.addEventListener('click', e => {
	if (e.target.dataset.elemToggler) {
		changeElem(e.target.dataset.elemToggler, togglers['plan']);
	}
});
price.addEventListener('click', e => {
	if (e.target.dataset.elemToggler) {
		changeElem(e.target.dataset.elemToggler, togglers['price'])
	}
});

window.onresize = () => resizeHandler();

