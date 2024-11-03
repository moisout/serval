<template>
  <div class="layout-exercise">
    <slot />
  </div>
</template>

<style lang="scss">
html {
  background-color: globals.$bg-primary;
  font-family: 'Montserrat', sans-serif;
}

html,
body,
#__nuxt,
.layout-exercise {
  margin: 0;
  padding: 0;
}

.layout-exercise {
  height: 100%;
  width: 100%;
}

p,
span {
  margin: 0;
  font-family: 'Montserrat', sans-serif;
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
