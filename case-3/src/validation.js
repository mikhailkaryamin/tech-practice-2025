const form = document.getElementById('registrationForm');
const usernameInput = document.getElementById('username');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');

const usernameError = document.getElementById('usernameError');
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');

function validateForm(event) {
  event.preventDefault();

  usernameError.textContent = '';
  emailError.textContent = '';
  passwordError.textContent = '';

  let isValid = true;

  if (usernameInput.value.trim() === '') {
    usernameError.textContent = 'Имя пользователя не может быть пустым';
    isValid = false;
  }

  const emailRegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegExp.test(emailInput.value.trim())) {
    emailError.textContent = 'Введите корректный email';
    isValid = false;
  }

  if (passwordInput.value.trim().length < 6) {
    passwordError.textContent = 'Пароль должен содержать не менее 6 символов';
    isValid = false;
  }

  if (isValid) {
    alert('Форма успешно отправлена!');
    form.submit();
  }
}

export function setupValidation() {
  form.addEventListener('submit', validateForm);
}
