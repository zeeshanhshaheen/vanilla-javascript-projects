const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionaireBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const CalculateWealthBtn = document.getElementById('calculate-wealth');

let data = [];

// fetching random user and adding money

getRandomUser();
getRandomUser();
getRandomUser();

async function getRandomUser() {
    const res = await fetch('https://randomuser.me/api');
    const data = await res.json();

    const user = data.results[0];
    const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random() * 100000)
    };
    //console.log(newUser);
    addData(newUser);
}

function doubleMoney() {
    data = data.map((user) => {
        return { ...user, money: user.money * 2 };
    });

    updateDom();
}

function sortByRichest() {
    data.sort((a, b) => b.money - a.money);
    updateDom();
}

function showMillionaire() {
    data = data.filter(user => user.money > 100000);
    updateDom();
}

function CalculateWealth() {
    const wealth = data.reduce((acc, user) => (acc += user.money), 0);
    // console.log(wealth);
    const wealthEl = document.createElement('div');
    wealthEl.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(
        wealth
    )}</strong></h3>`;
    main.appendChild(wealthEl);
}

function addData(obj) {
    data.push(obj);

    updateDom();
}

// update Dom

function updateDom(providedData = data) {
    //clear main div
    main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>';

    providedData.forEach(function (item) {
        const element = document.createElement('div');
        element.classList.add('person');
        element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(item.money)}`;
        main.appendChild(element);
    });
}

function formatMoney(number) {
    return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

//  event listeners

addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);
showMillionaireBtn.addEventListener('click', showMillionaire);
sortBtn.addEventListener('click', sortByRichest);
CalculateWealthBtn.addEventListener('click', CalculateWealth);