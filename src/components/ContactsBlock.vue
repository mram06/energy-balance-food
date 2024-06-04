<template>
  <div class="contacts">
    <div class="container">
      <div class="contacts__body">
        <div class="contacts__row">
          <div class="contacts__user-info">
            <label>
              Ваше ім'я
              <input v-model="userObj.name" type="text" />
            </label>
            <label>
              Прізвище
              <input v-model="userObj.lastName" type="text" />
            </label>
            <label>
              Email / Логін
              <input v-model="userObj.email" type="email" />
            </label>
            <label>
              Дата народження
              <input v-model="userObj.birthday" type="text" />
            </label>
            <label>
              Телефон
              <input v-model="userObj.phone" type="text" />
            </label>
          </div>
          <div class="contacts__address-info">
            <label>
              Місто
              <input v-model="userObj.city" type="text" />
            </label>
            <label>
              Вулиця
              <input v-model="userObj.street" type="text" />
            </label>
            <div class="contacts__address-row">
              <label>
                Будинок
                <input v-model="userObj.house" type="text" />
              </label>
              <label>
                Квартира
                <input v-model="userObj.apartment" type="number " />
              </label>
              <label>
                Індекс
                <input v-model="userObj.postcode" type="number" />
              </label>
            </div>
          </div>
        </div>
        <button>Зберегти</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "pinia";
import { useAuthStore } from "@/store/modules/auth";
import { useUsersStore } from "@/store/modules/users";

export default {
  name: "ContactsBlock",
  data() {
    return {
      userObj: {
        name: {},
      },
    };
  },
  computed: {
    ...mapState(useAuthStore, ["user"]),
    ...mapState(useUsersStore, ["userInfo"]),
    getName() {
      return this.user.displayName.split(" ");
    },
  },
  methods: {
    ...mapActions(useUsersStore, ["getUser"]),
  },
  async created() {
    await this.getUser();
    this.userObj = {
      name: this.userInfo.name || this.getName[0],
      lastName: this.userInfo.lastName || this.getName[1],
      email: this.userInfo.email || this.user.email,
      birthday: this.userInfo.birthday,
      phone: this.userInfo.phone,
      city: this.userInfo.city,
      street: this.userInfo.street,
      house: this.userInfo.house,
      apartment: this.userInfo.apartment,
      postcode: this.userInfo.postcode,
    };
  },
};
</script>

<style lang="scss" scoped>
label {
  color: rgb(136, 136, 136);
  line-height: 24px;
  &:not(:first-child) {
    margin: 16px 0 0 0;
  }
  display: flex;
  gap: 8px;
  flex-direction: column;
  input {
    max-width: 488px;
    height: 40px;
    padding: 8px 16px 8px 16px;

    border-radius: 20px;
    box-shadow: 4px 4px 8px 0px rgba(0, 0, 0, 0.22),
      2px 2px 4px 0px rgba(0, 0, 0, 0.12);
    background: rgb(255, 255, 255);

    color: rgb(16, 16, 16);
    font-weight: 700;
    font-size: 16px;
    line-height: 24px;
  }
}
.contacts {
  &__body {
    margin: 0 auto;
    max-width: 1008px;
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 32px;
    padding: 48px 0;
  }

  &__row {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 32px;
    justify-content: space-between;
  }

  &__user-info {
  }

  &__address-info {
  }

  &__address-row {
    margin: 16px 0 0 0;
    label {
      margin: 0;
      input {
        max-width: 152px;
      }
    }
    display: flex;
    gap: 16px;
  }
}
button {
  text-align: center;
  width: 228px;
  background: none;
  color: rgb(239, 119, 42);
  border-radius: 20px;
  border: 1px solid rgb(239, 119, 42);
}
</style>
