<template>
  <main-master-page>
    <div class="container">
      <div class="menu-row">
        <aside class="aside">
          <h2>Меню</h2>
          <div class="aside__category active">Сніданки</div>
          <div class="aside__category">Основні страви</div>
          <div class="aside__category">Салати</div>
          <div class="aside__category">Супи</div>
          <div class="aside__category">Пасти</div>
          <div class="aside__category">Круасани</div>
          <div class="aside__category">Десерти</div>
        </aside>

        <div class="menu">
          <div class="menu__body">
            <div class="menu__search">
              <input type="text" />
              <div class="menu__search-button">
                <img src="@/assets/icons/search.svg" />
              </div>
            </div>
            <div class="menu__category">
              <div class="menu__category-title">Сніданки</div>
              <div class="menu__category-container">
                <menu-item :item-data="itemData" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main-master-page>
</template>

<script>
import MainMasterPage from "@/masterpages/MainMasterPage.vue";
import MenuItem from "@/components/MenuItem.vue";

export default {
  name: "MenuView",
  components: { MainMasterPage, MenuItem },
  data() {
    return {
      itemData: {
        imgSrc: require("@/assets/img/shakshukha.jpeg"),
        title: "Шакшука",
        energy: [352, 15.56, 16.34, 31.42],
        description:
          "листя салату, томати, куряча грудка, яйце, пармезан, сухарики. соус часниково-горіховий (горіх грецький, часник запечений, вершки, майонез)",
        price: "219",
      },
    };
  },
};
</script>

<style lang="scss" scoped>
.menu-row {
  padding: 0 112px;
  display: flex;
  gap: 62px;
}
.active {
  color: rgb(239, 119, 42);
}

.aside {
  padding: 48px 0 0 0;
  :nth-child(2) {
    margin: 24px 0 0 0;
  }
  h2 {
    color: rgb(239, 119, 42);
  }
  &__category {
    margin: 16px 0 0 0;
    font-weight: bold;
  }
}
.menu {
  width: 100%;
  &__body {
    padding: 48px;
    background: rgb(242, 240, 238);
  }

  &__search {
    position: relative;
    input {
      width: 100%;
      padding-right: 40px;
    }
    &-button {
      cursor: pointer;
      right: 16px;
      top: 11px;
      position: absolute;
    }
  }

  &__category {
    margin: 48px 0 0 0;
    &-title {
      color: rgb(16, 16, 16);
      font-size: 24px;
      font-weight: 700;
      line-height: 32px;

      border-bottom: 1px solid rgb(136, 136, 136);
    }

    &-container {
      margin: 24px 0 0 0;
    }
  }
}
</style>
