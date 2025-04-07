<script setup lang="ts">
import { NConfigProvider, NDialogProvider, NMessageProvider } from 'naive-ui'
</script>

<template>
  <n-config-provider :theme-overrides="themeOverrides">
    <n-dialog-provider>
      <n-message-provider>
        <!-- <n-loading-bar-provider>
          <LoadingBar />
        </n-loading-bar-provider> -->
        <MainHeader />
        <div class="layout-default">
          <slot />
        </div>
      </n-message-provider>
    </n-dialog-provider>
  </n-config-provider>
</template>

<style lang="scss">
html,
body {
  margin: 0;
  padding: 0;
  font-family: globals.$font-primary;
  background-color: globals.$bg-primary;
  width: 100%;
  overflow-x: hidden;
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
  margin: globals.$header-height auto 0 auto;
  padding: 20px;
  z-index: 10;
  width: 100%;
  max-width: 900px;
}
</style>
