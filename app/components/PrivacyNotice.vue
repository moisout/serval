<script setup lang="ts">
import { NAlert } from 'naive-ui'
</script>

<template>
  <n-alert title="Datenschutzhinweis" type="info"
    >{{ defaultTexts.privacyNotice }}
    <p>
      <NuxtLink to="/privacy" class="privacy-link">
        Mehr erfahren
      </NuxtLink>
    </p>
  </n-alert>
</template>

<style lang="scss" scoped>
.privacy-link {
  text-align: center;
  margin-top: 10px;
}
</style>
