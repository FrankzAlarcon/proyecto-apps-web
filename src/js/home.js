import { formatPrice } from "../helpers";
import services from "../json/services.json";

document.addEventListener("DOMContentLoaded", () => {
  initApp()
})

function initApp() {
  renderServices()
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