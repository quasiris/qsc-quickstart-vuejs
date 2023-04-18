<template>
  <v-card class="head" color="grey-lighten-4" flat height="90px">
    <v-toolbar extended>
      <div>
        <img
          class="logo"
          src="https://www.quasiris.de/wp-content/uploads/2017/03/logo.png"
        />
      </div>

      <v-toolbar class="mysearch">
        <input
          class="searchbar"
          type="text"
          v-model="searchQuery"
          placeholder=" article/keyword"
          @keyup.enter="searchProducts"
          @keyup="onKeyUp"
          ref="searchInput"
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

      <ul class="dropdown-menu" v-show="showDropdown" v-scroll="onScroll">
        <v-btn
          v-for="suggest in suggests"
          :key="suggest"
          @click="selectSuggestion(suggest.suggest)"
        >
          {{ suggest.suggest }}
        </v-btn>
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

  mounted() {
    this.fetchSuggestions();
    this.$refs.searchInput.focus();
  },
  methods: {
    fetchSuggestions() {
      if (this.searchQuery === "") {
        this.suggests = [];
        return;
      }
      axios
        .get(
          `https://qsc-dev.quasiris.de/api/v1/suggest/ab/products?q=${this.searchQuery}`
        )
        .then((response) => {
          this.suggests = response.data;
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          if (this.suggests.length === 0) {
            this.suggests.push({ suggest: "No suggestion found" });
          }
        });
    },

    clearSearchQuery() {
      this.searchQuery = "";
      this.$emit("onSearch", this.searchQuery);
      this.showDropdown = true;
    },
    searchProducts() {
 
      this.showDropdown = false;

      this.$emit("onSearch", this.searchQuery);
    },
    selectSuggestion(suggestion) {
      this.searchQuery = suggestion;

      this.showDropdown = false;
      this.searchProducts();
    },
    onScroll() {
      if (window.scrollY === 0 && this.searchQuery.length === 2) {
        this.showDropdown = true;
      } else {
        this.showDropdown = false;
      }
    },
    onKeyUp(event) {
      if (event.keyCode === 8 && this.searchQuery === '') {
        this.showDropdown = false;

        this.searchProducts();
      }
        else {
          this.showDropdown= true;
        }
      
      
    },
  },
};
</script>
<style>
.head {
  flex-direction: column;

  position: relative;
}
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
  width: 400px;
  display: flex;
  flex-direction: column;

  position: fixed;
  z-index: 1030;
  background-color: white;
  top: 73px;
  left: 0px;
  margin-left: 320px;
}

.dropdown-menu li {
  padding: 100px;
  cursor: pointer;
}

.dropdown-menu li:hover {
  background-color: lightgrey;
}
</style>
