export const modal = (text) => {  
  const modal = document.createElement("DIV")
  modal.classList.add('modal');

  const modalContent = document.createElement("DIV")
  modalContent.classList.add('modal-content')

  const closeBtn = document.createElement("BUTTON")
  closeBtn.classList.add('close-btn')
  closeBtn.textContent = "Aceptar"

  const modalText = document.createElement("P")
  modalText.textContent = text

  modal.appendChild(modalContent)
  modalContent.appendChild(modalText)
  modalContent.appendChild(closeBtn)

  document.body.appendChild(modal)

  closeBtn.addEventListener('click', () => {
    modal.remove()
    window.removeEventListener('click', clickOutsideModal)
  });

  window.addEventListener('click', clickOutsideModal)
}

function clickOutsideModal(evt) {
  const modal = document.querySelector('.modal')
  if (evt.target === modal) {
    modal.remove()
  }
}