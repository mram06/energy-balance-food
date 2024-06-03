<!-- Реалізація компонента menu-item (картка товару) -->
<template>
  <div class="item">
    <!-- Отримання шляху до зображення, щоб відобразити у картці товару -->
    <div class="item__img"><img :src="itemData.imgSrc" /></div>
    <!-- Відображення назви страви -->
    <div class="item__title">{{ itemData.title }}</div>
    <div class="item__energy">
      <!-- Відобрадення КБЖВ з масиву energy у об'єкті itemData -->
      <div>К - {{ itemData.energy[0] }}</div>
      <div>Б - {{ itemData.energy[1] }}</div>
      <div>Ж - {{ itemData.energy[2] }}</div>
      <div>В - {{ itemData.energy[3] }}</div>
    </div>
    <!-- Відображення складу страви -->
    <div class="item__about">{{ itemData.ingredients }}</div>
    <div class="item__buy">
      <!-- Відображення ціни страви -->
      <div class="item__buy-price">{{ itemData.price }} грн</div>
      <div @click="onAddToCart(itemData.id)" class="item__buy-button">
        <img src="@/assets/icons/cart_white.svg" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "pinia";
import { useCartStore } from "@/store/modules/cart";
import { useAuthStore } from "@/store/modules/auth";
// Дані для відображення інформації про товар надходять через батьківський елемент у вигляді об'єкта, який отримує дані з БД
export default {
  name: "MenuItem",
  props: {
    // отриманий об'єкт
    itemData: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    ...mapState(useAuthStore, ["user"]),
  },
  methods: {
    ...mapActions(useCartStore, ["addToCart"]),
    onAddToCart(itemId) {
      if (this.user) {
        this.addToCart(this.user.uid, itemId);
      }
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
