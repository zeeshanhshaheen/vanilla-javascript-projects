var form = document.getElementById("form");
var username = document.getElementById("username");
var email = document.getElementById("email");
var password = document.getElementById("password");
var password2 = document.getElementById("password2");

function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = "form-control error";
  const small = formControl.querySelector("small");
  small.innerText = message;
}

function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
}

function getErrorName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

function checkRequired(inputArr) {
  inputArr.forEach(function(input) {
    if (input.value.trim() === '') {
      showError(input, `${getErrorName(input)} is required`);
    } else {
      showSuccess(input);
    }
  });
}

function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(
      input,
      `${getErrorName(input)} must be at least ${min} characters`
    );
  } else if (input.value.length > max) {
    showError(
      input,
      `${getErrorName(input)} must be at least ${max} characters`
    );
  } else {
    showSuccess(input);
  }
}
function checkPasswordMatch(input1, input2) {
    if(input1.value != input2.value) {
        showError(input2, 'password does not match');
    }
}
form.addEventListener("submit", function(e) {
  e.preventDefault();

  checkRequired([username, email, password, password2]);
  checkLength(username, 3, 13);
  checkLength(password, 3, 20);
  checkLength(password2, 3, 20);
  checkPasswordMatch(password, password2);

  // another method

  // if(username.value === '') {
  //     showError(username, 'username is required!');
  // } else {
  //     showSuccess(username);
  // }

  // if(email.value === '') {
  //     showError(email, 'email is required!');
  // } else {
  //     showSuccess(email);
  // }

  // if(password.value === '') {
  //     showError(password, 'Password is required!');
  // } else {
  //     showSuccess(password);
  // }

  // if(password2.value === '') {
  //     showError(password2, 'Password is required!');
  // } else {
  //     showSuccess(password2);
  // }
});
