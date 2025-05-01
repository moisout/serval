<script setup lang="ts">
definePageMeta({ auth: false })

const runtimeConfig = useRuntimeConfig()
const licenseTextString = runtimeConfig.public.licenseText
const licenseText = `
### Lizenz
${licenseTextString.replace(/\\n/g, '\n')}
`
</script>

<template>
  <MDC :value="licenseText" />
</template>
