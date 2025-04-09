<script setup lang="ts">
import {
  NPageHeader,
  NBreadcrumb,
  NBreadcrumbItem,
  NSpace,
  NButton
} from 'naive-ui'

import { v4 } from 'uuid'
import { useDialog } from 'naive-ui'

const router = useRouter()
const { data } = useAuth()

const dialog = useDialog()

const exercise = reactive<Exercise>({
  id: v4(),
  name: 'Neues Aufgabenbuch',
  topic: 'z.B. Mathe',
  author: data.value?.username || 'Unbekannt',
  questions: []
})

const saveExercise = async () => {
  await $fetch('/api/exercises', {
    method: 'POST',
    body: exercise,
    credentials: 'include'
  })

  router.push('/')
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
    <template #title>Aufgabenbuch erstellen</template>
    <template #header>
      <n-breadcrumb>
        <n-breadcrumb-item @click.stop.prevent="warnLeave">
          Aufgabenbücher
        </n-breadcrumb-item>
        <n-breadcrumb-item>{{ exercise.name }}</n-breadcrumb-item>
      </n-breadcrumb>
    </template>
    <template #extra>
      <n-space>
        <n-button type="primary" @click="saveExercise">Speichern</n-button>
      </n-space>
    </template>
  </n-page-header>
  <div class="create-outer">
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
