import { clearCookie, formatPrice, getCookie } from "../helpers";
import { getUsers } from "./helpers/users";
import services from "../json/services.json";

let user = null

document.addEventListener("DOMContentLoaded", () => {
  initApp()
})

function initApp() {
  renderUserData()
  renderServices()
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
  userName.append(text, user.name)  

  const closeSessionButton = document.querySelector(".user-data .container-data .close-session")
  closeSessionButton.addEventListener("click", () => {
    clearCookie("email")
    window.location.href = "/index.html"
  })
}

function renderServices() {
  const servicesContainer = document.querySelector(".services")
  services.services.forEach((service) => {
    const container = document.createElement("BUTTON")
    const text = document.createElement("P")
    const price = document.createElement("P")
    price.classList.add("price")

    container.dataset.id = service.id
    text.textContent = service.nombre
    price.textContent = formatPrice(service.precio)

    container.appendChild(text)
    container.appendChild(price)
    servicesContainer.appendChild(container)
  })
}

function optionsNavigation() {
  const serviceButton = document.querySelector(".service-button")
  const informationButton = document.querySelector(".information-button")
  const summaryButton = document.querySelector(".summary-button")

  const servicesContainer = document.querySelector(".services-container")
  const informationContainer = document.querySelector(".information-container")
  const summaryContainer = document.querySelector(".summary-container")

  const showContainer = (show, hidden) => {
    show.classList.remove("hidden")

    hidden.forEach(container => {
      container.classList.add("hidden")
    })
  }

  const setButtonStyles = (selected, others) => {
    selected.classList.add("selected")
    
    others.forEach(button => {
      button.classList.remove("selected")
    })
  }

  serviceButton.addEventListener("click", () => {
    setButtonStyles(serviceButton, [informationButton, summaryButton])
    showContainer(servicesContainer, [informationContainer, summaryContainer])
  })

  informationButton.addEventListener("click", () => {
    setButtonStyles(informationButton, [serviceButton, summaryButton])
    showContainer(informationContainer, [servicesContainer, summaryContainer])
  })

  summaryButton.addEventListener("click", () => {
    setButtonStyles(summaryButton,[ serviceButton, informationButton])
    showContainer(summaryContainer, [informationContainer, servicesContainer])
  })
}