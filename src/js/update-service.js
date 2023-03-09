import { getUserByEmail } from "../db/auth.service"
import { getServiceById, updateService } from "../db/services.service"
import { auth } from "../firebase"
import { clearCookie } from "../helpers"
import { toatifyError, toatifySuccess } from "./helpers/toastify"

let user = null
document.addEventListener("DOMContentLoaded", async () => {
  await initApp()
})

async function initApp() {
  renderUserData()
  optionsNavigation()
  await renderServiceData()
  handleUpdateService()
}

function renderUserData() {
  auth.onAuthStateChanged(async (authData) => {
    if (!authData) {
      return window.location.href = "/index.html"
    }
    user = await getUserByEmail(authData.email)
    if (user.role !== "admin") {
      return window.location.href = "/index.html"
    }
    const userName = document.querySelector(".user-data .container-data .user")
    const text = document.createElement("SPAN")
    text.textContent = "Hola: "
    userName.append(text, `${user.name} (admin)`)
    const closeSessionButton = document.querySelector(".user-data .container-data .close-session")
    closeSessionButton.addEventListener("click", () => {
      clearCookie("email")
      window.location.href = "/index.html"
    })
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

async function renderServiceData() {
  const urlParams = new URLSearchParams(window.location.search)
  const id = urlParams.get('id')
  const service = await getServiceById(id)
  const form = document.querySelector('.form-new-service')
  form.name.value = service.name
  form.price.value = service.price
}

function handleUpdateService() {
  const form = document.querySelector('.form-new-service')
  form.addEventListener('submit', async (e) => {
    const urlParams = new URLSearchParams(window.location.search)
    const id = urlParams.get('id')

    e.preventDefault()
    const name = form.name.value
    const price = form.price.value
    const service = {
      name,
      price,
    }
    const rta = await updateService(id, service)
    if (!rta) {
      toatifyError('Error al actualizar el servicio')
      return
    }
    toatifySuccess('Servicio actualizado correctamente')
    setTimeout(() => {
      window.location.reload()
    }, 1500)
  })
}