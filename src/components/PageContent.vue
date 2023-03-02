<template>
  <v-container fluid>
    <v-row>
      <v-col cols="3">
        <v-card>
          <h1> All Categories</h1>
        </v-card>
        <v-divider></v-divider>
        <v-card>
          <v-toolbar height="1000" width="400">
            <v-list dense class="mt-n5" width="500px" height="1000">
<v-list-item v-for="style in styles" :key="style.title"> 

                <v-list-item-content>
                  <v-list-item-title width="200"><v-btn>{{ style.title }}</v-btn></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-toolbar>
        </v-card>
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
            <v-col cols="4" v-for="(product) in displayedProducts" :key="product">
              <v-card height="150px" width="300px">
                <img class="image" :src="product.document.previewImageUrl" />
                <br />
                {{ product.document.name }}
              </v-card>
            </v-col>
          </v-row>
        </container>

        
      </v-col>
     
    </v-row>
     <v-pagination class="pagination"
          v-model="currentPage"
          :length="totalPages"
          :total-visible="7"
          :prev-icon="$vuetify.icons.prevPage"
          :next-icon="$vuetify.icons.nextPage"
          :disabled="isLoading"
          @input="fetchProducts"
        />
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  name: "PageContent",

  data() {
    return {
      products: [],
      styles: [
        { title: "wires" },
        { title: "wires" },
        { title: "wires" },
        { title: "wires" },
        { title: "wires" },
        { title: "wires" },
      ],
      currentPage: 1,
      itemsPerPage: 9,
      isLoading: false,
    };
  },

  computed: {
    totalPages() {
      return Math.ceil(this.products.length / this.itemsPerPage);
    },

    displayedProducts() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.products.slice(start, end);
    },
  },

  async mounted() {
    this.fetchProducts();
  },

  methods: {
    async fetchProducts() {
      this.isLoading = true;
      const apiData = await axios.get(
        "https://qsc-dev.quasiris.de/api/v1/search/ab/products"
      );
      this.products = apiData.data.result.products.documents;
      this.isLoading = false;
    },
  },
};
</script>

<style>
.image {
  height: 120px;
  width: 250px;
}
.pagination{
  
  bottom: 0;
  right: 10;
  padding: 10px;

}
</style>
