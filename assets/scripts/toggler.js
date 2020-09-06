const togglers = {
	'about': { 
		// То, на чем смотрим события
		containerToggler: document.querySelector('[data-elem-about]'),
		// То, что будем двигать
		togglerLine: document.querySelector('.about-toggler'),
		currentElem: 0,
		currentOffset: 0,
		// То, к чему применяем изменение цвета
		btnsToggler: document.querySelector('[data-elem-about]').querySelectorAll('[data-elem-toggler]')
	},
	'plan': {
		containerToggler: document.querySelector('[data-elem-plan]'),
		togglerLine: document.querySelector('.plan-toggler'),
		currentElem: 0,
		currentOffset: 0,
		btnsToggler: document.querySelector('[data-elem-plan]').querySelectorAll('[data-elem-toggler]')
	},
	'price': {
		containerToggler: document.querySelector('[data-elem-price]'),
		togglerLine: document.querySelector('.price-toggler'),
		currentElem: 0,
		currentOffset: 0,
		btnsToggler: document.querySelector('[data-elem-price]').querySelectorAll('[data-elem-toggler]')
	}
}


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
		target['currentElem'] = idx;
	}
	if (idx < target['currentElem']) {
		let offset = (target['currentElem'] - idx) * 100;

		target['togglerLine'].style.transform = `translateX(${target['currentOffset'] + offset}%)`;
		target['currentOffset'] += offset;
		target['currentElem'] = idx;
	}
}

// EVENT LISTENERS
const about = togglers['about']['containerToggler'];
const plan = togglers['plan']['containerToggler'];
const price = togglers['price']['containerToggler'];

about.addEventListener('click', e => {
	if (e.target.dataset.elemToggler != '') {
		changeElem(e.target.dataset.elemToggler, togglers['about']);
	}
});
plan.addEventListener('click', e => {
	if (e.target.dataset.elemToggler != '') {
		changeElem(e.target.dataset.elemToggler, togglers['plan']);
	}
});
price.addEventListener('click', e => {
	if (e.target.dataset.elemToggler != '') {
		changeElem(e.target.dataset.elemToggler, togglers['price'])
	}
});

