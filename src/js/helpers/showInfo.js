export const textWithSpan = (textSpan, textParagraph) => {
  const name = document.createElement("P")
  const nameSpan = document.createElement("SPAN")
  nameSpan.textContent = textSpan
  name.append(nameSpan, textParagraph)

  return name
}
