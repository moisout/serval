<script lang="ts" setup>
import { NCollapse, NCollapseItem } from 'naive-ui'
const props = defineProps<{
  exercise: Exercise
}>()

const headers = useRequestHeaders(['cookie'])
const { data: resultsByUser } = useFetch<ExerciseResult[]>(
  `/api/exercises/${props.exercise.id}/results`,
  {
    headers: useRequestHeaders(['cookie']),
    credentials: 'include'
  }
)

const mapAnswer = (answer: string) => {
  switch (answer) {
    case 'yes':
      return 'Ja'
    case 'no':
      return 'Nein'
    default:
      return answer
  }
}
</script>

<template>
  <div class="results-detail">
    <p class="results-users">Resultate</p>
    <p v-if="resultsByUser?.length === 0">
      Es gibt noch keine Resultate für diese Übung.
    </p>
    <div
      class="users"
      v-for="(userResult, index) in resultsByUser"
      :key="index"
    >
      <n-collapse>
        <n-collapse-item :title="userResult.username" name="1">
          <div class="questions">
            <p class="questions-count">
              {{
                userResult.questions?.filter((q) => q.result?.isCorrect).length
              }}
              von {{ userResult.questions.length }} Fragen richtig
            </p>
            <div
              class="question"
              v-for="(question, index) in userResult.questions"
              :key="index"
            >
              <p class="question-text">
                {{ index + 1 }}. {{ question.question }}
              </p>
              <p v-if="!question.result" class="answer-text unanswered">
                <Icon name="material-symbols:hourglass-outline" />
                Noch nicht beantwortet
              </p>
              <p
                v-else-if="question.result?.isCorrect"
                class="answer-text correct"
              >
                <Icon name="material-symbols:check-circle-outline-rounded" />
                Antwort: {{ mapAnswer(question.correctAnswer) }}
              </p>
              <p
                v-else-if="!question.result?.isCorrect"
                class="answer-text incorrect"
              >
                <Icon name="material-symbols:cancel-outline-rounded" />
                Antwort: {{ mapAnswer(question.correctAnswer) }}
              </p>
            </div>
          </div></n-collapse-item
        >
      </n-collapse>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.results-detail {
  border: solid 1px globals.$gray-300;
  padding: 20px;
  border-radius: 10px;
  z-index: 10;
  position: relative;
  background-color: globals.$bg-primary;
  display: flex;
  gap: 20px;
  flex-direction: column;

  .results-users {
    font-size: 1.6rem;
  }

  .questions {
    display: flex;
    flex-direction: column;
    gap: 10px;

    .question {
      background-color: globals.$gray-200;
      padding: 10px 15px;
      border-radius: 10px;
      align-items: flex-start;
      display: flex;
      flex-direction: column;
      gap: 5px;

      .question-text {
        font-size: 1.1rem;
      }
      .answer-text {
        font-size: 1rem;
        color: globals.$gray-600;

        &.unanswered {
          color: globals.$danger;
        }

        &.incorrect {
          color: globals.$danger;
        }

        &.correct {
          color: globals.$success;
        }
      }
    }
  }
}
</style>
