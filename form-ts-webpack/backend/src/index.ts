import isEmail from 'validator/lib/isEmail';

const SHOW_ERROR_MESSAGE = 'show-error-message';

const form = document.querySelector('.form') as HTMLFormElement;
const username = document.querySelector('.username') as HTMLInputElement;
const email = document.querySelector('.email') as HTMLInputElement;
const password = document.querySelector('.password') as HTMLInputElement;
const password2 = document.querySelector('.password2') as HTMLInputElement;

form.addEventListener('submit', function (event) {
  event.preventDefault();

  hideErrorMessages(this);

  verifyEmptyFields(username, email, password, password2);
  verifyEmail(email);
  verifyEqualsPasswords(password, password2);

  if (trySubmitForm(this)) {
    alert('Formulário enviado com sucesso');
    clearFieldsValue(username, email, password, password2);
  }
});

function verifyEmptyFields(...inputs: HTMLInputElement[]): void {
  inputs.forEach((input) => {
    if (!input.value) {
      showErrorMessage(input, 'Campo não pode ficar vazio');
    }
  });
}

function verifyEmail(input: HTMLInputElement): void {
  if (!isEmail(input.value)) {
    showErrorMessage(input, 'Email inválido');
  }
}

function verifyEqualsPasswords(
  password: HTMLInputElement,
  password2: HTMLInputElement,
): void {
  if (password.value !== password2.value) {
    showErrorMessage(password, 'Senhas não são iguais');
    showErrorMessage(password2, 'Senhas não são iguais');
  }
}

function hideErrorMessages(form: HTMLFormElement): void {
  form
    .querySelectorAll('.' + SHOW_ERROR_MESSAGE)
    .forEach((item) => item.classList.remove(SHOW_ERROR_MESSAGE));
}

function showErrorMessage(input: HTMLInputElement, message: string): void {
  const formFields = input.parentElement as HTMLDivElement;

  const errorMessage = formFields.querySelector(
    '.error-message',
  ) as HTMLSpanElement;

  errorMessage.innerText = message;
  formFields.classList.add(SHOW_ERROR_MESSAGE);
}

function trySubmitForm(form: HTMLFormElement): boolean {
  let canSend = true;

  form
    .querySelectorAll('.' + SHOW_ERROR_MESSAGE)
    .forEach(() => (canSend = false));

  return canSend;
}

function clearFieldsValue(...inputs: HTMLInputElement[]) {
  inputs.forEach((input) => (input.value = ''));
}
