var signupName = document.getElementById('signupName');
var signupEmail = document.getElementById('signupEmail');
var signupPassword = document.getElementById('signupPassword');
var signinEmail = document.getElementById('signinEmail');
var signinPassword = document.getElementById('signinPassword');

var signUpArray = JSON.parse(localStorage.getItem('users')) || [];

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
function isValidPassword(password) {
  return /^.{8,}$/.test(password);
}

function isEmpty() {
  return !(signupName.value === '' || signupEmail.value === '' || signupPassword.value === '');
}

function isEmailExist() {
    for (var i = 0; i < signUpArray.length; i++) {
        if (signUpArray[i].email.toLowerCase() == signupEmail.value.toLowerCase()) {
            return false
        }
    }
}


function signUp() {
  if (!isEmpty()) {
    document.getElementById('signupMessage').innerHTML = '<span class="text-danger">All inputs are required</span>';
    return;
  }
  else {
    document.getElementById('signupMessage').innerHTML = '';
  }

  if (!isValidEmail(signupEmail.value)) {
    document.getElementById('signUpemailError').innerHTML = '<span class="text-danger">Invalid email format</span>';
    return;
  }
  else {
    document.getElementById('signUpemailError').innerHTML = '';
  }

  if (!isValidPassword(signupPassword.value)) {
    document.getElementById('signUppasswordError').innerHTML =
      '<span class="text-danger">Invalid password</span>';
    return;
  }
  else {
    document.getElementById('signUppasswordError').innerHTML = '';
  }

  if (isEmailExist(signupEmail.value)) {
    document.getElementById('signupMessage').innerHTML = '<span class="text-danger">Email already exists</span>';
    return;
  }
  else {
    document.getElementById('signupMessage').innerHTML = '';
  }

  const newUser = {
    name: signupName.value,
    email: signupEmail.value,
    password: signupPassword.value,
  };
  signUpArray.push(newUser);
  localStorage.setItem('users', JSON.stringify(signUpArray));

  document.getElementById('signupMessage').innerHTML = '<span class="text-success">Account created successfully!</span>';
  signupName.value = signupEmail.value = signupPassword.value = '';
}


function login() {
  if (signinEmail.value === '' || signinPassword.value === '') {
    document.getElementById('signinMessage').innerHTML = '<span class="text-danger">All inputs are required</span>';
    return;
  }

  for (var i = 0; i < signUpArray.length; i++) {

        if (signUpArray[i].email.toLowerCase() == signinEmail.value.toLowerCase() && signUpArray[i].password.toLowerCase() == signinPassword.value.toLowerCase()) {
            localStorage.setItem('sessionUsername', signUpArray[i].name)
            location.replace('home.html');
  } else {
    console.log('else part');
    document.getElementById('signInMessage').innerHTML = '<span class="text-danger">Incorrect email or password</span>';
  }
 
}
}
function logout() {
    localStorage.removeItem('sessionUsername')
    location.replace('/index.html')
}