<script setup lang="ts">
import {
  NButton,
  NPageHeader,
  NSpace,
  NGrid,
  NStatistic,
  NGi,
  NBreadcrumb,
  NBreadcrumbItem,
  useDialog
} from 'naive-ui'
import globalVariables from '~/assets/styles/variables.module.scss'
const { danger } = globalVariables

const route = useRoute()
const router = useRouter()

const headers = useRequestHeaders(['cookie'])
const { data: exercise } = useFetch<Exercise>(
  `/api/exercises/${route.params.id}`,
  {
    headers,
    credentials: 'include'
  }
)

const dialog = useDialog()

const deleteExercise = async () => {
  dialog.warning({
    title: 'Aufgabenbuch löschen',
    content: `Möchtest du das Aufgabenbuch "${exercise.value?.name}" wirklich löschen? Diese Aktion kann nicht rückgängig gemacht werden.`,
    positiveText: 'Abbrechen',
    negativeText: 'Löschen',
    onNegativeClick: async () => {
      await fetch(`/api/exercises/${route.params.id}`, {
        method: 'DELETE'
      })

      router.push('/')
    },
    negativeButtonProps: {
      size: 'large'
    },
    positiveButtonProps: {
      size: 'large'
    }
  })
}

const editExercise = () => {
  router.push(`/exercise/${route.params.id}/edit`)
}
</script>

<template>
  <div class="exercise" v-if="exercise">
    <n-page-header @back="() => router.push('/')">
      <n-grid :cols="5">
        <n-gi>
          <n-statistic label="Thema" :value="exercise.topic" />
        </n-gi>
        <n-gi>
          <n-statistic label="Erstellt von" :value="exercise.author" />
        </n-gi>
        <n-gi>
          <n-statistic
            label="Anzahl Fragen"
            :value="exercise.questions?.length"
          />
        </n-gi>
      </n-grid>
      <template #title>{{ exercise?.name }}</template>
      <template #header>
        <n-breadcrumb>
          <n-breadcrumb-item @click="$router.push('/')">
            Aufgabenbücher
          </n-breadcrumb-item>
          <n-breadcrumb-item>{{ exercise?.name }}</n-breadcrumb-item>
        </n-breadcrumb>
      </template>
      <template #extra>
        <n-space>
          <n-button type="error" @click="deleteExercise">
            <template #icon>
              <Icon name="material-symbols:delete-rounded" />
            </template>
          </n-button>
          <n-button @click="editExercise">
            <template #icon>
              <Icon name="material-symbols:edit-square-outline-rounded" />
            </template>
          </n-button>
          <nuxt-link :to="`/exercise/${route.params.id}/solve`">
            <n-button type="primary">
              <template v-slot:icon>
                <Icon name="material-symbols:play-arrow-outline-rounded"
              /></template>
              Aufgabenbuch Beginnen
            </n-button>
          </nuxt-link>
        </n-space>
      </template>
    </n-page-header>
    <div class="exercise-content">
      <ExerciseDetail :exercise="exercise" />
      <ExerciseResults :exercise="exercise" />
    </div>
  </div>
  <div v-else>
    <p>...</p>
  </div>
</template>

<style lang="scss" scoped>
.exercise {
  .exercise-title-section {
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
    padding: 20px 0;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
}
</style>
