<script setup lang="ts">
import { NAlert } from 'naive-ui'
</script>

<template>
  <n-alert title="Lizenzierung" type="success"
    >{{ defaultTexts.licenseNotice }}
    <p>
      <NuxtLink to="/license" class="license-link">
        Mehr erfahren
      </NuxtLink>
    </p>
  </n-alert>
</template>

<style lang="scss" scoped>
.license-link {
  text-align: center;
  margin-top: 10px;
}
</style>
