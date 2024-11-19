<template>
  <n-config-provider :theme-overrides="themeOverrides">
    <MainHeader />
    <div class="layout-default">
      <slot />
    </div>
  </n-config-provider>
</template>

<style lang="scss">
html,
body {
  margin: 0;
  padding: 0;
  font-family: globals.$font-primary;
  background-color: globals.$bg-primary;
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

.layout-default {
  margin: globals.$header-height 0 0 0;
}
</style>
