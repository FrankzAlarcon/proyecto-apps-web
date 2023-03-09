export const textWithSpan = (textSpan, textParagraph) => {
  const name = document.createElement("P")
  const nameSpan = document.createElement("SPAN")
  nameSpan.textContent = textSpan
  name.append(nameSpan, textParagraph)

  return name
}

{/* <p>Peinado Hombre <span>2.00</span></p> */ }

export const showServiceAndPrice = (textSpan, textParagraph) => {
  const name = document.createElement("P")
  const span = document.createElement("SPAN")
  span.textContent = textSpan
  name.append(textParagraph, span)

  return name
}