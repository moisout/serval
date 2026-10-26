<script setup lang="ts">
useHead({
  title: 'Übung',
  meta: [
    {
      name: 'description',
      content: 'Übung'
    }
  ],
  // Removed again when the layout unmounts, so other pages can scroll
  htmlAttrs: { class: 'html-exercise' }
})
</script>

<template>
  <div class="layout-exercise">
    <slot />
  </div>
</template>

<style lang="scss">
html {
  background-color: globals.$bg-primary;
  font-family: globals.$font-primary;
}

html.html-exercise {
  &,
  body,
  #__nuxt {
    margin: 0;
    padding: 0;
    height: 100%;
    width: 100%;
    overflow: hidden;
  }
}

.layout-exercise {
  margin: 0;
  padding: 0;
  overflow: hidden;
}

.layout-exercise {
  height: 100%;
  width: 100%;
}

p,
span {
  margin: 0;
  font-family: globals.$font-primary;
}

a {
  color: globals.$gray-900;

  &:hover {
    color: globals.$primary;
  }
}

* {
  box-sizing: border-box;
}
</style>
