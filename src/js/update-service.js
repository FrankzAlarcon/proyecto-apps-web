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