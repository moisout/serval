<script setup lang="ts">
import globalVariables from '~/assets/styles/variables.module.scss'
import { NInput } from 'naive-ui'
const { danger } = globalVariables

const props = defineProps<{ modelValue: Question }>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: Question): void
  (e: 'delete', value: Question): void
  (e: 'moveUp', value: Question): void
  (e: 'moveDown', value: Question): void
}>()

const yesId = useId()
const noId = useId()

const questionTitle = computed({
  get: () => props.modelValue?.question,
  set: (value) => {
    emit('update:modelValue', { ...props.modelValue, question: value })
  }
})

const correctAnswer = computed({
  get: () => props.modelValue?.correctAnswer,
  set: (value) => {
    emit('update:modelValue', { ...props.modelValue, correctAnswer: value })
  }
})

const additionalText = computed({
  get: () => props.modelValue?.additionalText,
  set: (value) => {
    emit('update:modelValue', { ...props.modelValue, additionalText: value })
  }
})

globalVariables

const deleteQuestion = () => {
  emit('delete', props.modelValue)
}

const moveQuestionUp = () => {
  emit('moveUp', props.modelValue)
}

const moveQuestionDown = () => {
  emit('moveDown', props.modelValue)
}
</script>

<template>
  <div class="form-question-yes-no">
    <div class="question-header">
      <FormEditable class="question" v-model="questionTitle" />
      <div class="question-actions">
        <IconButton
          class="question-action"
          icon="material-symbols:arrow-upward"
          @click="moveQuestionUp"
        />
        <IconButton
          class="question-action"
          icon="material-symbols:arrow-downward"
          @click="moveQuestionDown"
        />
        <IconButton
          class="question-action"
          icon="material-symbols:delete-rounded"
          @click="deleteQuestion"
          :color="danger"
        />
      </div>
    </div>
    <div class="question-content">
      <n-input
        type="textarea"
        v-model="additionalText"
        class="form-question-yes-no-label"
      />
      <p class="form-question-yes-no-label">Korrekte Antwort</p>
      <div class="form-question-yes-no-radio">
        <input
          type="radio"
          :name="`yes-no-${yesId}`"
          :id="yesId"
          value="yes"
          class="question-radio"
          v-model="correctAnswer"
        />
        <label
          :for="yesId"
          class="question-radio-label"
          :class="{ correct: correctAnswer === 'yes' }"
        >
          <Icon
            name="material-symbols:check-circle-rounded"
            class="question-radio-icon"
            v-if="correctAnswer === 'yes'"
          />
          <Icon
            name="material-symbols:cancel-rounded"
            class="question-radio-icon"
            v-if="correctAnswer === 'no'"
          />
          Ja
        </label>
        <input
          type="radio"
          :name="`yes-no-${noId}`"
          :id="noId"
          value="no"
          class="question-radio"
          v-model="correctAnswer"
        />
        <label
          :for="noId"
          class="question-radio-label"
          :class="{ correct: correctAnswer === 'no' }"
        >
          <Icon
            name="material-symbols:check-circle-rounded"
            class="question-radio-icon"
            v-if="correctAnswer === 'no'"
          />
          <Icon
            name="material-symbols:cancel-rounded"
            class="question-radio-icon"
            v-if="correctAnswer === 'yes'"
          />
          Nein
        </label>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.form-question-yes-no {
  display: flex;
  flex-direction: column;
  border: 1px solid globals.$gray-300;
  border-radius: 10px;
  overflow: hidden;

  .question-header {
    background-color: globals.$gray-100;
    height: 50px;
    border-bottom: 1px solid globals.$gray-300;
    display: flex;
    padding: 0 15px;
    justify-content: space-between;

    .question {
      margin: auto 0;
    }

    .question-actions {
      display: flex;
      gap: 5px;

      .question-action {
        margin: auto 0;
      }
    }
  }

  .question-content {
    padding: 15px;

    .form-question-yes-no-label {
      font-size: 0.9rem;
      color: globals.$gray-600;
      margin: 0 0 10px 0;
    }

    .form-question-yes-no-radio {
      display: flex;
      gap: 10px;

      .question-radio {
        display: none;
      }

      .question-radio-label {
        display: inline-flex;
        padding: 8px 15px;
        border: 1px solid globals.$gray-300;
        border-radius: 5px;
        cursor: pointer;
        text-align: center;
        gap: 4px;

        border-color: globals.$danger;
        color: globals.$danger;

        .question-radio-icon {
          margin: auto 0;
        }

        &.correct {
          border-color: globals.$success;
          color: globals.$success;
        }
      }
    }
  }
}
</style>
