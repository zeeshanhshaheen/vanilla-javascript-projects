
var currencyElement = document.getElementById('currency-one');
var currencyElementTwo = document.getElementById('currency-two');
var currencyAmountOne = document.getElementById('amount-one');
var currencyAmountTwo = document.getElementById('amount-two');

var rateElement = document.getElementById('rate');
var swap = document.getElementById('swap');

function calculate() {
    var currencyOne = currencyElement.value;
    var currencyTwo = currencyElementTwo.value;
    fetch(`https://api.exchangerate-api.com/v4/latest/${currencyOne}`)
        .then(res => res.json())
        .then(data => {
            var rate = data.rates[currencyTwo];
            rateElement.innerText = `1 ${currencyOne} = ${rate} ${currencyTwo}`;
            currencyAmountTwo.value = (currencyAmountOne.value * rate).toFixed(2);
        });
}

currencyElement.addEventListener('change', calculate);
currencyElementTwo.addEventListener('change', calculate);
currencyAmountOne.addEventListener('input', calculate);
currencyAmountTwo.addEventListener('input', calculate);

calculate();