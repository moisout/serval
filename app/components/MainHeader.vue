<template>
  <header>
    <NuxtLink to="/" class="title">
      <img src="~/assets/icons/temp.png" class="title-icon" />
      <span class="title-text">serval</span>
    </NuxtLink>
    <UserMenu />
  </header>
</template>

<style lang="scss" scoped>
header {
  position: absolute;
  top: 0;
  width: 100%;
  padding: 15px 20px;
  background-color: globals.$bg-primary;
  height: globals.$header-height;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);

  .title {
    display: flex;
    flex-direction: row;
    gap: 10px;
    margin: auto 0;
    text-decoration: none;
    color: #000000d3;

    .title-text {
      font-weight: bold;
      font-size: 1.4rem;
      margin: auto 0;

      @media screen and (max-width: 400px) {
        display: none;
      }
    }

    .title-icon {
      margin: auto 0;
      padding: 0;
      height: 1.6rem;
      width: 1.6rem;
    }
  }
}
</style>
