import { sendResetEmail } from "../db/auth.service";
import { showFormMessage } from "./helpers/form";

document.addEventListener("DOMContentLoaded", () => {
  initApp()
});

function initApp() {
  handleRecovery()
}

function handleRecovery() {
  const recoveryForm = document.querySelector(".recovery-form")
  recoveryForm.addEventListener("submit", async (evt) => {
    evt.preventDefault()
    const recoveryFormMessage = document.querySelector(".recovery-form-message")
    if (!evt.target.email.value) {
      showFormMessage(recoveryFormMessage, "error", "No se permiten campos vacíos")
      return
    }
    const data = Object.fromEntries(new FormData(evt.target))
    await sendResetEmail(data.email)
    showFormMessage(recoveryFormMessage, "success", `Se ha enviado un email a: ${data.email}`)
    evt.target.email.value = ""
  })

}