<template>
  <v-card :class="{ 'fixed-app-bar': isFixedAppBar }">
    <v-container>
      <div class="d-flex justify-space-between align-center">
        <v-toolbar-title class="d-flex align-center">
          <div>
            <a href="javascript:window.location.reload(true);">
              <v-img
                class="me-2 logo d-md-block d-none"
                max-width="170px"
                max-height="64px"
                :src="config.logo"
                alt=""
              ></v-img>
            </a>
          </div>
        </v-toolbar-title>
        <v-col cols="12" md="7" 
        >
          <div class="search-bar d-flex p-relative">
            
            <v-text-field
              type="text"
              v-model="searchQuery"
              @keydown.enter="searchProducts"
              placeholder=" article / keyword / product"
              filled
              rounded
              hide-details
              dense
              prepend-inner-icon="mdi-magnify"
            >
             
            </v-text-field>
            

            <v-btn
              @click="searchProducts"
              color="primary"
              class="text-capitalize search-bar-dropdown px-10 font-600"
            >
              Search
            </v-btn>
             </div>
        
          
  <div class="top-priority " >
    <ul
      v-for="suggest in suggests"
      :key="suggest"
      @click="selectSuggestion(suggest.suggest)"
    >
    <v-list-item class="list-item" >
        <v-icon>mdi-magnify</v-icon> &nbsp; &nbsp; 
    {{ suggest.suggest }}</v-list-item>
  
    </ul>
  </div>
         

         
 


        </v-col>
        <div class="">
          <div class="d-md-block d-none"></div>
        </div>
    

      </div>
    </v-container>
  </v-card>
</template>

<script>

import config from "@/../config.json";
import axios from "axios";

export default {
  name: "AppBar",

  data() {
    return {
      searchQuery: "",
      suggests: [],
      config: config[0],
      isFixedAppBar: false,
      prevScrollPos: 0,
        selectedSuggestion: "",
   
      
    };
  },
  watch: {
    searchQuery() {
      
     if (this.searchQuery.trim() === "") {
      this.searchProducts();
    } else {
      this.fetchSuggestions();
    }
  },
  
  
    
  },
  mounted() {
      window.addEventListener("click", this.handleWindowClick);
    window.addEventListener("scroll", this.handleScroll);
    this.searchProducts();
this.fetchSuggestions();
    const url = window.location.href;
    for (const configItem of config) {
      if (url.includes(configItem.id)) {
        this.config = configItem;
        break; // Exit the loop once a match is found
      }
    }
  },
 beforeUnmount() {
    // Remove the event listener when the component is unmounted
    window.removeEventListener("click", this.handleWindowClick);
  },
  methods: {
    fetchSuggestions() {
    if (this.selectedSuggestion === this.searchQuery) {
    // If the selected suggestion is equal to the current search query,
    // do not make the API call
    this.suggests = [];
    return;
  }

  if (this.searchQuery.trim() === "") {
    this.suggests = [];
    return;
  }

  
      axios
        .get(
          `https://qsc-dev.quasiris.de/api/v1/suggest/ab/products?q=${this.searchQuery}`
        )
        .then(response => {
          this.suggests = response.data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    searchProducts() {
      this.$emit("onSearch", this.searchQuery);
        this.suggests = [];

      
    },
  
 selectSuggestion(suggestion) {
      this.searchQuery = suggestion;
      this.selectedSuggestion = suggestion;
      this.searchProducts();
      this.suggests = []; // Clear the suggestions list
    },
    handleScroll() {
      const currentScrollPos = window.pageYOffset;

      if (currentScrollPos === 0) {
        // At the top of the page
        this.isFixedAppBar = false;
      } else if (currentScrollPos > this.prevScrollPos) {
        // Scrolling down
        this.isFixedAppBar = false;
      } else {
        // Scrolling up
        this.isFixedAppBar = true;
      }

      this.prevScrollPos = currentScrollPos;
    },


    handleWindowClick() {
      this.suggests = []; // Clear the suggests list
    },
  },

};
</script>
<style lang="scss" scoped>
$z-index-sub-topbar: 2;
$md: 959px;
$z-99: 99;
.z-999 {
  z-index: 999;
}

.search-bar {
  ::v-deep .v-input__slot {
    border: 1px solid rgb(218, 225, 231);
    background-color: #fff !important;
  }
  .search-bar-dropdown {
    height: 39px;
    position: absolute;
    top: 20px;
    transform: translateY(-50%);
    right: 2px;
    border-radius: 22px;
    border-top-left-radius: 0px;
    border-bottom-left-radius: 0px;
    border-left: 1px solid rgb(218, 225, 231) !important;
    box-shadow: none !important;
    @media (max-width: $md) {
      display: none;
    }
  }
  ::v-deep .v-text-field__details {
    display: none;
  }
}

// toggleNavbarButton

.v-hidden {
  visibility: hidden;
}
.line {
  border-bottom: 0.1px solid gray; /* Adjust the color and thickness of the line */
  margin-top: 7px; /* Adjust the margin as needed */
}

@keyframes showAppBar {
  0% {
    transform: translateY(-100%);
  }
  100% {
    transform: translateY(0);
  }
}

.fixed-app-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
  animation: showAppBar 0.5s ease; /* Adjust the animation duration */
}
.suggestions-list {
  position: absolute;
 /* Adjust this value to position the list properly */

  z-index: 999; /* Ensure a high z-index to make the list appear above other elements */
  background-color: #fff;


  /* Limit the height of the list to enable scrolling if needed */
  
}
.container {
  position: relative;
}

.top-priority {
  position: absolute;
  z-index: 999;


    background-color: white;


    
}
.column-item {
  margin-bottom: 10px; /* Adjust this value to control the spacing between buttons */
}



.list-item {
  @media (max-width: 600px) {
    width: 350px; /* Set the width for small screens */
  }

  @media (min-width: 601px) and (max-width: 960px) {
    width: 650px; /* Set the width for medium screens */
  }

  /* Add more media queries for other screen sizes as needed */

  /* Default width for larger screens */
  width: 490px;
}


</style>
