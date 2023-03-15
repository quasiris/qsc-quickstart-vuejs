<template>
  <v-container fluid>
    <v-row>
      <v-col cols="3">
        <v-card>
          <h1>All Categories</h1>
        </v-card>
        <v-divider></v-divider>
      </v-col>

      <v-col cols="9">
        <v-row>
          <v-col cols="12">
            <v-card><h1> All Products</h1> </v-card>
          </v-col>
        </v-row>

        <container fluid>
          <v-row>
            <v-col cols="12"> </v-col>
          </v-row>
          <v-row>
            <v-col cols="4" v-for="product in products" :key="product">
              <v-card height="150px" width="300px">
                <img class="image" :src="getImage(product)" />
                <br />
                {{ product.document.name }}
              </v-card>
            </v-col>
          </v-row>
         
        </container>
        <v-row>
           <v-col cols="9">
           </v-col>
           <v-col cols="3">
        <div class="pagein">
          <Page-pagination
            :currentPage="currentPage"
            @page-changed="onPageChanged"
            :totalp="totalpages"
          />
        </div>
        </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import PagePagination from "./PagePagination.vue";
import axios from "axios";
export default {
  name: "PageContent",
  components: {
    PagePagination,
  },

  data() {
    return {
      products: [],
      currentPage: 1,
      totalpages: "",
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
  },

  methods: {
    getImage({ document }) {
      document.previewImageUrl =
        "https://upload.wikimedia.org/wikipedia/commons/d/d9/Hello_%28yellow%29.svg/https://img.freepik.com/free-vector/word-hello-speech-bubble-vector_53876-60258.jpg?w=826&t=st=1678594176~exp=1678594776~hmac=237205bd7be12d869268e97b79e0b1fc447a704eb69d2c1c133942bba3d433a9";
      if (!document.previewImageUrl) return;
      const urls = document.previewImageUrl.split("/https");
      urls[1] = "https" + urls[1];
      return urls.length ? urls[1] : "";
    },
    fetchProducts() {
      axios
        .get(
          `https://qsc-dev.quasiris.de/api/v1/search/ab/products?q=${this.searchQuery}&page=${this.currentPage}`
          // curl https://qsc-dev.quasiris.de/api/v1/search/ab/products?q=wago&f.available=true&f.categories=Reihenklemmen&sort=pricdesc&page=3
        )
        .then((response) => {
          this.products = response.data.result.products.documents;
          console.log(12, this.products);
          this.totalpages = response.data.result.products.total;
          console.log(1, this.totalPages);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    onPageChanged(page) {
      this.currentPage = page;
    },
  },
};
</script>

<style>
.image {
  height: 120px;
  width: 250px;
}



</style>
