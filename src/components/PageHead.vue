<template>
  <v-card color="grey-lighten-4" flat height="90px">
    <v-toolbar extended>
      <div>
        <img
          class="logo"
          src="https://www.quasiris.de/wp-content/uploads/2017/03/logo.png"
        />
      </div>

      <v-toolbar class="mysearch" >
        <input
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
        <v-btn
          class="button"
          @click="searchProducts"
          :ripple="{ disable: true }"
          ><v-icon size="32">mdi-magnify </v-icon></v-btn
        >
      </v-toolbar>
    <ul class="dropdown-menu" v-show="showDropdown">
  <menu v-for="suggest in suggests"
            :key="suggest"
            @click="selectSuggestion(suggest.suggest)">{{ suggest.suggest}}</menu>
</ul>


            

     
    </v-toolbar>
  </v-card>
</template>

<script>
import axios from "axios";
export default {
  name: "PageHead",

  data() {
    return {
      searchQuery: "",
      suggests: [],
          showDropdown: true,
    };
  },
  watch: {
    searchQuery() {
      this.fetchSuggestions();
     
    },
  },

  async mounted() {
    this.fetchSuggestions();
  },
  methods: {
    fetchSuggestions() {
      axios
        .get(
          `https://qsc-dev.quasiris.de/api/v1/suggest/ab/products?q=${this.searchQuery}`
        )
        .then((response) => {
          this.suggests = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    clearSearchQuery() {
      this.searchQuery = "";
      this.$emit("onSearch", this.searchQuery);
        this.showDropdown = true; 
    },
    searchProducts() {
      this.searchQuery;
      this.$emit("onSearch", this.searchQuery);
    },
    selectSuggestion(suggestion) {
      this.searchQuery = suggestion;
       this.showDropdown = false; 
    },
    
  },
};
</script>
<style>
.logo {
  max-width: 170px;
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
.dropdown-menu {
  display: flex;
  flex-direction: column;

  position: fixed;
  z-index: 1;
  background-color: white;
  border: 1px solid grey;
  list-style: none;
  padding: 0;
  margin-top: 300px;
  margin-left: 350px;
}

.dropdown-menu li {
  padding: 10px;
  cursor: pointer;
}

.dropdown-menu li:hover {
  background-color: lightgrey;
}



</style>





