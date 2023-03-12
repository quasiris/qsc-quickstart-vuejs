<template>
<PageHead />
  <v-container fluid>
    <v-row>
      <v-col cols="3">
        <v-card>
          <h1> All Categories</h1>
        </v-card>
        <v-divider></v-divider>
      </v-col>

      <v-col cols="9">
        <v-row>
          <v-col cols="12">
            <v-card>
              <h1>All Products</h1>
            </v-card>
          </v-col>
        </v-row>

        <container fluid>
          <v-row>
            <v-col cols="12">
              <v-text-field v-model="searchQuery" label="Search Products" outlined></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="4" v-for="product in products" :key="product">
              <v-card height="150px" width="300px">
                <img class="image" :src="product.document.previewImageUrl" />
                <br />
                {{ product.document.name }}
              </v-card>
            </v-col>
          </v-row>
          <v-toolbar>
            
            <button @click="loadPreviousPage" :disabled="currentPage === 1">
              <v-icon>mdi-chevron-left</v-icon></button>
            <span>Page {{ currentPage }}</span>
            
            <button @click="loadNextPage" :disabled="currentPage === totalPages">
              <v-icon>mdi-chevron-right</v-icon></button>
            <div>Total Pages: {{totalPage}}</div>

          </v-toolbar>
        </container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import PageHead from './PageHead.vue';
import axios from "axios";
export default {
  name: "PageContent",
  components: {
    PageHead,
  },

  data() {
    return {
      currentPage: 1,
      products: [],
      totalPages: "",
      searchQuery: "",
    };
  },

  async mounted() {
    this.fetchProducts();
  },

  methods: {
    fetchProducts() {
      axios
        .get(
          `https://qsc-dev.quasiris.de/api/v1/search/ab/products?q=${this.searchQuery}&page=${this.currentPage}`
        )
        .then((response) => {
          this.products = response.data.result.products.documents;
          this.totalPages = response.data.result.products.total;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    loadPreviousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.fetchProducts();
      }
    },

    loadNextPage() {
      // Check if there are more products available in the next page
      if (this.products.length > 0) {
        this.currentPage++;
        this.fetchProducts();
      }
    },
  },

  computed: {
    totalPage() {
      return Math.ceil(this.totalPages / 24);
    },
  },

  watch: {
    searchQuery() {
      this.fetchProducts();
    },
  },
};
</script>

<style>
.image {
  height: 120px;
  width: 250px;
}
.pagination {
  bottom: 0;
  left: 10;
  padding: 10px;
}

</style>
