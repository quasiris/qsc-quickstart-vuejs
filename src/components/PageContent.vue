<template>
  <v-container fluid>
    <v-row>
      <v-col cols="3">
        <h2>Our Products Range</h2>
        <v-card>
          <v-col cols="12" v-for="facet in facets" :key="facet">
          <button>  <h2>{{facet.name}}</h2> </button>
      <ul>
      <li v-for="value in facet.values" :key="value"  @click="selectValue = value.filter">
        {{ value.value }}
      </li>
    </ul>
        
          </v-col>
          {{selectValue}}
        </v-card>

        <PageFacet />
        <v-divider></v-divider>
      </v-col>

      <v-col cols="9">
        <v-row>
          <v-col cols="12">
            <v-card><h1>All Products</h1> </v-card>
          </v-col>
        </v-row>

        <container fluid>
          <v-row>
            <v-col cols="12"> </v-col>
          </v-row>
          <v-row>
            <v-col cols="4" v-for="product in products" :key="product">
              <v-card height="150px" width="300px">
                <img class="image" />
                <br />
                {{ product.document.name }}
              </v-card>
            </v-col>
          </v-row>
        </container>
        <v-row>
          <v-col cols="9"> </v-col>
          <v-col cols="3">
            <div class="pagein">
              <Page-pagination
                :currentPage="currentPage"
                @page-changed="onPageChanged"
                :totalpage="totalpages"
              />
            </div>
          </v-col>
        </v-row>
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
      totalpages: "",
      facets: [],
      selectValue: '',
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
    selectValue(){
      this.fetchProducts();
    }
   
  },

  methods: {
    fetchProducts() {
      axios
        .get(
          `https://qsc-dev.quasiris.de/api/v1/search/ab/products?q=${this.searchQuery}&${this.selectValue}&page=${this.currentPage}`

          // curl https://qsc-dev.quasiris.de/api/v1/search/ab/products?q=wago&f.available=true&f.categories=Reihenklemmen&sort=pricdesc&page=3
        )
        .then((response) => {
          this.products = response.data.result.products.documents;
          console.log(12, this.products);
          this.totalpages = response.data.result.products.total;
          console.log(1, this.totalPages);
          this.facets = response.data.result.products.facets;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    onPageChanged(page) {
      this.currentPage = page;
    },
  
  },
  computed: {},
};
</script>

<style>
.image {
  height: 120px;
  width: 250px;
}
</style>
