import Toastify from 'toastify-js'
import "toastify-js/src/toastify.css"

export const toatifyError = (message) => {
  Toastify({
    text: message,
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
}

export const toatifySuccess = (message) => {
  Toastify({
    text: message,
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
}