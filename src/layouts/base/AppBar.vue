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
        <v-col cols="12" md="7">
          <div class="search-bar d-flex p-relative">
        
  <v-text-field
    type="text"
    v-model="searchQuery"
    placeholder=" article / keyword / product"
    filled
    rounded
    hide-details
    dense
    prepend-inner-icon="mdi-magnify"
    
  >
   <template #append>
    <span  v-if="searchQuery && $vuetify.breakpoint.width >= 600" class="clear-input" @click="clearSearchQuery">
      &times;
    </span>
  </template>
  </v-text-field>
  

            <v-btn   v-if="$vuetify.breakpoint.width >= 600"
              @click="searchProducts"
              color="primary"
              class="text-capitalize search-bar-dropdown px-10 font-600 search-button"
            >
              Search
            </v-btn>
           
          </div>

          <div class="top-priority">
            <ul>
              <li
                v-for="(suggest, index) in suggests"
                :key="index"
                :class="{ selected: index === selectedIndex }"
              >
                <v-list-item
                  class="list-item"
                  @click="selectSuggestion(suggest.suggest)"
                  @keydown.enter.prevent="selectSuggestion(suggest.suggest)"
                  @mouseover="handleMouseOver(index)"
                  @mouseleave="handleMouseLeave"
                  tabindex="0"
                >
                  <v-icon
                    class="no-animation"
                    :class="{
                      'white--text': index === selectedIndex,
                      highlighted: index === selectedIndex
                    }"
                    >mdi-magnify</v-icon
                  >
                  &nbsp; &nbsp;
                  <span
                    :class="{
                      'white-font': index === selectedIndex,
                      highlighted: index === selectedIndex
                    }"
                  >
                    {{ suggest.suggest }}</span
                  >
                </v-list-item>
              </li>
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
    
      suggests: [],
      config: config[0],
      isFixedAppBar: false,
      prevScrollPos: 0,
      selectedSuggestion: "",
      selectedIndex: -1,
      isMouseOver: false
    };
  },
  props: {
    searchQuery: { type: String, default: "" }
  },
  watch: {
    searchQuery() {
      this.selectedIndex = -1;
      if (this.searchQuery.trim() === "") {
        this.searchProducts();
      } else {
        this.fetchSuggestions();
      }
    }
  },
  async mounted() {
    window.addEventListener("mousemove", this.handleMouseMove);
    document.addEventListener("keydown", this.handleKeyDown);
    window.addEventListener("click", this.handleWindowClick);
    window.addEventListener("scroll", this.handleScroll);
    this.searchProducts();

    const url = window.location.href;
    for (const configItem of config) {
      if (url.includes(configItem.id)) {
        this.config = configItem;
        break; // Exit the loop once a match is found
      }
    }
    this.fetchSuggestions();
  },
  beforeUnmount() {
    window.removeEventListener("mousemove", this.handleMouseMove);
    // Remove the event listener when the component is unmounted
    window.removeEventListener("click", this.handleWindowClick);
  },
  methods: {
    fetchSuggestions() {
      const suggestUrl = this.config.suggestionUrl;

    
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
      const encodedSearchQuery = encodeURIComponent(this.searchQuery);
      axios
     .get(`${suggestUrl}${encodedSearchQuery}`)
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
      console.log("Selected suggestion:", suggestion);
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
    handleMouseOver(index) {
      this.selectedIndex = index;
      this.isMouseOver = true;
    },

    handleMouseLeave() {
      this.isMouseOver = false;
    },

    handleKeyDown(event) {
      if (event.key === "ArrowUp") {
        event.preventDefault();
        if (this.selectedIndex > 0) {
          this.selectedIndex--;
        }
        this.isMouseOver = false; // Reset the isMouseOver flag when using keyboard navigation
      } else if (event.key === "ArrowDown") {
        event.preventDefault();
        if (this.selectedIndex < this.suggests.length - 1) {
          this.selectedIndex++;
        }
        this.isMouseOver = false; // Reset the isMouseOver flag when using keyboard navigation
      } else if (event.key === "Enter") {
        event.preventDefault();
        if (this.selectedIndex !== -1) {
          const selectedSuggestion = this.suggests[this.selectedIndex].suggest;
          this.selectSuggestion(selectedSuggestion);
        } else if (this.searchQuery.trim() !== "") {
          this.searchProducts();
        }
        this.isMouseOver = false; // Reset the isMouseOver flag when using keyboard navigation
      }
    },
    clearSearchQuery() {
      this.searchQuery = "";
      this.$emit("onSearch", this.searchQuery);
    },
  }
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

  /* Limit the height of the list to enable scrolling if needed */
}
.container {
  position: relative;
}

.top-priority {
  position: absolute;
  z-index: 999;

  background-color: white;

  ul {
    list-style: none; // Remove bullet circle
  }
}

.list-item {
  @media (max-width: 600px) {
    width: 290px; /* Set the width for small screens */
  }

  @media (min-width: 601px) and (max-width: 960px) {
    width: 650px; /* Set the width for medium screens */
  }

  /* Add more media queries for other screen sizes as needed */

  /* Default width for larger screens */
  width: 490px;
}
.search-bar-dropdown {
  /* Override any conflicting styles on smaller screens */
  @media (max-width: $md) {
    display: inline-block !important;
  }
}

.list-item {
  font-weight: bold;
}

.selected {
  background-color: #d23f57;
}
.white-font {
  color: white;
}
.highlighted {
  font-size: 1.2em; /* Adjust the desired font size for the highlighted suggestion */
}
.no-animation {
  transition: none !important;
}
.clear-input {
  font-size: 30px;
  color: #d23f57;
  cursor: pointer;
  margin-right: 140px;
  position: relative;
  top: -5px;
}
.v-hidden {
  visibility: hidden;
}

</style>
