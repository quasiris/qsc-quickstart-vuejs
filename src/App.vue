<template>
  <v-app>
    <page-head @onSearch="performSearch1"></page-head>
    <page-content :searchQuery="searchQuery"></page-content>

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
    };
  },
  methods: {
    performSearch1(keyword) {
      this.searchQuery = keyword;
    },
  },
};
</script>
