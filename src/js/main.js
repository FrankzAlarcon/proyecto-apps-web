// import { login } from "../graphql/services/auth.service";
// import { setCookie } from "../helpers";
import { getUserByEmail, login, register } from "../db/auth.service";
import { auth } from "../firebase";
import { setCookie } from "../helpers";
import { showFormMessage, toggleShowPassword } from "./helpers/form";
import { addUser, getUsers } from "./helpers/users";

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
  console.log('handle login')
  // show/hide password
  const showPasswordButton = document.querySelector(".show-password-button")
  const inputPassword = document.querySelector("#login-password")
  toggleShowPassword(inputPassword, showPasswordButton)

  // validate password
  const loginForm = document.querySelector(".login-form")
  loginForm.addEventListener("submit", async (evt) => {
    evt.preventDefault()
    const credentials = Object.fromEntries(new FormData(evt.target))
    if (!credentials.email || !credentials.password) {
      const formMessage = document.querySelector(".login-form-message")
      showFormMessage(formMessage, "error", "Todos los campos son obligatorios")
      return
    }

    const loggedUser = await login(credentials)

    if (!loggedUser) {
      const formMessage = document.querySelector(".login-form-message")
      showFormMessage(formMessage, "error", "Usuario o contraseña incorrectos")
      return
    }

    if (loggedUser.role === "customer") {
      evt.target.email.value = ""
      evt.target.password.value = ""
      location.href = "/src/views/home.html"
      return
    }
    location.href = "/src/views/admin/home.html"
    evt.target.email.value = ""
    evt.target.password.value = ""
  })
}

function handleRegister() {
  const showPasswordButton = document.querySelector(".register-show-password")
  const inputPassword = document.querySelector("#create-password")
  toggleShowPassword(inputPassword, showPasswordButton)

  // Create account
  const registerForm = document.querySelector(".create-account-form")
  registerForm.addEventListener("submit", async (evt) => {
    evt.preventDefault()
    const userData = Object.fromEntries(new FormData(evt.target))
    if (!userData.name || !userData.phone || !userData.email || !userData.password) {
      const formMessage = document.querySelector(".create-account-form-message")
      showFormMessage(formMessage, "error", "Todos los campos son obligatorios")
      return
    }
    const formMessage = document.querySelector(".create-account-form-message")
    console.log(userData)
    const result = await register(userData)
    if (!result) {
      showFormMessage(formMessage, "error", "El correo ya se encuentra registrado")
      return
    }
    showFormMessage(formMessage, "success", "Cuenta creada correctamente")
    evt.target.name.value = ""
    evt.target.phone.value = ""
    evt.target.email.value = ""
    evt.target.password.value = ""
    setTimeout(() => {
      location.href = "/src/views/home.html"
    }, 1500)
  })
}