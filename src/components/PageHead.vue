<template>
  <v-card color="grey-lighten-4" flat height="90px">
    <v-toolbar extended>
      <div >
        <img class="logo"   src="https://www.quasiris.de/wp-content/uploads/2017/03/logo.png" >
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
        <v-btn class="button" @click="searchProducts"
          ><v-icon>mdi-magnify </v-icon></v-btn
        >
      </v-toolbar>
      </div>

      <v-spacer></v-spacer>

     
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
       this.$emit("onSearch", this.searchQuery);

    },
    searchProducts() {
      this.searchQuery;
      this.$emit("onSearch", this.searchQuery);
    },
  },
};
</script>
<style>
.logo{
  height: 64px;
  width: 200px;
  margin-left: 20px;
  margin-top: 30px;
}
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
  margin-left: 140px;
  margin-top: 20px;
}
.searchbar {
  width: 350px;
  margin-left: 10px;

  
}
.searchbar:focus {
  outline: none;
}
.clear-input {
  font-size: 40px;
  color: red;
  cursor: pointer;
}

.clear-input:hover {
  color: #000;
}
.button {
  color: white;

  width: 40px;
 
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
