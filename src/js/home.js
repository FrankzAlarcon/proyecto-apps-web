import { formatDate, formatPrice } from "../helpers";
import { modal } from "./helpers/modal";
import { textWithSpan } from "./helpers/showInfo";
import { auth } from "../firebase";
import { getUserByEmail } from "../db/auth.service";
import { signOut } from "firebase/auth";
import { getAllServices } from "../db/services.service";
import { createAppointment } from "../db/appointments.service";
import Toastify from 'toastify-js'
import "toastify-js/src/toastify.css"

const appointmentData = {
  name: "",
  date: "",
  time: "",
  services: []
}
let user = null

document.addEventListener("DOMContentLoaded", () => {
  initApp()
})

function initApp() {
  renderUserData()
  renderServices()
  optionsNavigation()
  handleAppointmentInformation()

}

function renderUserData() {
  auth.onAuthStateChanged(async (authData) => {
    if (!authData) {
      return window.location.href = "/index.html"
    }
    user = await getUserByEmail(authData.email)
    console.log(user)
    if (user.role !== "customer") {
      return window.location.href = "/index.html"
    }
    const userName = document.querySelector(".user-data .container-data .user")
    const text = document.createElement("SPAN")
    text.textContent = "Hola: "
    userName.append(text, user.name)

    const inputName = document.querySelector(".information-container .information-form #name")
    inputName.disabled = true
    inputName.value = user.name
    appointmentData.name = user.name

    const closeSessionButton = document.querySelector(".user-data .container-data .close-session")
    closeSessionButton.addEventListener("click", () => {
      signOut(auth)
      window.location.href = "/index.html"
    })
  })
}

async function renderServices() {
  const servicesContainer = document.querySelector(".services")
  const services = await getAllServices()
  services.forEach((service) => {
    // for each service, create a button with the service name and price
    const container = document.createElement("BUTTON")
    const text = document.createElement("P")
    const price = document.createElement("P")
    price.classList.add("price")
    text.textContent = service.name
    price.textContent = formatPrice(service.price)
    container.appendChild(text)
    container.appendChild(price)

    // add a data-id attribute to the button with the service id
    container.dataset.id = service.id

    container.addEventListener("click", () => {
      // toggle the "service-selected" class to the button
      container.classList.toggle("service-selected")

      // if the service is not selected, add it to the appointmentData.services array
      if (!appointmentData.services.some(item => item.id === service.id)) {
        appointmentData.services.push(service)
      } else {
        // if the service is already selected, remove it from the appointmentData.services array
        const index = appointmentData.services.findIndex(item => item.id === service.id)
        appointmentData.services.splice(index, 1)
      }
    })
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
    removeSummary()
  })

  informationButton.addEventListener("click", () => {
    setButtonStyles(informationButton, [serviceButton, summaryButton])
    showContainer(informationContainer, [servicesContainer, summaryContainer])
    removeSummary()
  })

  summaryButton.addEventListener("click", () => {
    if (appointmentData.services.length === 0) {
      modal("Debes seleccionar al menos un servicio")
      return
    }
    if ([appointmentData.date, appointmentData.time].includes("")) {
      modal("Debes seleccionar fecha y hora")
      return
    }
    setButtonStyles(summaryButton, [serviceButton, informationButton])
    showContainer(summaryContainer, [informationContainer, servicesContainer])
    renderSummary()
  })
}

function handleAppointmentInformation() {
  const date = document.querySelector(".information-container .information-form #date")
  const time = document.querySelector(".information-container .information-form #time")

  date.addEventListener("change", () => {
    appointmentData.date = date.value
  })

  time.addEventListener("change", () => {
    appointmentData.time = time.value
  })
}

function renderSummary() {
  const summaryContainer = document.querySelector(".summary-container")
  const summary = document.createElement("DIV")
  summary.classList.add("services-summary")

  const titleServices = document.createElement("H3")
  titleServices.textContent = "Resumen de Servicios"
  summary.appendChild(titleServices)
  console.log(appointmentData)
  appointmentData.services.forEach(service => {
    const serviceContainer = document.createElement("DIV")
    serviceContainer.classList.add("summary-service-container")
    const name = document.createElement("P")
    name.textContent = service.name
    const price = textWithSpan("Precio: ", formatPrice(service.price))
    serviceContainer.appendChild(name)
    serviceContainer.appendChild(price)
    summary.appendChild(serviceContainer)
  })

  const totalPrice = appointmentData.services.reduce((acc, service) => acc + service.price, 0)
  const total = textWithSpan("Total: ", formatPrice(totalPrice))
  total.classList.add("total")
  summary.appendChild(total)

  const appointmentSummary = document.createElement("DIV")
  appointmentSummary.classList.add("summary-appointment")
  const titleAppointment = document.createElement("H3")
  titleAppointment.textContent = "Resumen de Cita"
  appointmentSummary.appendChild(titleAppointment)

  const name = textWithSpan("Nombre: ", appointmentData.name)
  const date = textWithSpan("Fecha: ", formatDate(appointmentData.date))
  const time = textWithSpan("Hora: ", `${appointmentData.time} hrs`)

  appointmentSummary.appendChild(name)
  appointmentSummary.appendChild(date)
  appointmentSummary.appendChild(time)

  summaryContainer.appendChild(summary)
  summaryContainer.appendChild(appointmentSummary)

  const button = document.createElement("BUTTON")
  button.classList.add("reserve-appointment")
  button.textContent = "Reservar Cita"

  button.addEventListener("click", async () => {
    const wasCreated = await createAppointment(user.id, appointmentData)
    if (!wasCreated) {
      Toastify({
        text: "Error al reservar cita",
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        style: {
          background: "linear-gradient(to right, #f44336, #d32f2f)",
        }
      }).showToast()
      return
    }
    Toastify({
      text: "Cita reservada con éxito",
      duration: 3000,
      newWindow: true,
      close: true,
      gravity: "top",
      position: "right",
      stopOnFocus: true,
      style: {
        background: "linear-gradient(to bottom, #8bc34a, #558b2f)",
      }
    }).showToast()
    resetForms()

    return
  })

  summaryContainer.appendChild(button)
}

function removeSummary() {
  const summaryContainer = document.querySelector(".summary-container")
  summaryContainer.innerHTML = ""
}

function resetForms() {
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

  showContainer(servicesContainer, [informationContainer, summaryContainer])
  setButtonStyles(serviceButton, [informationButton, summaryButton])

  const date = document.querySelector(".information-container .information-form #date")
  const time = document.querySelector(".information-container .information-form #time")
  date.value = ""
  time.value = ""
  appointmentData.services = []
  appointmentData.date = ""
  appointmentData.time = ""
  appointmentData.name = ""
  const renderServicesContainer = document.querySelector(".services")
  renderServicesContainer.innerHTML = ""
  renderServices()
  removeSummary()
}