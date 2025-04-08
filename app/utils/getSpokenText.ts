export const getSpokenText = (question?: Question) => {
  if(!question) {
    return ''
  }
  let questionText = question.question
  if (question.additionalText) {
    questionText += `; ${question.additionalText}`
  }
  return questionText
}
