<template>
  <main-master-page>
    <div class="container">
      <div class="cart__body">
        <h2>Ваше замовлення</h2>
        <div @click="onEmptyCart" class="cart__reset">Очистити кошик</div>
        <div class="cart__container">
          <div v-for="item in getLoadedCart" :key="item.id" class="cart__item">
            <div class="cart__item-img">
              <img :src="item.imgSrc" />
            </div>
            <div class="cart__item-title">{{ item.title }}</div>
            <div class="cart__item-price">{{ item.price }} грн</div>
            <div class="cart__item-count">
              <button @click="onCount(item.id, 'decrease')">-</button>
              <div>{{ item.count }}</div>
              <button @click="onCount(item.id, 'increase')">+</button>
            </div>
          </div>
        </div>

        <div class="cart__summary">
          <div class="cart__summary-title">Разом замовлення:</div>
          <div class="cart__summary-price">{{ getSummary }} грн</div>
        </div>
      </div>
    </div>
  </main-master-page>
</template>

<script>
import MainMasterPage from "@/masterpages/MainMasterPage";
import { mapState, mapActions } from "pinia";
import { useCartStore } from "@/store/modules/cart";
import { useAuthStore } from "@/store/modules/auth";
import { useItemsStore } from "@/store/modules/items";

export default {
  name: "CartView",
  components: {
    MainMasterPage,
  },
  computed: {
    ...mapState(useCartStore, ["getLoadedCart", "getSummary"]),
    ...mapState(useAuthStore, ["user"]),
  },
  methods: {
    ...mapActions(useCartStore, [
      "addToCart",
      "deleteFromCart",
      "loadUserCart",
      "emptyCart",
    ]),
    ...mapActions(useItemsStore, ["loadList"]),
    onCount(itemId, operation) {
      if (operation === "increase") this.addToCart(this.user.uid, itemId);
      else this.deleteFromCart(this.user.uid, itemId);
    },
    onEmptyCart() {
      this.emptyCart(this.user.uid);
    },
  },
  mounted() {
    this.loadList();
  },
  watch: {
    user: {
      handler(newValue) {
        if (newValue) {
          this.loadUserCart();
        }
      },
      deep: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
}
.cart {
  &__body {
    background: #f2f0ee;
    font-size: 24px;
    padding: 48px 112px;
  }

  &__reset {
    margin: 24px 0 0 0;
  }
  &__container {
    margin: 24px 0 0 0;
    display: flex;
    flex-direction: column;
    gap: 24px;
  }
  &__item {
    display: flex;
    justify-content: space-between;
    align-items: center;

    border-radius: 4px;
    box-shadow: 8px 8px 16px 0px rgba(0, 0, 0, 0.22),
      4px 4px 8px 0px rgba(0, 0, 0, 0.12);
    background: rgb(255, 255, 255);

    padding: 16px;

    &-img {
      width: 100px;
      img {
        width: 100%;
      }
    }

    &-title {
    }

    &-price {
    }

    &-count {
      display: flex;
      align-items: center;
      gap: 10px;
      button {
        width: 40px;
        height: 40px;
        padding: 0;

        font-size: 32px;
      }
    }
  }

  &__summary {
    margin: 24px 0 0 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    &-title {
    }

    &-price {
    }
  }
}
</style>
