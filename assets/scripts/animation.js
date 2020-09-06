// Блоки, между которыми будет навигация
const blocks = document.querySelectorAll('section'); 
const endBlock = blocks.length - 1;
let currentBlock = 0;
// Контейнер блоков
const container = document.body;
// Высота страницы
const containerHeight = parseInt(getComputedStyle(container).height);
let currentHeight = 0;
// Шаг, на который будет проматываться  контейнер
const scrollStep = containerHeight / blocks.length;

// Контейнер всех элементов анимации
const animationContainer = document.querySelectorAll('.animation-container');
// Навигация HEADER
const navLinks = document.querySelectorAll('.nav-link');

// Переменная, отвечающая  за возможность прокрутки блоков
let canUse = true;
// Переменная, в которой будет храниться  setTimeout
let wheelTimeout;

const startElements = animationContainer[currentBlock].children; 

window.addEventListener('load', () => {
	currentAnim(startElements, 1980);
	currentContentAnimation(currentBlock);
});

navLinks[0].classList.add('nav-item__js-hover');
		

// FUNCTIONS
// Ф-ция для запуска анимации
function currentContentAnimation(idx) {
	const downBlock = blocks[idx].querySelector('.init-position__down');
	const rightBlock = blocks[idx].querySelector('.init-position__right');

	if (rightBlock) {
		rightBlock.classList.add('init-position__right-transit');
		rightBlock.style.transitionDelay = '1.2s';
	}

	if (!downBlock) return;
	
	downBlock.classList.add('init-position__down-transit');
	downBlock.style.transitionDelay = '1.2s';
}
function prevContentAnimation(idx) {
	const downBlock = blocks[idx].querySelector('.init-position__down');
	const rightBlock = blocks[idx].querySelector('.init-position__right');

		if (rightBlock) {
			rightBlock.classList.remove('init-position__right-transit');
			rightBlock.style.transitionDelay = '0s';
	}
	
	if (!downBlock) return;
	
	downBlock.classList.remove('init-position__down-transit');
	downBlock.style.transitionDelay = '0s';
}

function currentAnim(target, delay) {

	for (let element of target) {
			element.style.display = 'block';
			element.style.animationDelay = '1.2s';
			element.style.animationName = 'toggle';
			setTimeout(() => {
				element.style.animationPlayState = 'paused';
			}, delay);
		}
}
function prevAnim(target, delay) {
		for (let element of target) {
			element.style.animationPlayState = 'running';
			setTimeout(() => {
				element.style.animationName = '';
				element.style.display = 'none';
			}, delay);
		}
}
// Функция для возврата canUse значения true
function defaultCanUse() {
	canUse = true;
}

// Ф-ция промотки контейнера вверх
function moveUp() {
	if (currentBlock === 0) {
		return;
	}

	const moveTo = currentHeight + scrollStep;
	
	container.style.top = `${moveTo}px`;
	currentBlock--;
	currentHeight += scrollStep;
	animToggle('up', 1);
}
// Ф-ция промотки контейнера вниз
function moveDown() {
	if (currentBlock === endBlock) {
		return;
	}
	const moveTo = currentHeight - scrollStep;

	container.style.top = `${moveTo}px`;
	currentBlock++;
	currentHeight -= scrollStep;
	animToggle('down', 1)
}
// Ф-ция промотки к определенному блоку
function moveTo(target) {
	let targetBlock;

	for (let i = 0; i < blocks.length; i++) {
		const blockId = blocks[i].getAttribute('id');

		if (blockId === target) {
			targetBlock = i;
		}
	}

	if (targetBlock > currentBlock) {
		const jumpStep = (targetBlock - currentBlock) * scrollStep;
		const indexD = targetBlock - currentBlock;
		const moveTo = currentHeight - jumpStep;
		container.style.top = `${moveTo}px`;
		currentBlock += targetBlock - currentBlock;
		currentHeight -= jumpStep;
		animToggle('down', indexD);
	}
	if (targetBlock < currentBlock) {
		const jumpStep = (currentBlock - targetBlock) * scrollStep;
		const indexD = currentBlock - targetBlock;
		const moveTo = currentHeight + jumpStep;
		container.style.top = `${moveTo}px`;
		currentBlock -= currentBlock - targetBlock;
		currentHeight += jumpStep;
		animToggle('up', indexD);
	}
	if (targetBlock === currentBlock) {
		return;
	}
}

// Подчеркивание ссылки в header при выборе определенного блока
function changeUnderline(current, previous) {
	if (current < 3) {
		current = 0;
	}
	if (current >= 3) {
		current -= 2;
	}
	if (previous > 2) {
		previous -= 2;
	} else {
		previous = 0;
	}

	navLinks[previous].classList.remove('nav-item__js-hover');
  navLinks[current].classList.add('nav-item__js-hover');
}
// Показ элементов анимации и их скрытие
function animToggle(direction, indexD) {
	if (direction === 'up') {
		const elements = animationContainer[currentBlock].children; 
		currentAnim(elements, 1980);
		currentContentAnimation(currentBlock)

		const prevElements = animationContainer[currentBlock + indexD].children;
		prevAnim(prevElements, 1180);	
		changeUnderline(currentBlock, currentBlock + indexD)
		prevContentAnimation(currentBlock + indexD);
	}

	if (direction === 'down') {
		const elements = animationContainer[currentBlock].children; 
		currentAnim(elements, 1980);
		currentContentAnimation(currentBlock);

		const prevElements = animationContainer[currentBlock - indexD].children;
		prevAnim(prevElements, 1180);	
		changeUnderline(currentBlock, currentBlock - indexD)
		prevContentAnimation(currentBlock - indexD);
	}
}


// EVENT LISTENERS
// Колесико мышки
document.addEventListener('wheel', e => {
	if (canUse) {
		if (e.deltaY < 0) {
			moveUp();
		}
		if (e.deltaY > 0) {
			moveDown();
		}

		canUse = false;
	}
	clearInterval(wheelTimeout);

	wheelTimeout = setTimeout(defaultCanUse, 80);
});
// Навигация при помощи стрелочек
document.addEventListener('keyup', e => {
	if (canUse) {
		if (e.key === 'ArrowUp') {
			moveUp();
		}
		if (e.key === 'ArrowDown') {
			moveDown();
		}

		canUse = false;
	}
	clearInterval(wheelTimeout);

	wheelTimeout = setTimeout(defaultCanUse, 80);
});
// Навигация при помощи ссылок
document.addEventListener('click', e => {
	if (e.target.dataset.navigate === '') {
		e.preventDefault();

		const idName = e.target.getAttribute('href').slice(1);
		moveTo(idName);
	}
});