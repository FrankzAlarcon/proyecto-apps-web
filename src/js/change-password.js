import { showFormMessage, toggleShowPassword } from "./helpers/form"

document.addEventListener("DOMContentLoaded", () => {
  initApp()
})

function initApp() {
  handleChangePassword()
}

function handleChangePassword() {
  const form = document.querySelector(".change-password-form")
  const message = document.querySelector(".change-form-message")
  const showPasswordButton = document.querySelector(".show-password-button")
  const inputPassword = document.querySelector("#change-password")
  const inputRepeatPassword = document.querySelector("#repeat-change-password")
  const showRepeatedPasswordButton = document.querySelector(".show-repeated-password-button")
  toggleShowPassword(inputPassword, showPasswordButton)
  toggleShowPassword(inputRepeatPassword, showRepeatedPasswordButton)

  form.addEventListener("submit", (evt) => {
    evt.preventDefault()
    const passwordsData = Object.fromEntries(new FormData(evt.target))
    const {changedPassword, repeatChangedPassword} = passwordsData    
    
    if (!changedPassword || !repeatChangedPassword) {
      showFormMessage(message, 'error', 'Todos los campos son obligatorios')
      return
    }

    if (changedPassword !== repeatChangedPassword) {
      showFormMessage(message, 'error', 'Las contraseñas no coinciden')
      return
    }
    
    showFormMessage(message, 'success', 'Contraseña cambiada con éxito')

    setTimeout(() => {
      window.location.href = "/index.html"
    }, 2000)
  })  
}