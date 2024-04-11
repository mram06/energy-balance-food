<template>
  <div class="item">
    <div class="item__img"><img :src="itemData.imgSrc" /></div>
    <div class="item__title">{{ itemData.title }}</div>
    <div class="item__energy">
      <div>К - {{ itemData.energy[0] }}</div>
      <div>Б - {{ itemData.energy[1] }}</div>
      <div>Ж - {{ itemData.energy[2] }}</div>
      <div>В - {{ itemData.energy[3] }}</div>
    </div>
    <div class="item__about">{{ itemData.description }}</div>
    <div class="item__buy">
      <div class="item__buy-price">{{ itemData.price }} грн</div>
      <div class="item__buy-button">
        <img src="@/assets/icons/cart_white.svg" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MenuItem",
  props: {
    itemData: {
      type: Object,
      default: () => ({}),
    },
  },
};
</script>

<style lang="scss" scoped>
.item {
  border-radius: 4px;
  box-shadow: 8px 8px 16px 0px rgba(0, 0, 0, 0.22),
    4px 4px 8px 0px rgba(0, 0, 0, 0.12);
  background: rgb(255, 255, 255);

  width: 464px;
  height: 608px;
  padding: 16px;

  display: flex;
  flex-direction: column;
  gap: 16px;
  &__img {
    align-self: center;
  }

  &__title {
    color: rgb(16, 16, 16);
    font-size: 24px;
    font-weight: 700;
    line-height: 32px;
  }

  &__energy {
    display: flex;
    gap: 15px;
    font-weight: bold;
  }

  &__about {
    height: 72px;

    overflow: hidden;
    text-overflow: ellipsis;
  }

  &__buy {
    margin-top: auto;

    display: flex;
    justify-content: space-between;
    align-items: center;
    &-price {
      font-family: "Raleway", sans-serif;
      font-size: 24px;
      font-weight: 700;
      line-height: 32px;
    }

    &-button {
      img {
        padding: 20px 16px 14px 13px;
      }
      cursor: pointer;

      width: 64px;
      height: 64px;
      border-radius: 32px;
      background: rgb(239, 119, 42);
    }
  }
}
</style>
