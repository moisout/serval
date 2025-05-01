<script setup lang="ts">
import privacyNotice from '~/assets/notice/privacyNotice.md?raw'
definePageMeta({ auth: false })
</script>

<template>
  <MDC :value="privacyNotice" />
</template>
