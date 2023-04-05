<template>
  <v-app>
    <page-head @onSearch="performSearch1"></page-head>
    <page-content :searchQuery="searchQuery" @myProduct="myProduct1"></page-content>
    <li v-for="product in products" :key="product">
      {{product.document.name}}
    </li>

    <PageFooter />
  </v-app>
</template>

<script>
import PageHead from "./components/PageHead.vue";
import PageContent from "./components/PageContent.vue";

import PageFooter from "./components/PageFooter.vue";

export default {
  name: "App",

  components: {
    PageHead,
    PageContent,
    PageFooter,
  },

  data() {
    return {
      searchQuery: "",
      products:[],
    };
  },
  methods: {
    performSearch1(keyword) {
      this.searchQuery = keyword;
    },
    myproduct1(pa){
      this.products= pa;  

    }
  },
};
</script>
