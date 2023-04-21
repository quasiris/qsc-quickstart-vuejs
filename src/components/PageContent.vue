<template>
  <v-container color="grey-lighten-4" fluid>
    <v-row>
      <v-col cols="3">
        <PageFacet class="facet"
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
    {{ totalproducts }} Hits for <h4> "{{ searchQuery }}" </h4>
  </div>
        <hr>
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
                v-for="(sort, index) in sorts"
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

        <v-row>
          <v-col cols="4" v-for="product in products" :key="product">
            <div class="productview" width="300px" height="320px">
              <a
                v-bind:href="
                  'https://alexander-buerkle.com/de-de/produkt/?' +
                  product.document.sku
                "
              >
                <div class="image">
                  <img
                    class="pimage"
                    v-if="product.document && product.document.previewImageUrl"
                    :src="
                      product.document.previewImageUrl.replace(
                        /^.*?format=auto\//,
                        ''
                      )
                    "
                  />
                </div>

                <div class="name">
                  item no. {{ product.document.sku }}<br />

                  {{ product.document.name }}
                </div>
              </a>
            </div>
        
          </v-col>
        </v-row>
      <br> <br>
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
      products: [],
      currentPage: 1,
      totalproducts: "",
      facets: [],
      selectedFilters: [],
      sorts: [],
      selectedSort: "",
    };
  },
  props: {
    searchQuery: { type: String, default: "" },
  },

  async mounted() {
    this.fetchProducts();
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
      axios
        .get(
          `https://qsc-dev.quasiris.de/api/v1/search/ab/products?q=${this.searchQuery}&${selectedFilters}&sort=${this.selectedSort.id}&page=${this.currentPage}`

          // curl https://qsc-dev.quasiris.de/api/v1/search/ab/products?q=wago&f.available=true&f.categories=Reihenklemmen&sort=pricdesc&page=3
        )
        .then((response) => {
          this.products = response.data.result.products.documents;
          console.log(12, this.products);
          this.totalproducts = response.data.result.products.total;
          console.log(1, this.totalPages);
          this.facets = response.data.result.products.facets;
          this.sorts = response.data.result.products.sort.sort;
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
    myProducts() {
      this.products;
      this.$emit("myProduct", this.products);
    },
    selectSort(sort) {
      this.selectedSort = sort;
    },
  },

  computed: {},
};
</script>

<style>
.productview{
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

.name {
  font-weight: bold;
  background-color: white;
  font-size: 14px;
  color: black;
  height:70px;
  
margin-left: 3px;
 
 
}
a{
  text-decoration: none;
}



.facet{
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
.sortbutton{
  color: grey;
  border: 1px solid grey;
  font-weight: bold;
}
.productview:hover .name {
    color: blue;
  }
 
</style>
