document.addEventListener("DOMContentLoaded", () => {
  initApp()
});

function initApp() {
  toggleForm()
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