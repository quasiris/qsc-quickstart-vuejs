<template>
  <v-card color="grey-lighten-4" flat height="90px">
    <v-toolbar extended>
      <div>
        <v-toolbar-title>
          <button class="title">Quasiris</button>
        </v-toolbar-title>
      </div>

      <div >
     <v-toolbar class="mysearch" >  <input
          class="searchbar"
          type="text"
          v-model="searchQuery"
          placeholder=" article/keyword"
          @keyup.enter="searchProducts"
        />

<v-spacer></v-spacer>
        <span v-if="searchQuery" class="clear-input" @click="clearSearchQuery">
          &times;
        </span>
        <button class="button" @click="searchProducts"
          ><v-icon>mdi-magnify </v-icon></button>
      </v-toolbar>
      </div>

      <v-spacer></v-spacer>

      <button class="login" @click="showLoginForm = true">
        <v-icon>mdi-login </v-icon> Login/Register
      </button>

      <button class="cart">My Cart <v-icon>mdi-cart </v-icon></button>

      <button class="menu">
        <p>Menu<v-icon>mdi-dots-vertical</v-icon></p>
      </button>
    </v-toolbar>
  </v-card>
</template>

<script>
export default {
  name: "PageHead",

  data() {
    return {
      searchQuery: "",
    };
  },
  methods: {
    clearSearchQuery() {
      this.searchQuery = "";
    },
    searchProducts() {
      this.searchQuery;
      this.$emit("onSearch", this.searchQuery);
    },
  },
};
</script>
<style>
.title {
  color: red;
  background-color: white;

  font-weight: bold;
  width: 200px;
  height: 150px;
  font-size: 36px;
  padding-top: 30px;
}
.mysearch {
   display: flex;
  align-items: center;
  justify-content: center;
  width: 450px;
  height: 50px;
  background-color: white;
  border: 2px solid red;
  margin-left: 40px;
  margin-top: 20px;
}

.searchbar {
  width: 350px;
  margin-left:  10px;

  
}
.searchbar:focus {
  outline: none;
}
.clear-input {
  font-size: 30px;
  color: red;
  cursor: pointer;
}

.clear-input:hover {
  color: #000;
}
.button {
  color: black;

  width: 50px;
 
}

.login {
  background-color: white;
  padding-top: 30px;
  text-align: center;
  width: 200px;
  height: 150px;
}
.cart {
  background-color: white;

  border-color: black;
  padding-top: 30px;
  border-left: 1px solid black;
  font-weight: 700;
  width: 150px;
  height: 150px;
}

.menu {
  background-color: red;
  color: white;
  border: none;
  padding-top: 30px;
  font-size: 20px;
  cursor: pointer;
  border-left: 1px solid black;
  font-weight: 700;
  width: 150px;
  text-align: center;
  height: 150px;
}
</style>
