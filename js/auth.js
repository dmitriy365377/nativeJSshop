
class SignUpContainer {
    constructor(containerSignUp, containerSignUpPopup) {
        this.containerSignUp = document.querySelector(containerSignUp)
        this.containerSignUpPopup = document.querySelector(containerSignUpPopup)
        this.shape()
    }
    shape() {
        this.containerSignUp.addEventListener('click', function () {

            signUpContainer.containerSignUpPopup.style.display = 'flex'
            signUpContainer.containerSignUpPopup.innerHTML = ""

            const form = document.createElement("form");
            form.setAttribute("method", "POST");
            form.classList.add("forma")

            const headline = document.createElement("h2")
            headline.setAttribute("class", "signUp")
            headline.innerText = 'Sign up'

            const name = document.createElement("div");
            name.innerText = "name:"

            const nameInput = document.createElement("input")
            nameInput.setAttribute("type", "text")
            nameInput.setAttribute("name", "name")
            nameInput.setAttribute("id", "signup-name")

            const password = document.createElement("div");
            password.innerText = "password:"

            const passwordInput = document.createElement("input")
            passwordInput.setAttribute("type", "text")
            passwordInput.setAttribute("name", "pass")
            passwordInput.setAttribute("id", "signup-pass")

            const email = document.createElement("div")
            email.innerText = "email:"

            const emailInput = document.createElement("input")
            emailInput.setAttribute("type", "email")
            emailInput.setAttribute("name", "email")
            emailInput.setAttribute("id", "signup-email")

            const birthday = document.createElement("div")
            birthday.innerText = "birthday:"

            const birthdayInput = document.createElement("input")
            birthdayInput.setAttribute("type", "text")
            birthdayInput.setAttribute("name", "birthday")
            birthdayInput.setAttribute("id", "signum-birthday")

            const input = document.createElement("input")
            input.setAttribute("type", "submit")
            input.setAttribute("value", "send")
            input.setAttribute("id", "signup-submit")


            nameInput.addEventListener('blur', validateField)
            passwordInput.addEventListener('blur', validateField)
            emailInput.addEventListener('blur', validateField)
            birthdayInput.addEventListener('blur', validateField)


            name.appendChild(nameInput)
            password.appendChild(passwordInput)
            email.appendChild(emailInput)
            birthday.appendChild(birthdayInput)

            form.appendChild(headline)
            form.appendChild(name);
            form.appendChild(password)
            form.appendChild(email)
            form.appendChild(birthday)
            form.appendChild(input)
            signUpContainer.containerSignUpPopup.appendChild(form);

            const closePopUp = document.createElement("div")
            closePopUp.setAttribute("class", "cart-close-popup")
            closePopUp.setAttribute("id", "close")

            closePopUp.addEventListener('click', function () {
                signUpContainer.containerSignUpPopup.innerHTML = ""
                signUpContainer.containerSignUpPopup.style.display = 'none'
            })

            signUpContainer.containerSignUpPopup.appendChild(closePopUp)
            appInit()

            function appInit() {
                input.disabled = true;
            }
        })


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
        debugger

        function validateLength(field) {
            debugger
            if (field.value.length > 0) {
                debugger
                field.style.borderBottomColor = 'green'
                field.classList.remove('error')
            } else {
                field.style.borderBottomColor = 'red'
                field.classList.add('error')
            }
        }

        function validateEmail(field) {
            let emailText = field.value
            if (emailText.indexOf('@', 4) !== -1) {
                field.style.borderBottomColor = 'green'
                field.classList.remove('error')
            } else {
                field.style.borderBottomColor = 'red'
                field.classList.add('error')
            }
        }

    }
}
