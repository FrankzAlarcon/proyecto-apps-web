export const formatPrice = (price) => {
  const x = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: "USD"
  }).format(price)
  return x
}

export const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long'
  })
}

export const getCookie = (key) => {
  const cookie = document.cookie.split(";")
    .find(c => c.trim().startsWith(`${key}=`))
    .split("=")[1]
  return JSON.parse(cookie)
}

export const setCookie = (key, value) => {
  document.cookie = `${key}=${JSON.stringify(value)};path=/;`
}

export function clearCookie(key) {
  document.cookie = `${key}=;path=/;`
}

export const getLocalStorage = (key) => {
  const value = localStorage.getItem(key)
  return JSON.parse(value)
}

export const setLocalStorage = (key, value) => {
  const data = localStorage.getItem(key)
  if (!data) {
    localStorage.setItem(key, JSON.stringify(value))
  }
  localStorage.setItem(key, JSON.stringify(value))
}