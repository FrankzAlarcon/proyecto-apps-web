import { signOut } from "firebase/auth"
import { getAllAppointments } from "../db/appointments.service"
import { getUserByEmail } from "../db/auth.service"
import { createService, deleteService, getAllServices } from "../db/services.service"
import { auth } from "../firebase"
import { showServiceAndPrice } from "./helpers/showInfo"
import { toatifySuccess } from "./helpers/toastify"


document.addEventListener("DOMContentLoaded", async () => {
  await initApp()
})

let appointments

async function initApp() {
  await renderUserData()
  optionsNavigation()
  await renderServices()
  await renderAppointments()
  handleNewService()
  handleFilterAppointments()
}

async function renderUserData() {
  auth.onAuthStateChanged(async (authData) => {
    if (!authData) {
      return window.location.href = "/index.html"
    }
    const user = await getUserByEmail(authData.email)
    if (user.role !== "admin") {
      return window.location.href = "/index.html"
    }
    const userName = document.querySelector(".user-data .container-data .user")
    const text = document.createElement("SPAN")
    text.textContent = "Hola: "
    userName.append(text, `${user.name} (admin)`)
    const closeSessionButton = document.querySelector(".user-data .container-data .close-session")
    closeSessionButton.addEventListener("click", () => {
      signOut(auth)
      window.location.href = "/index.html"
    })
  })
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
    setButtonStyles(newServiceButton, [searchAppointmentsButton, showServicesButton])
    showContainer(summaryContainer, [informationContainer, servicesContainer])
  })
}

async function renderServices() {
  const servicesContainer = document.querySelector(".services-container");
  const services = await getAllServices()
  services.forEach(service => {
    const container = document.createElement("DIV")
    container.classList.add("service-item")
    const name = document.createElement("P")
    const titleName = document.createElement("SPAN")

    titleName.textContent = "Nombre:"
    name.append(titleName, service.name)

    const price = document.createElement("P")
    const titlePrice = document.createElement("SPAN")
    titlePrice.textContent = "Precio:"
    price.append(titlePrice, '$' + service.price)

    const updateButton = document.createElement("BUTTON")
    updateButton.classList.add("update-button")
    updateButton.textContent = "Actualizar"
    updateButton.addEventListener("click", () => {
      window.location = `./update-service.html?id=${service.id}`
    })
    const deleteButton = document.createElement("BUTTON")
    deleteButton.classList.add("delete-button")
    deleteButton.textContent = "Borrar"

    deleteButton.addEventListener("click", async () => {
      const confirmation = confirm("¿Estás seguro de que quieres eliminar este servicio?")
      if (confirmation) {
        await deleteService(service.id)
      }
    })

    const buttonsContainer = document.createElement("DIV")
    buttonsContainer.classList.add("buttons-container")

    buttonsContainer.append(updateButton, deleteButton)

    container.append(name, price, buttonsContainer)
    servicesContainer.appendChild(container)
  })

}

async function renderAppointments() {
  appointments = await getAllAppointments()
  const appointmentsContainer = document.querySelector(".appointments-container")
  const createRow = (title, text) => {
    const rowItem = document.createElement('DIV')
    rowItem.classList.add("row")
    const spanId = document.createElement('SPAN')
    spanId.textContent = title
    const pId = document.createElement('P')
    pId.textContent = text
    rowItem.append(spanId, pId)
    return rowItem
  }
  appointments.forEach(appointment => {
    const container = document.createElement("DIV")
    container.classList.add("user-data")
    const idRow = createRow('ID:', appointment.id)
    const dateRow = createRow('Fecha:', appointment.date)
    const timeRow = createRow('Hora:', appointment.hour)
    const clientRow = createRow('Cliente:', appointment.user.name)
    const emailRow = createRow('Email:', appointment.user.email)
    const phoneRow = createRow('Teléfono:', appointment.user.phone)


    const servicesContainer = document.createElement("DIV")
    servicesContainer.classList.add("services")
    const titleServices = document.createElement("H3")
    titleServices.textContent = "Servicios"
    servicesContainer.appendChild(titleServices)

    appointment.services.forEach(service => {
      if (!service) return
      const row = showServiceAndPrice('$' + service.price, service.name + ' ')
      servicesContainer.appendChild(row)
    })


    const totalRow = document.createElement("P")
    totalRow.classList.add("total")
    const spanTotal = document.createElement("SPAN")
    spanTotal.textContent = "Total:"
    const totalPrice = appointment.services.reduce((acc, service) => {
      return acc + service.price
    }, 0)
    totalRow.append(spanTotal, `$${totalPrice}`)
    servicesContainer.appendChild(totalRow)
    // const completeButton = document.createElement("BUTTON")
    // completeButton.classList.add("complete-button")
    // completeButton.textContent = "Completar"
    // completeButton.addEventListener("click", () => {
    //   console.log("Completar")
    // })
    // servicesContainer.appendChild(completeButton)
    container.append(idRow, dateRow, timeRow, clientRow, emailRow, phoneRow, servicesContainer)
    appointmentsContainer.append(container)
  })

}

function handleNewService() {
  const form = document.querySelector(".form-new-service")
  form.addEventListener("submit", async (e) => {
    e.preventDefault()
    const name = form.name.value
    const price = form.price.value
    const service = {
      name,
      price: Number(price)
    }

    const rta = await createService(service)
    if (!rta) {
      return
    }
    toatifySuccess("Servicio creado con éxito")
    setTimeout(() => {
      window.location.reload()
    }, 1500)
  })
}

function handleFilterAppointments() {
  console.log('filtered')
  const inputDate = document.querySelector('#date')

  inputDate.addEventListener('change', async () => {
    const date = inputDate.value
    const appointmentsContainer = document.querySelector(".appointments-container")
    appointmentsContainer.innerHTML = ""
    if (date === "") {
      renderAppointmentsWithFilter(appointments)
      return
    }
    const filteredAppointments = appointments.filter(app => app.date === date)
    renderAppointmentsWithFilter(filteredAppointments)
  })
}
async function renderAppointmentsWithFilter(appointments) {
  const appointmentsContainer = document.querySelector(".appointments-container")
  const createRow = (title, text) => {
    const rowItem = document.createElement('DIV')
    rowItem.classList.add("row")
    const spanId = document.createElement('SPAN')
    spanId.textContent = title
    const pId = document.createElement('P')
    pId.textContent = text
    rowItem.append(spanId, pId)
    return rowItem
  }
  appointments.forEach(appointment => {
    const container = document.createElement("DIV")
    container.classList.add("user-data")
    const idRow = createRow('ID:', appointment.id)
    const dateRow = createRow('Fecha:', appointment.date)
    const timeRow = createRow('Hora:', appointment.hour)
    const clientRow = createRow('Cliente:', appointment.user.name)
    const emailRow = createRow('Email:', appointment.user.email)
    const phoneRow = createRow('Teléfono:', appointment.user.phone)


    const servicesContainer = document.createElement("DIV")
    servicesContainer.classList.add("services")
    const titleServices = document.createElement("H3")
    titleServices.textContent = "Servicios"
    servicesContainer.appendChild(titleServices)

    appointment.services.forEach(service => {
      if (!service) return
      const row = showServiceAndPrice('$' + service.price, service.name + ' ')
      servicesContainer.appendChild(row)
    })


    const totalRow = document.createElement("P")
    totalRow.classList.add("total")
    const spanTotal = document.createElement("SPAN")
    spanTotal.textContent = "Total:"
    const totalPrice = appointment.services.reduce((acc, service) => {
      return acc + service.price
    }, 0)
    totalRow.append(spanTotal, `$${totalPrice}`)
    servicesContainer.appendChild(totalRow)
    const completeButton = document.createElement("BUTTON")
    completeButton.classList.add("complete-button")
    completeButton.textContent = "Completar"
    completeButton.addEventListener("click", () => {
      console.log("Completar")
    })
    servicesContainer.appendChild(completeButton)
    container.append(idRow, dateRow, timeRow, clientRow, emailRow, phoneRow, servicesContainer)
    appointmentsContainer.append(container)
  })

}