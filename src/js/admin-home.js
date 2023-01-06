document.addEventListener("DOMContentLoaded", () => {
  initApp()
})

function initApp() {
  optionsNavigation()
}
function optionsNavigation() {
  const searchAppointmentsButton = document.querySelector(".appointments-button")
  const showServicesButton = document.querySelector(".services-button")
  const newServiceButton = document.querySelector(".new-service-button")

  const servicesContainer = document.querySelector(".search-appointments-container")
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