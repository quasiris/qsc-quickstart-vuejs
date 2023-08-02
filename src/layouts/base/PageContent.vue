<template>
  <v-container class="mt-6">
    <v-row>
      <v-col cols="12">
        <v-card-text
          class="ps-6 d-flex justify-space-between align-center flex-wrap"
        >
          <!--  In this bar, i have results and Sorting and views-->
          <div class="my-2" v-if="!searchQuery">
            <h3 class="">All Products</h3>

            <p class="gray--text text--darken-1 mb-0">
              {{ totalproducts }} results found
            </p>
          </div>
          <div class="my-2" v-else>
            <h3>Hits for "{{ searchQuery }}"</h3>

            <p class="gray--text text--darken-1 mb-0">
              {{ totalproducts }} results found
            </p>
          </div>
 

          <div class="d-flex align-center flex-wrap">
            <!--   <div class="grey--text text--darken-1 me-2 my-2">Sort by :</div> -->

            <v-select  v-if="sorts.length > 0"
              class="border me-5"
              :items="sorts"
              label="sort by"
              dense
              v-model="selectedSort"
              @change="selectSort"
              item-text="name"
              item-value="id"
              outlined
              hide-details
              flat
            ></v-select>
            <!--  In this bar, i have results and Sorting and views -->
            <div class="grey--text text--darken-1 me-2 my-2"></div>
            <v-btn   v-if="$vuetify.breakpoint.width >= 600"
              icon
              @click="viewMode = 'grid'"
              :disabled="viewMode === 'grid'"
            >
              <img
                v-svg-inline
                class="icon"
                src="@/assets/images/icons/gift.svg"
                alt=""
              />
            </v-btn>
            <v-btn
 v-if="$vuetify.breakpoint.width >= 600"
              icon
              @click="viewMode = 'gift'"
              :disabled="viewMode === 'gift'"
            >
              <img
                v-svg-inline
                class="icon"
                src="@/assets/images/icons/grid.svg"
                alt=""
              />
            </v-btn>
            <v-btn   v-if="$vuetify.breakpoint.width >= 600"
              icon
              @click="viewMode = 'list'"
              :disabled="viewMode === 'list'"
            >
              <img
                v-svg-inline
                class="icon"
                src="@/assets/images/icons/menu.svg"
                alt=""
              />
            </v-btn>
          </div>
        </v-card-text>
        <v-divider class="mx-6 my-1 "></v-divider>
      </v-col>
     
      <v-col cols="12">
        <div class="box-wrapper">
          <div
            class="box-overlay"
            :class="{ open: isSidebar }"
            @click="isSidebar = !isSidebar"
          ></div>

          <v-card  v-if="facets && facets.length > 0">
            <div
              class="box-sidebar pb-4 shadow-sm"
              style="height: 100%;"
              :class="{ open: isSidebar }"
            >
              <div class="mx-6 pt-3">
                <h3 class="pt-3 d-flex align-center justify-center flex-column">
                  Our Products Range
                </h3>

                <!--  Here I have Code of Facets-->
                <div class="myfacet">
                  <v-col cols="12" v-for="facet in facets" :key="facet.id">
                    <v-divider class="mx-6 my-1"></v-divider>
                    <h4
                      class="pt-3 d-flex align-center justify-center flex-column"
                    >
                      {{ facet.name }}
                    </h4>
                    <div
                      class="filters"
                      v-for="value in facet.values"
                      :key="value"
                    >
                      <v-checkbox
                        hide-details
                        class="mt-3 smaller-checkbox
                      "
                        type="checkbox"
                        :value="value.filter"
                        v-model="selectedFilters"
                        :id="'filter-' + value.filter"
                      >
                        <template #label>
                          <label
                            class="text-decoration-none grey--text text--darken-2"
                          >
                            <span
                              class="hover-color"
                              @mouseover="hoverColor = true"
                              @mouseout="hoverColor = false"
                              style="font-size: 12px;"
                            >
                              {{ value.value }}
                              &nbsp; ({{ value.count }})
                            </span>
                          </label>
                        </template>
                      </v-checkbox>
                    </div>
                  </v-col>
                </div>
              </div>

              <v-divider class="mt-3"></v-divider>

              <div class="d-flex justify-center mt-4">
                <v-btn
                  color="primary"
                  class="text-capitalize search-bar-dropdown px-10 font-600"
                  @click="clearFilters()"
                  >Reset Filters</v-btn
                >
              </div>
            </div>
          </v-card>
          <div class="box-content">
            <div class="d-flex justify-end pa-2 d-block d-md-none">
              <v-btn color="#d23f57" icon @click="isSidebar = !isSidebar"  v-show="facets && facets.length > 0">
                <v-icon color="#d23f57">
                  mdi-format-list-bulleted-square
                </v-icon>
                Filters&nbsp;&nbsp;&nbsp;&nbsp;
              </v-btn>
            </div>
            <div class="box-container">
              <v-row>
                <div class="sQuery" v-show="searchQuery"  @click="clearSearchQuery" >
          &nbsp;  "{{ searchQuery }}" &nbsp;
            <div 
              v-if="searchQuery"
              class="clear-input justify-center "
              @click="clearSearchQuery"
            >
          &times;     &nbsp;
            </div> </div
          > 
                <v-col cols="12">
                  <v-data-iterator :items="items" hide-default-footer>
                    <!--  Here I have Products-->
             
                      
                      <v-row>
                        
                        <v-col
                          v-for="product in products"
                          :key="product.name"
                          :cols="
                            viewMode === 'list'
                              ? 12
                              : viewMode === 'gift'
                              ? 12
                              : 12
                          "
                          :sm="
                            viewMode === 'list'
                              ? 12
                              : viewMode === 'gift'
                              ? 6
                              : 6
                          "
                          :md="
                            viewMode === 'list'
                              ? 12
                              : viewMode === 'gift'
                              ? 6
                              : 6
                          "
                          :lg="
                            viewMode === 'list'
                              ? 12
                              : viewMode === 'gift'
                              ? 6
                              : 4
                          "
                          :xl="
                            viewMode === 'list'
                              ? 12
                              : viewMode === 'gift'
                              ? 6
                              : 3
                          "
                        >
                          <v-card
                            :style="{ height: cardHeight }"
                            :class="{ 'list-view': viewMode === 'list' }"
                          >
                            <a
                              v-bind:href="
                                [config.document.url] +
                                  product.document[config.document.sku]
                              "
                            >
                              <div class="image">
                                <img
                                  class="br-t-8"
                                  v-if="
                                    product.document &&
                                      product.document[config.document.image]
                                  "
                                  :src="
                                    product.document[
                                      config.document.image
                                    ].replace(/^.*?format=auto\//, '')
                                  "
                                  style="max-width: 100%; max-height: 100%; object-fit: contain; object-position: center;"
                                />
                              </div>

                              <v-card-text
                                class="d-flex justify-content-between align-end"
                              >
                                <div class="flex-grow-1 my-3">
                                  <h6
                                    class="mb-0 grey--text text--darken-4 "
                                    style="font-size: 12px;"
                                  >
                                    {{ product.document[config.document.name] }}
                                  </h6>
                                </div>
                              </v-card-text>
                            </a>
                          </v-card>
                        </v-col>
                      </v-row>
                 
                    <!--  Here I have Code of Pagination-->
                    <template v-slot:footer>
                      <v-row class="my-5 me-1" align="center" justify="center">
                        <v-spacer></v-spacer>

                        <span
                          class="mr-4
                                        grey--text"
                        >
                          Page {{ currentPage }} of {{ totalPages }}
                        </span>
                        <v-btn
                          fab
                          :disabled="currentPage == 1"
                          v-model="currentPage"
                          @click="handleClick"
                          small
                          color="primary"
                          class="mr-1"
                        >
                          <v-icon>mdi-chevron-left</v-icon>
                        </v-btn>
                        <v-btn
                          fab
                          :disabled="currentPage == totalPages"
                          v-model="currentPage"
                          @click="myhandleClick"
                          small
                          color="primary"
                          class="ml-1"
                        >
                          <v-icon>mdi-chevron-right</v-icon>
                        </v-btn>
                      </v-row>
                    </template>
                  </v-data-iterator>
                </v-col>
              </v-row>
            </div>
          </div>
        </div>
      </v-col>
    </v-row>
    <diV> </diV>
  </v-container>
</template>
<script>

import config from "@/../config.json";
import axios from "axios";

import { mapGetters } from "vuex";

export default {
  components: {},
  data() {
    return {
      products: [],
      totalproducts: "",
      selectedFilters: [],
      facets: [],
      sorts: [],
      selectedSort: "",
      currentPage: 1,
      isSidebar: false,
      config: config[0],
      viewMode: "grid",
      totalPages: "",
    };
  },
  props: {
    searchQuery: { type: String, default: "" }
  },

  computed: {
    cardHeight() {
      return this.viewMode === "list" ? "270px" : "300px";
    },
  

    ...mapGetters(["getProducts"])
  },
  created() {
    window.addEventListener("scroll", this.handleScroll);
    this.items = this.getProducts;
    // this.items = this.getProducts.slice(0, 15).map(n => n);
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },

  async mounted() {
    const url = window.location.href;
    console.log(url)
    for (const configItem of config) {
     
      if (url.includes(configItem.id)) {
        this.config = configItem;
       
        break; // Exit the loop once a match is found
      }
    }
    this.fetchProducts();
  },
  watch: {
    searchQuery() {
  this.clearFilters();
  this.currentPage=1;



   },

    selectedFilters() {
      this.currentPage= 1;
      this.fetchProducts();
  
      
    },
    selectedSort() {
      this.fetchProducts();
    },
  
  },

  methods: {
    fetchProducts() {
      const selectedFilters = this.selectedFilters.join("&");
      const selectedSort = this.selectedSort;
      const apiUrl = this.config.baseurl;

      const queryParameters = [];

      if (this.searchQuery) {
        queryParameters.push(`q=${this.searchQuery}`);
      }

      if (selectedFilters) {
        queryParameters.push(selectedFilters);
      }

      if (selectedSort) {
        queryParameters.push(`sort=${selectedSort}`);
      }

      if (this.currentPage) {
        queryParameters.push(`page=${this.currentPage}`);
      }

      const queryString = queryParameters.join("&");
      const apiUrlWithQuery = `${apiUrl}?${queryString}`;

      axios
        .get(apiUrlWithQuery)
        //   `${apiUrl}?q=${this.searchQuery}&${selectedFilters}&sort=${selectedSort}&page=${this.currentPage}`

        .then(response => {
          const products = response.data.result[this.config.product].documents;
          this.products = products;

          this.totalproducts = response.data.result[this.config.product].total;

          this.facets = response.data.result[this.config.product].facets;

          this.sorts = response.data.result[this.config.product].sort.sort;
          this.totalPages=response.data.result[this.config.product].paging.pageCount;
         
        })
        .catch(error => {
          console.log(error);
        });
    },
    selectmyFilters(filter) {
      this.selectedFilters = filter;
     
    },

    selectSort(sort) {
      this.selectedSort = sort;
    },

    nextPage() {
      if (this.currentPage + 1 <= this.totalPages) this.currentPage += 1;
      this.fetchProducts();
    },
    myhandleClick() {
      this.nextPage();
      this.scrollToTop();
    },
    handleClick() {
      this.formerPage();
      this.scrollToTop();
    },
    formerPage() {
      if (this.currentPage - 1 >= 1) this.currentPage -= 1;
      this.fetchProducts();
    },
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: "auto"
      });
    },
    clearFilters() {
      this.selectedFilters = [];

    
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    },
    clearSearchQuery() {
      this.searchQuery = "";
      this.$emit("onSearch", this.searchQuery);
    }
  }
};
</script>
<style>
.br-t-8 {
  border-top-right-radius: 8px;
  border-top-left-radius: 8px;
  margin-top: 30px;
}
.image {
  display: flex;
  justify-content: center;
  align-items: center;

  height: 200px;
  margin-right: 25px;
  margin-left: 25px;
}
.smaller-checkbox .v-input--selection-controls__input {
  transform: scale(0.8); /* Adjust the scale value as per your preference */
}
a {
  text-decoration: none;
}
.image:hover img {
  transform: scale(1.1);
  transition: transform 0.1s ease-in-out;
}
.image :hover .name {
  color: blue;
}

.list-view .v-card {
  margin-bottom: 16px;
}

.list-view .image {
  margin-right: 50px;
  margin-left: 50px; /* Set the margin to 0 */
}

.list-view .name {
  font-size: 46px;
  font-weight: bold;
  margin-bottom: 0px;
}
.v-select {
  max-width: 200px; /* Adjust the value as needed */
}
.clear-input {
  font-size: 20px;
  
  cursor: pointer;

  position: relative;
}
.clear-input:hover{
   color: #d23f57;
}
.hover-color:hover {
  color: #d23f57; /* Change the color to your desired hover color */
   cursor: pointer;
}
.sQuery{
  margin-left: 17px;
background-color: white;
  border: 1px solid black;
  display: flex; /* Set display to flex */
  align-items: center;
   border-radius: 23px;
}
.sQuery:hover{
   color: #d23f57;
    cursor: pointer;
}
.viewIcon{
   @media (max-width: 768px) {
      display: none;
    }
}
.box-wrapper {
  position: relative;
  display: flex;
  align-items: flex-start;
  width: 100%;
  border-radius: 8px;
}
</style>
