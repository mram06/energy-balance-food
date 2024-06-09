<template>
  <div class="banner">
    <div class="container">
      <div class="banner__body">
        <h2 class="banner__title">Харчуйся з користю разом з</h2>
        <h2 class="banner__logo">Energy <span>Balance</span></h2>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BannerBlock",
};
</script>

<style lang="scss" scoped>
.banner {
  &__body {
    padding: 64px 0 48px 168px;
    background: url("@/assets/img/qiwi.png") 80% 0 no-repeat,
      linear-gradient(
        180deg,
        rgb(231, 202, 73) 0%,
        rgb(232, 203, 73) 50.248%,
        rgb(232, 203, 73) 100%
      );
  }
  h2 {
    max-width: 671px;
  }
  &__title {
    color: white;
  }

  &__logo {
    margin: 8px 0 0 0;
    text-align: end;
    line-height: 72px;
    font-size: 60px;
    color: white;
    span {
      font-style: italic;
    }
  }
}
@media only screen and (max-width: 900px) {
  .banner {
    &__body {
      padding: 64px 20px 48px 20px;
    }
  }
}
</style>
