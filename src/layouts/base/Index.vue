<template>
  <v-app>
    <AppBar @onSearch="performSearch1" />

    <PageContent :searchQuery="searchQuery" />
    <Footer />
  </v-app>
</template>

<script>
import AppBar from "./AppBar.vue";
import Footer from "./Footer.vue";
import PageContent from "./PageContent.vue";

export default {
  name: "Index",
  components: {
    AppBar,

    PageContent,
    Footer
  },
  data() {
    return {
      searchQuery: ""
    };
  },
  methods: {
    performSearch1(keyword) {
      this.searchQuery = keyword;
    }
  }
};
</script>
