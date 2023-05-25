<template>
  <v-container color="grey-lighten-4" fluid>

    <v-row>
      <v-col cols="3">
        <PageFacet
          class="facet"
          :searchQuery="searchQuery"
          :facets="facets"
          :selectedFilters="selectedFilters"
          @selectedFilters="selectmyFilters"
        />
      </v-col>

      <v-col cols="9">
        <div v-if="!searchQuery">
          <h1>All Products</h1>

          <p>{{ totalproducts }} items found</p>
        </div>
        <div v-else>
          {{ totalproducts }} Hits for
          <h2>"{{ searchQuery }}"</h2>
        </div>
        <hr />
        <!-- Here is a Sort Code-->
        <div class="text-right">
          <v-menu open-on-hover>
            <template v-slot:activator="{ props }">
              <v-btn class="sortbutton" v-bind="props">
                Sort by: {{ selectedSort.name }}
              </v-btn>
            </template>

            <v-list>
              <v-list-item
                v-for="(sort,index) in sorts"
                :key="sort"
                @click="selectSort(sort)"
                :value="index === 0"
              >
                <v-list-item-title>{{ sort.name }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>

        <br />

        <v-icon @click="gridLayout = false">mdi-view-parallel</v-icon>
        <v-icon @click="gridLayout = true">mdi-view-stream</v-icon>
        <v-row :class="{ 'product-grid': gridLayout }">
          <v-col
            :cols="gridLayout ? 12 : 4"
            v-for="product in products"
            :key="product"
          >
            <div class="productview" width="300px" height="320px">
              <a
                v-bind:href=" [config.linkUrl] + product.document[config.document.sku]"
              >
                <div class="image">
                  <img
                    class="pimage"
                    v-if="
                      product.document &&
                      product.document[config.document.image]
                    "
                    :src="
                      product.document[config.document.image].replace(/^.*?format=auto\//,'')
                    "
                  />
                </div>
 <!-- this code was for sku, but we do not need now-->
                <div class="name">
                   {{ product.document[config.document.description]
                  }}<br />

                  {{ product.document[config.document.name] }}
                </div>
              </a>
            </div>
          </v-col>
        </v-row>
        <br />
        <br />

        <Page-pagination
          :selectedFilters="selectedFilters"
          :searchQuery="searchQuery"
          :currentPage="currentPage"
          @page-changed="onPageChanged"
          :totalproducts="totalproducts"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import config from "@/../config.json";
import PageFacet from "./PageFacet.vue";
import PagePagination from "./PagePagination.vue";
import axios from "axios";
export default {
  name: "PageContent",
  components: {
    PagePagination,
    PageFacet,
  },

  data() {
    return {
      gridLayout: false,
      products: [],
      currentPage: 1,
      totalproducts: "",
      facets: [],
      selectedFilters: [],
      sorts: [],
      selectedSort: "",
      config: config,
    };
  },
  props: {
    searchQuery: { type: String, default: "" },
  },

  async mounted() {
    const url = window.location.href;
    if (url.includes("id=1")) {
      this.config = config[0];
    } else if (url.includes("id=2")) {
      this.config = config[1];
    }
    this.fetchProducts();

  if (this.sorts.length > 0) {
    this.selectedSort = this.sorts[0];
  }

   
  },
  watch: {
    searchQuery() {
      // Call the fetchProducts method with the updated search query
      this.fetchProducts();
    },
    currentPage() {
      this.fetchProducts();
    },
    selectedFilters() {
      this.fetchProducts();
    },
    selectedSort() {
      this.fetchProducts();
    },
  },

  methods: {
    fetchProducts() {
      const selectedFilters = this.selectedFilters.join("&");
  const selectedSort = this.selectedSort ? this.selectedSort.id : '';
      const apiUrl = this.config.baseurl;
      console.log(apiUrl);
      axios
        .get(
          `${apiUrl}?q=${this.searchQuery}&${selectedFilters}&sort=${selectedSort}&page=${this.currentPage}`
        )
        .then((response) => {
          const products = response.data.result[this.config.product].documents;
          this.products = products;

          this.totalproducts = response.data.result[this.config.product].total;

          console.log(this.totalproducts);

          this.facets = response.data.result[this.config.product].facets;
          console.log(this.facets);

          this.sorts = response.data.result[this.config.product].sort.sort;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    onPageChanged(page) {
      this.currentPage = page;
    },
    selectmyFilters(filter) {
      this.selectedFilters = filter;
    },

  
    selectSort(sort) {
      this.selectedSort = sort;
    },
    
  },

  computed: {},
};
</script>

<style>
.productview {
  border: 1px solid #ccc;
}
.pimage {
  max-width: 200px;
  max-height: 200px;
}
.image {
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 300px; /* Set the width of the container to match the image width */
  height: 250px;
}
.productview :hover {
  border-color: 10px solid blue;
}

.name {
  font-weight: bold;
  background-color: white;
  font-size: 14px;
  color: black;
  height: 70px;

  margin-left: 3px;
}
a {
  text-decoration: none;
}

.facet {
  display: flex;
  position: relativew;
}
@media only screen and (max-width: 600px) {
  .productview {
    width: 50%;
  }

  .pimage {
    max-width: 100%;
  }
}
.sortbutton {
  color: grey;
  border: 1px solid grey;
  font-weight: bold;
}
.sortbutton :hover {
  color: blue;
  cursor: pointer;
  font-weight: bold;
  font-size: 14px;
}
.productview:hover .name {
  color: blue;
}
.image:hover img {
  transform: scale(1.1);
  transition: transform 0.1s ease-in-out;
}
</style>
