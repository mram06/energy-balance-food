<template>
  <div class="menu__category" id="breakfast">
    <div class="menu__category-title">Сніданки</div>
    <div class="menu__category-container">
      <menu-item
        v-for="item in getItemsByCategory.breakfast"
        :key="item.id"
        :itemData="item"
      />
    </div>
  </div>

  <div class="menu__category" id="main">
    <div class="menu__category-title">Основні страви</div>
    <div class="menu__category-container">
      <menu-item
        v-for="item in getItemsByCategory.main"
        :key="item.id"
        :itemData="item"
      />
    </div>
  </div>
  <div class="menu__category" id="salad">
    <div class="menu__category-title">Салати</div>
    <div class="menu__category-container">
      <menu-item
        v-for="item in getItemsByCategory.salad"
        :key="item.id"
        :itemData="item"
      />
    </div>
  </div>
  <div class="menu__category" id="soup">
    <div class="menu__category-title">Супи</div>
    <div class="menu__category-container">
      <menu-item
        v-for="item in getItemsByCategory.soup"
        :key="item.id"
        :itemData="item"
      />
    </div>
  </div>
  <div class="menu__category" id="pasta">
    <div class="menu__category-title">Пасти</div>
    <div class="menu__category-container">
      <menu-item
        v-for="item in getItemsByCategory.pasta"
        :key="item.id"
        :itemData="item"
      />
    </div>
  </div>
  <div class="menu__category" id="croissants">
    <div class="menu__category-title">Круасани</div>
    <div class="menu__category-container">
      <menu-item
        v-for="item in getItemsByCategory.croissant"
        :key="item.id"
        :itemData="item"
      />
    </div>
  </div>
  <div class="menu__category" id="desserts">
    <div class="menu__category-title">Десерти</div>
    <div class="menu__category-container">
      <menu-item
        v-for="item in getItemsByCategory.dessert"
        :key="item.id"
        :itemData="item"
      />
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "pinia";
import { useItemsStore } from "@/store/modules/items";
import MenuItem from "./MenuItem.vue";

export default {
  name: "MenuItemPanel",
  components: {
    MenuItem,
  },
  data() {
    return {
      visibleCategory: null,
      observer: null,
    };
  },
  computed: {
    ...mapState(useItemsStore, ["getItemsByCategory"]),
  },
  methods: {
    ...mapActions(useItemsStore, ["loadList"]),
    highlightVisibleCategory(entries) {
      entries.forEach((entry) => {
        const index = Number(entry.target.dataset.index);
        if (entry.isIntersecting) {
          this.visibleCategory = index;
          this.$emit("visibleCategory", index);
        }
      });
    },
  },
  mounted() {
    this.loadList();
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.6, // Перевірка, чи видимо хоча б наполовину
    };
    this.observer = new IntersectionObserver(
      this.highlightVisibleCategory,
      options
    );
    document.querySelectorAll(".menu__category").forEach((category, index) => {
      this.observer.observe(category);
      category.dataset.index = index; // Зберігаємо індекс категорії для визначення видимості
    });
  },
  beforeUnmount() {
    this.observer.disconnect();
  },
};
</script>

<style lang="scss" scoped>
.menu {
  &__category {
    padding: 48px 0 0 0;
    &-title {
      color: rgb(16, 16, 16);
      font-size: 24px;
      font-weight: 700;
      line-height: 32px;

      border-bottom: 1px solid rgb(136, 136, 136);
    }

    &-container {
      display: grid;
      gap: 48px;
      grid-template-columns: repeat(2, 1fr);

      margin: 24px 0 0 0;
    }
  }
}
</style>
