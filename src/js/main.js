import { showFormMessage, toggleShowPassword } from "./helpers/form";

document.addEventListener("DOMContentLoaded", () => {
  initApp()
});

function initApp() {
  toggleForm()
  handleLogin()
  handleRegister()
}

function toggleForm() {
  const loginButton = document.querySelector(".login-button")
  const createAccountButton = document.querySelector(".create-account-button")
  const loginForm = document.querySelector(".login-form")
  const createAccountForm = document.querySelector(".create-account-form")
  loginButton.addEventListener("click", () => {
    loginButton.classList.add("selected")
    loginForm.classList.remove("hidden")
    createAccountButton.classList.remove("selected")
    createAccountForm.classList.add("hidden")
  })  
  createAccountButton.addEventListener("click", () => {
    createAccountButton.classList.add("selected")
    createAccountForm.classList.remove("hidden")
    loginButton.classList.remove("selected")
    loginForm.classList.add("hidden")
  })
}

function handleLogin() {
  // show/hide password
  const showPasswordButton = document.querySelector(".show-password-button")
  const inputPassword = document.querySelector("#login-password")
  toggleShowPassword(inputPassword, showPasswordButton)

  // validate password
  const loginForm = document.querySelector(".login-form")
  loginForm.addEventListener("submit", (evt) => {
    evt.preventDefault()
    const credentials = Object.fromEntries(new FormData(evt.target))
    if (credentials.email  === "user@correo.com" && credentials.password === "12345678") {
      location.href = "/src/views/home.html"
    } else {
      const formMessage = document.querySelector(".login-form-message")
      showFormMessage(formMessage, "error", "Usuario o contraseña incorrectos")
    }
  })
}

function handleRegister() {
  const showPasswordButton = document.querySelector(".register-show-password")
  const inputPassword = document.querySelector("#create-password")
  toggleShowPassword(inputPassword, showPasswordButton)

  // Create account
  const registerForm = document.querySelector(".create-account-form")
  registerForm.addEventListener("submit", (evt) => {
    evt.preventDefault()
    const userData = Object.fromEntries(new FormData(evt.target))
    console.log(userData)
    const formMessage = document.querySelector(".create-account-form-message")
    showFormMessage(formMessage, "success", "Cuenta creada correctamente")
    evt.target.name.value = ""
    evt.target.phone.value = ""
    evt.target.email.value = ""
    evt.target.password.value = ""
  })
}