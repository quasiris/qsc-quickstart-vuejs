<template>
  <v-card color="grey-lighten-4" flat height="90px">
    <v-toolbar extended>
      <div >
        <img class="logo"   src="https://www.quasiris.de/wp-content/uploads/2017/03/logo.png" >
      </div>

 
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
        <v-btn class="button" @click="searchProducts" :ripple="{disable: true}"
          ><v-icon size="32">mdi-magnify </v-icon></v-btn
        >
      </v-toolbar>
   

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
  max-width: 200px;
max-height: 64px;
  margin-left: 10px;
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
  width: 550px;
  height: 60px;
  background-color: white;
  border: 2px solid red;
  margin-left: 140px;
  margin-top: 20px;
}
.searchbar {
  width: 450px;
  margin-left: 10px;
  height: 50px;

  
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
 
  height: 60px;
  width: 40px;
  
 
}





</style>
