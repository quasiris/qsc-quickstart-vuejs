<template>
  <v-card class="head" color="grey-lighten-4" flat height="90px">
    <v-toolbar extended>
      <div>
        <a href="javascript:window.location.reload(true);">
        <img
          class="logo"
          :src= "config.logo"  />
        </a>
      </div>

      <v-toolbar class="mysearch">
        <input
          class="searchbar"
          type="text"
          v-model="searchQuery"
          @keydown.enter="searchProducts"
          placeholder=" article/keyword/product"
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
  <v-list-item-title> {{ suggest.suggest }}</v-list-item-title>
 
</v-btn>
      </ul>
      
    </v-toolbar> 
  </v-card>


</template>

<script>
import config from "@/../config.json";
import axios from "axios";
export default {
  name: "PageHead",

  data() {
    return {
      searchQuery: "",
      suggests: [],
      showDropdown: true,
      config: config[1],
    };
  },
  watch: {
    searchQuery() {
      this.fetchSuggestions();
    },
  },

  mounted() {
  
    this.$refs.searchInput.focus();
    this.searchProducts();
      document.addEventListener("click", this.hideDropdown);
       const url = window.location.href;
    if (url.includes("id=1")) {
      this.config = config[0];
    } else if (url.includes("id=2")) {
      this.config = config[1];
    }
    
    
  },
  methods: {
     hideDropdown(event) {
    if (!this.$refs.searchInput.contains(event.target)) {
      this.showDropdown = false;
    }
  },
    fetchSuggestions() {
      if (this.searchQuery === "") {
        this.suggests = '';
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
  
    },
    searchProducts() {
      this.showDropdown = false;
      this.suggests = "";
      if(this.searchQuery === this.suggests){
        this.showDropdown= false;
      }
    
      this.$emit("onSearch", this.searchQuery);
    
    },
    selectSuggestion(suggestion) {
      this.searchQuery = suggestion;
    this.showDropdown= false,
      this.searchProducts();
    },

    onScroll() {
      this.showDropdown = false;
    },

    onKeyUp(event) {
      if (event.keyCode === 8 && this.searchQuery === "") {
        this.showDropdown = false;

        this.searchProducts();
      } else {
        this.showDropdown = true;
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

.mysearch {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 550px;
  height: 60px;
  background-color: white;
  border: 1px solid grey;
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
  color: grey;
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
  width: 550px;
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
  background-color: grey
  ;
}

</style>
