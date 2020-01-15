// Get DOM Elements
const modal = document.querySelector('#my-modal');
const modalBtn = document.querySelector('#modal-btn');
const closeBtn = document.querySelector('.close');
const inputBtn = document.querySelector('#signup-submit')
const nameInput = document.querySelector('#signup-name')
const passwordInput = document.querySelector('#signup-pass')
const emailInput = document.querySelector('#signup-email')
const birthdayInput = document.querySelector('#signum-birthday')

// События
modalBtn.addEventListener('click', openModal);
closeBtn.addEventListener('click', closeModal);
window.addEventListener('click', outsideClick);
nameInput.addEventListener('blur', validateField)
passwordInput.addEventListener('blur', validateField)
emailInput.addEventListener('blur', validateField)
birthdayInput.addEventListener('blur', validateField)

// Открыть
function openModal() {
  modal.style.display = 'block';
}

// Закрыть по крестику
function closeModal() {
  modal.style.display = 'none';
}

// Кликнуть вне формы и закрыть
function outsideClick(e) {
  if (e.target == modal) {
    modal.style.display = 'none';
  }
}

appInit()

function appInit() {
  inputBtn.disabled = true;
}


function validateField() {
  let errors;

  validateLength(this)
   console.log(this)
  if (this.type === 'email') {
    validateEmail(this)
  }

  errors = document.querySelectorAll('.error')
  let values = [].slice.call(document.querySelectorAll('.forma input'))
  if (values.find(item => item.value == '') == undefined) {
    if (errors.length === 0) {
      document.getElementById('signup-submit').disabled = false;
    }
  }
}

// Проверка если текст в input
function validateLength(field) {
  if (field.value.length > 0) {
    field.style.borderBottomColor = 'green'
    field.classList.remove('error')
  } else {
    field.style.borderBottomColor = 'red'
    field.classList.add('error')
  }
}
// Проверка email
function validateEmail(field) {
  let emailText = field.value
  console.log(emailText)
  if (emailText.indexOf('@', 4) !== -1) {
    debugger
    field.style.borderBottomColor = 'green'
    field.classList.remove('error')
  } else {
    field.style.borderBottomColor = 'red'
    field.classList.add('error')
  }
}
