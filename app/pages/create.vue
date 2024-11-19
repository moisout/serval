<script setup lang="ts">
import { v4 } from 'uuid'

const router = useRouter()
const { data } = useAuth()

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
</script>

<template>
  <TitleBox>
    <div class="create-title-section">
      <p class="create-title">Aufgabenbuch erstellen</p>
      <PrimaryButton type="button" text="Speichern" @click="saveExercise" />
    </div>
  </TitleBox>
  <div class="create-outer">
    <div class="create">
      <CreateForm :exercise="exercise" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.create-title-section {
  padding: 20px;
  display: flex;
  justify-content: space-between;
  z-index: 10;
  position: relative;
  width: 100%;
  max-width: 900px;
  margin: 0 auto;

  .create-title {
    font-size: 1.8rem;
  }
}

.create-outer {
  max-width: 900px;
  width: 100%;
  margin: 0 auto;
  padding: 0 20px;

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
