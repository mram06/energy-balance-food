<template>
  <main-master-page>
    <div class="container">
      <div class="menu-row">
        <aside class="aside">
          <div class="aside__body">
            <h2>Меню</h2>
            <a
              href="#breakfast"
              :class="[
                'aside__category',
                {
                  active: activeCategory === 0,
                },
              ]"
            >
              Сніданки
            </a>
            <a
              href="#main"
              :class="[
                'aside__category',
                {
                  active: activeCategory === 1,
                },
              ]"
            >
              Основні страви
            </a>
            <a
              href="#salad"
              :class="[
                'aside__category',
                {
                  active: activeCategory === 2,
                },
              ]"
            >
              Салати
            </a>
            <a
              href="#soup"
              :class="[
                'aside__category',
                {
                  active: activeCategory === 3,
                },
              ]"
            >
              Супи
            </a>
            <a
              href="#pasta"
              :class="[
                'aside__category',
                {
                  active: activeCategory === 4,
                },
              ]"
            >
              Пасти
            </a>
            <a
              href="#croissants"
              :class="[
                'aside__category',
                {
                  active: activeCategory === 5,
                },
              ]"
            >
              Круасани
            </a>
            <a
              href="#desserts"
              :class="[
                'aside__category',
                {
                  active: activeCategory === 6,
                },
              ]"
            >
              Десерти
            </a>
          </div>
        </aside>

        <div class="menu">
          <div class="menu__body">
            <div class="menu__search">
              <input
                v-model="searchName"
                type="text"
                placeholder="Назва страви"
                class="main-input"
              />
              <div class="menu__search-button">
                <img src="@/assets/icons/search.svg" />
              </div>
            </div>

            <menu-item-panel @visible-category="onVisible" />
          </div>
        </div>
      </div>
      <div class="banner">
        <div class="container">
          <div class="banner__body">
            <h2 class="banner__title">Харчуйся з користю разом з</h2>
            <h2 class="banner__logo">Energy <span>Balance</span></h2>
          </div>
        </div>
      </div>
    </div>
  </main-master-page>
</template>

<script>
import MainMasterPage from "@/masterpages/MainMasterPage.vue";
import MenuItemPanel from "@/components/MenuItemPanel.vue";
import { mapActions, mapState } from "pinia";
import { useItemsStore } from "@/store/modules/items";

export default {
  name: "MenuView",
  components: { MainMasterPage, MenuItemPanel },
  data() {
    return {
      activeCategory: null,
      searchName: null,
    };
  },
  computed: {
    ...mapState(useItemsStore, ["isDataLoaded"]),
  },
  methods: {
    ...mapActions(useItemsStore, ["setSearchByName"]),
    onVisible(index) {
      this.activeCategory = index;
      console.log(index);
    },
  },
  watch: {
    searchName(newValue) {
      this.setSearchByName(newValue);
    },
  },
};
</script>

<style lang="scss" scoped>
.menu-row {
  padding: 0 0 0 112px;
  display: flex;
  gap: 62px;
}
.active {
  color: rgb(239, 119, 42);
}

.aside {
  width: 116px;
  &__body {
    position: fixed;
  }
  padding: 48px 0 0 0;
  :nth-child(2) {
    margin: 24px 0 0 0;
  }
  h2 {
    color: rgb(239, 119, 42);
  }
  &__category {
    text-wrap: nowrap;
    margin: 16px 0 0 0;
    font-weight: bold;
  }
}
.menu {
  width: 100%;
  &__body {
    padding: 48px 112px 48px 48px;
    background: rgb(242, 240, 238);
  }

  &__search {
    position: relative;
    input {
      width: 100%;
      padding-right: 40px;
      font-size: 16px;
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
.container {
}
</style>
