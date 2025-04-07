<script setup lang="ts">
import globalVariables from '~/assets/styles/variables.module.scss'
const { danger } = globalVariables

const route = useRoute()
const router = useRouter()

const { data: exercise } = useFetch<Exercise>(
  `/api/exercises/${route.params.id}`
)

const deleteExercise = async () => {
  await fetch(`/api/exercises/${route.params.id}`, {
    method: 'DELETE'
  })

  router.push('/')
}

const editExercise = () => {
  router.push(`/exercise/${route.params.id}/edit`)
}
</script>

<template>
  <div class="exercise" v-if="exercise">
    <TitleBox>
      <div class="exercise-title-section">
        <div class="exercise-info">
          <p class="exercise-title">{{ exercise?.name }}</p>

          <p class="exercise-topic">{{ exercise?.topic }}</p>
          <p class="exercise-author">Erstellt von {{ exercise?.author }}</p>
        </div>
        <div class="exercise-actions">
          <IconButton
            class="exercise-delete"
            icon="material-symbols:delete-rounded"
            @click="deleteExercise"
            :color="danger"
          />
          <IconButton
            class="exercise-delete"
            icon="material-symbols:edit-square-outline-rounded"
            @click="editExercise"
          />
          <PrimaryButton
            :to="`/exercise/${route.params.id}/solve`"
            text="Aufgabenbuch Beginnen"
          />
        </div>
      </div>
    </TitleBox>
    <div class="exercise-content">
      <ExerciseDetail :exercise="exercise" />
    </div>
  </div>
  <div v-else>
    <p>...</p>
  </div>
</template>

<style lang="scss" scoped>
.exercise {
  .exercise-title-section {
    padding: 20px;
    display: flex;
    justify-content: space-between;
    z-index: 10;
    position: relative;
    width: 100%;
    max-width: 900px;
    margin: 0 auto;

    .exercise-actions {
      display: flex;
      gap: 10px;
      height: 40px;

      .exercise-delete {
        margin: auto 0;
      }
    }

    .exercise-info {
      display: flex;
      flex-direction: column;

      .exercise-title {
        font-size: 1.8rem;
        margin-bottom: 5px;
      }

      .exercise-topic {
        font-size: 1.2rem;
      }
    }
  }

  .exercise-content {
    max-width: 900px;
    width: 100%;
    margin: 0 auto;
    padding: 0 20px;
  }
}
</style>
