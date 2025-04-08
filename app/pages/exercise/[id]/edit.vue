<script setup lang="ts">
import {
  NPageHeader,
  NBreadcrumb,
  NBreadcrumbItem,
  NSpace,
  NButton,
  useDialog
} from 'naive-ui'

const router = useRouter()
const route = useRoute()
const { data } = useAuth()

const dialog = useDialog()

const exercise = ref<Exercise>()

onMounted(async () => {
  await $fetch(`/api/exercises/${route.params.id}`, {
    method: 'GET',
    credentials: 'include'
  })
    .then((res) => {
      if (!(res as any).error) {
        exercise.value = res as unknown as Exercise

        if (!exercise.value?.questions) {
          exercise.value.questions = []
        }
      }
    })
    .catch((err) => {
      console.error(err)
    })
})

const saveExercise = async () => {
  await $fetch(`/api/exercises/${exercise.value?.id}`, {
    method: 'PUT' as any,
    body: exercise.value,
    credentials: 'include'
  })

  router.push(`/exercise/${exercise.value?.id}`)
}

const warnLeave = () => {
  dialog.warning({
    title: 'Aufgabenbuch nicht gespeichert',
    content:
      'Möchtest du das Aufgabenbuch verlassen? Deine Eingaben werden nicht gespeichert.',
    positiveText: 'Abbrechen',
    negativeText: 'Ja, verlassen',
    onNegativeClick: () => router.push('/'),
    negativeButtonProps: {
      size: 'large'
    },
    positiveButtonProps: {
      size: 'large'
    }
  })
}
</script>

<template>
  <n-page-header @back="warnLeave">
    <template #title>Aufgabenbuch bearbeiten</template>
    <template #header>
      <n-breadcrumb>
        <n-breadcrumb-item href="/" @click.stop.prevent="warnLeave">
          Aufgabenbücher
        </n-breadcrumb-item>
        <n-breadcrumb-item>{{ exercise?.name }}</n-breadcrumb-item>
      </n-breadcrumb>
    </template>
    <template #extra>
      <n-space>
        <n-button type="primary" @click="saveExercise"
          ><template #icon
            ><Icon name="material-symbols:save-outline-rounded" /></template
          >Speichern</n-button
        >
      </n-space>
    </template>
  </n-page-header>
  <div class="create-outer" v-if="exercise">
    <div class="create">
      <CreateForm :exercise="exercise" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.create-outer {
  max-width: 900px;
  width: 100%;
  margin: 0 auto;
  padding: 20px 0;

  .create {
    border: solid 1px globals.$gray-300;
    padding: 20px;
    border-radius: 10px;
    z-index: 10;
    position: relative;
    background-color: globals.$bg-primary;
  }
}
</style>
