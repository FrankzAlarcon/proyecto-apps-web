import { clearCookie, getCookie } from "../helpers"
import { getUsers } from "./helpers/users"

let user = null
document.addEventListener("DOMContentLoaded", () => {
  initApp()
})

function initApp() {
  renderUserData()
  optionsNavigation()  
}

function renderUserData() {
  const email = getCookie("email")
  const users = getUsers()
  user = users.find(user => user.email === email)
  console.log(user,email)
  const userName = document.querySelector(".user-data .container-data .user")
  const text = document.createElement("SPAN")
  text.textContent = "Hola: "
  userName.append(text, `${user.name} (admin)`)  
  const closeSessionButton = document.querySelector(".user-data .container-data .close-session")
  closeSessionButton.addEventListener("click", () => {
    clearCookie("email")
    window.location.href = "/index.html"
  })
}

function optionsNavigation() {
  const searchAppointmentsButton = document.querySelector(".appointments-button")
  const showServicesButton = document.querySelector(".services-button")
  const newServiceButton = document.querySelector(".new-service-button")

  searchAppointmentsButton.addEventListener("click", () => {
    window.location = "./home.html"
  })

  showServicesButton.addEventListener("click", () => {
    window.location = "./home.html"
  })

  newServiceButton.addEventListener("click", () => {
    window.location = "./home.html"
  })
}