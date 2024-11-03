<template>
  <MainHeader />
  <div class="layout-default">
    <slot />
  </div>
</template>

<style lang="scss">
html,
body {
  margin: 0;
  padding: 0;
  font-family: 'Montserrat', sans-serif;
  background-color: globals.$bg-primary;
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

.layout-default {
  margin: globals.$header-height 0 0 0;
}
</style>
