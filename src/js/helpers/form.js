export function showFormMessage(element, state, message) {
  element.textContent = message;
  if (state === "error") {
    element.classList.remove("hidden")
    element.classList.add("error")
    return setTimeout(() => {
      element.classList.add("hidden")
      element.classList.remove("error")
    }, 2000)
  }
  if (state === "success") {
    element.classList.remove("hidden")
    element.classList.add("success")
    return setTimeout(() => {
      element.classList.add("hidden")
      element.classList.remove("success")
    }, 2000)
  }
}

export function toggleShowPassword(input, button) {
  button.addEventListener("click", () => {
    if(input.type === "password") {
      input.type = "text"
      return
    }
    input.type = "password"
  })
}