<template>
  <main-master-page>
    <div class="container">
      <div class="cart__body">
        <h2>Ваше замовлення</h2>
        <div @click="emptyCart" class="cart__reset">
          <font-awesome-icon :icon="['fas', 'trash']" style="color: #404040" />
          Очистити кошик
        </div>
        <div class="cart__container">
          <div v-for="item in getLoadedCart" :key="item.id" class="cart__item">
            <div class="cart__item-img">
              <img :src="item.imgSrc" />
            </div>
            <div class="cart__item-title">{{ item.title }}</div>
            <div class="cart__item-price">{{ item.price }} грн</div>
            <div class="cart__item-count">
              <button @click="onCount(item.id, 'decrease')">
                <font-awesome-icon
                  :icon="['fas', 'minus']"
                  style="color: #ffffff"
                />
              </button>
              <div>{{ item.count }}</div>
              <button @click="onCount(item.id, 'increase')">
                <font-awesome-icon
                  :icon="['fas', 'plus']"
                  style="color: #ffffff"
                />
              </button>
            </div>
          </div>
        </div>

        <div class="cart__summary">
          <div class="cart__summary-title">Разом замовлення:</div>
          <div class="cart__summary-price">{{ getSummary }} грн</div>
          <div class="cart__summary-order">
            <button @click="onMakeOrder">Оформити замовлення</button>
          </div>
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
import { useOrdersStore } from "@/store/modules/orders";

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
    ...mapActions(useOrdersStore, ["makeOrder"]),
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
    onMakeOrder() {
      this.makeOrder().then(() => this.$router.push({ name: "orders" }));
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
.cart {
  &__body {
    background: #f2f0ee;
    font-size: 24px;
    padding: 48px 112px;
  }

  &__reset {
    cursor: pointer;
    margin: 24px 0 0 0;
  }
  &__container {
    margin: 24px 0 0 0;
    display: flex;
    flex-direction: column;
    gap: 24px;
  }
  &__item {
    display: grid;
    grid-template-columns: 100px 1fr 1fr 1fr;
    align-items: center;
    gap: 24px;

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
      justify-self: center;
    }

    &-count {
      justify-self: end;
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      align-items: center;
      gap: 10px;

      text-align: center;
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
    gap: 24px;
    &-title {
    }

    &-price {
      margin-left: auto;
    }
  }
}
</style>
