document.getElementById('loan-form').addEventListener('submit', function (e) {
    document.getElementById('results').style.display = 'none';
    document.getElementById('loader').style.display = 'block';
    setTimeout(calculateResults, 2000);
    e.preventDefault();
});

function calculateResults() {
    // console.log('ddc');

    const amount = document.getElementById('amount');
    const interest = document.getElementById('interest');
    const years = document.getElementById('years');
    const monthlyPayment = document.getElementById('monthely-payment');
    const totalPayment = document.getElementById('total-payment');
    const totalInterest = document.getElementById('total-interest');

    const principle = parseFloat(amount.value);
    const calculatedInterest = parseFloat(interest.value) / 100 / 12;
    const calculatedPayment = parseFloat(years.value) * 12;

    // Monthely Payment
    const x = Math.pow(1 + calculatedInterest, calculatedPayment);
    const monthly = (principle * x * calculatedInterest) / (x - 1);

    if (isFinite(monthly)) {
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly * calculatedPayment).toFixed(2);
        totalInterest.value = ((monthly * calculatedPayment) - principle).toFixed(2);
        document.getElementById('results').style.display = 'block';
        document.getElementById('loader').style.display = 'none';
    } else {
        showError('Please Check Your Details');
    }

}

function showError(error) {
    const errorDIv = document.createElement('div');
    // getting elements
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');

    errorDIv.className = 'alert alert-danger';
    errorDIv.appendChild(document.createTextNode(error));

    card.insertBefore(errorDIv, heading);
    setTimeout(clearError, 3000);
}

function clearError() {
    document.querySelector('.alert').remove();
}