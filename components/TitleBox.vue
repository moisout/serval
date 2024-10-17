<template>
  <div class="title-box">
    <div class="title-box-bg" />
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.title-box {
  position: relative;
  height: 75px;

  .title-box-bg {
    z-index: 1;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 400px;
    user-select: none;
    pointer-events: none;
    background: linear-gradient(
      to bottom,
      #{globals.$primary}71,
      globals.$bg-primary
    );
  }
}
</style>
