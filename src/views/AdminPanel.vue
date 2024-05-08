<template>
  <main-master-page>
    <div class="container">
      <div class="admin">
        <h2 class="admin__title">Нова страва</h2>
        <label class="admin__input">
          Назва
          <input v-model="itemObj.title" type="text" class="main-input" />
        </label>
        <label class="admin__input">
          Інгредієнти
          <input v-model="itemObj.ingredients" type="text" class="main-input" />
        </label>
        <label class="admin__input">
          Ціна
          <input v-model="itemObj.price" type="number" class="main-input" />
        </label>
        <label class="admin__input">
          Категорія
          <select v-model="itemObj.category">
            <option value="breakfast">breakfast</option>
            <option value="main">main</option>
            <option value="salad">salad</option>
            <option value="soup">soup</option>
            <option value="pasta">pasta</option>
            <option value="croissant">croissant</option>
            <option value="dessert">dessert</option>
          </select>
        </label>
        <div class="admin__energy">
          <label class="admin__input">
            К -
            <input
              v-model="itemObj.energy[0]"
              type="number"
              class="main-input"
            />
          </label>
          <label class="admin__input">
            Б -
            <input
              v-model="itemObj.energy[1]"
              type="number"
              class="main-input"
            />
          </label>
          <label class="admin__input">
            Ж -
            <input
              v-model="itemObj.energy[2]"
              type="number"
              class="main-input"
            />
          </label>
          <label class="admin__input">
            В -
            <input
              v-model="itemObj.energy[3]"
              type="number"
              class="main-input"
            />
          </label>
        </div>
        <label class="admin__input">
          Зображення
          <input @change="uploadFile" type="file" class="main-input" />
        </label>

        <template v-if="error">
          <div class="error">Усі поля повинні бути заповненими</div>
        </template>
        <button @click="addDish">Додати страву</button>
      </div>
    </div>
  </main-master-page>
</template>

<script>
import MainMasterPage from "@/masterpages/MainMasterPage";
import { mapActions } from "pinia";
import { useItemsStore } from "@/store/modules/items";
export default {
  name: "AdminPanel",
  components: {
    MainMasterPage,
  },
  data() {
    return {
      itemObj: {
        energy: [],
      },
      error: null,
    };
  },
  methods: {
    ...mapActions(useItemsStore, ["addItem"]),
    uploadFile(event) {
      const file = event.target.files[0];
      if (file) {
        let reader = new FileReader();
        reader.onload = (e) => {
          this.itemObj.imgSrc = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    },
    addDish() {
      if (
        this.itemObj.title &&
        this.itemObj.ingredients &&
        this.itemObj.category &&
        this.itemObj.imgSrc &&
        this.itemObj.energy.length === 4
      ) {
        this.addItem(this.itemObj);
        this.itemObj = { energy: [] };
        this.error = null;
      } else this.error = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.error {
  color: red;
}
.admin {
  background-color: antiquewhite;
  padding: 0 112px;
  height: 60vh;
  &__input {
    margin: 16px 0 0 0;
    max-width: 400px;
    display: grid;
    grid-template-columns: 1fr;
  }
  select {
    padding: 8px 16px;
    line-height: 24px;
    font-size: 16px;

    border-radius: 20px;
    box-shadow: 4px 4px 8px 0px rgba(0, 0, 0, 0.22),
      2px 2px 4px 0px rgba(0, 0, 0, 0.12);
    background: rgb(255, 255, 255);
  }
  &__files {
    margin: 16px 0 0 0;
    max-width: 400px;
    border: 1px solid black;
  }
  &__energy {
    margin: 16px 0 0 0;
    display: flex;
    gap: 20px;
    label {
      display: flex;
      align-items: center;
      gap: 10px;
      input {
        width: 80px;
      }
    }
  }
  button {
    margin: 16px 0 0 0;
  }
}
</style>
