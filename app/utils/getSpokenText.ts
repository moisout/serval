export const getSpokenText = (question: Question) => {
  let questionText = question.question
  if (question.additionalText) {
    questionText += `; ${question.additionalText}`
  }
  return questionText
}
