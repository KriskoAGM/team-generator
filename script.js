const playerCount = document.getElementById('player-count');
const names = document.getElementById('names');
const teamsSection = document.getElementById('teams');
const generateBtn = document.getElementById('generate-btn');
const menuBtn = document.getElementById('menu-btn');
const menu = document.querySelector('.contacts');
let isToggle = false;

generateBtn.addEventListener('click', generatePlayers);
names.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        generatePlayers();
    };
});

menuBtn.addEventListener('click', () => {
    isToggle = !isToggle;

    if (isToggle) {
        menu.style.display = 'flex';
        menuBtn.children[0].style.transform = 'rotate(90deg)';
    } else {
        menu.style.display = 'none';
        menuBtn.children[0].style.transform = 'rotate(0)';
    }
});

window.addEventListener('resize', () => {
    if (window.innerWidth >= 768) {
        isToggle = false;
        menu.style.display = 'flex';
        menuBtn.children[0].style.transform = 'rotate(0)';
    } else {
        menu.style.display = 'none';
    }
});

window.addEventListener('load', () => {
    const width = window.innerWidth;
    if (width >= 768) {
        menu.style.display = 'flex';
    }
});

function generatePlayers() {
    if (names.value.trim() === '') {
        return;
    }

    const allNames = names.value.trim().split(' ');

    if (!validPlayers(allNames)) {
        alert('Invalid number of players!');
        return;
    };

    const shuffle = allNames.sort(() => Math.random() - 0.5);
    const teams = divideTeams(shuffle);

    teamsSection.innerHTML = '';

    for (const team of teams) {
        const div = createElement('div', null, teamsSection, ['team']);

        for (const player of team) {
            createElement('p', player, div);
        };
    };
}

function validPlayers(arr) {
    return arr.length >= playerCount.value * 2 && arr.length % playerCount.value === 0;
}

function divideTeams(arr) {
    const players = Number(playerCount.value);
    const teamsArr = [];

    for (let i = 0; i < arr.length; i += players) {
        teamsArr.push(arr.slice(i, i + players));
    };

    return teamsArr;
}

function createElement(type, content, parentNode, classes) {
    const element = document.createElement(type);

    if (content && type === 'input') {
        element.value = content;
    };

    if (content && type !== 'input') {
        element.textContent = content;
    };

    if (parentNode) {
        parentNode.appendChild(element);
    };

    if (classes) {
        element.classList.add(...classes);
    };

    return element;
}