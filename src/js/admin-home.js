import services from "../json/services.json"
document.addEventListener("DOMContentLoaded", () => {
  initApp()
})

function initApp() {
  optionsNavigation()
  renderServices()
}

function optionsNavigation() {
  const searchAppointmentsButton = document.querySelector(".appointments-button")
  const showServicesButton = document.querySelector(".services-button")
  const newServiceButton = document.querySelector(".new-service-button")

  const servicesContainer = document.querySelector(".search-appointments-container")
  const informationContainer = document.querySelector(".show-services-container")
  const summaryContainer = document.querySelector(".new-service-container")

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

  searchAppointmentsButton.addEventListener("click", () => {
    setButtonStyles(searchAppointmentsButton, [showServicesButton, newServiceButton])
    showContainer(servicesContainer, [informationContainer, summaryContainer])
  })

  showServicesButton.addEventListener("click", () => {
    setButtonStyles(showServicesButton, [searchAppointmentsButton, newServiceButton])
    showContainer(informationContainer, [servicesContainer, summaryContainer])
  })

  newServiceButton.addEventListener("click", () => {
    setButtonStyles(newServiceButton,[ searchAppointmentsButton, showServicesButton])
    showContainer(summaryContainer, [informationContainer, servicesContainer])
  })
}

function renderServices() {
  const servicesContainer = document.querySelector(".services-container");
  console.log(servicesContainer)
  services.services.forEach(service => {
    const container = document.createElement("DIV")
    container.classList.add("service-item")
    const name = document.createElement("P")
    const titleName = document.createElement("SPAN")
  
    titleName.textContent = "Nombre:"
    name.append(titleName, service.nombre)    

    const price = document.createElement("P")
    const titlePrice = document.createElement("SPAN")
    titlePrice.textContent = "Precio:"
    price.append(titlePrice, service.precio)    

    const updateButton = document.createElement("BUTTON")
    updateButton.classList.add("update-button")
    updateButton.textContent = "Actualizar"
    updateButton.addEventListener("click", () => {
      window.location = "./update-service.html"
    })
    const deteleButton = document.createElement("BUTTON")
    deteleButton.classList.add("delete-button")
    deteleButton.textContent = "Borrar"

    const buttonsContainer = document.createElement("DIV")
    buttonsContainer.classList.add("buttons-container")
    
    buttonsContainer.append(updateButton, deteleButton)

    container.append(name, price, buttonsContainer)
    servicesContainer.appendChild(container)
  })
  
}