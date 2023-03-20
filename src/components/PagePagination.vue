<template>
  <v-container fluid class="pagination">
    <div>
      <v-toolbar>
        <button @click="loadPreviousPage" :disabled="currentPage === 1">
          <v-icon>mdi-chevron-left</v-icon>
        </button>

        <p>Page {{ currentPage }}</p>
        <button @click="loadNextPage" :disabled="currentPage === totalPage">
          <v-icon>mdi-chevron-right</v-icon>
        </button>
        <p>Total:{{ totalPage }}</p>
      </v-toolbar>
    </div>
  </v-container>
</template>

<script>
export default {
  name: "PagePagination",
  data() {
    return {
      currentPage: 1,
    };
  },
  props: {
    totalproducts: { type: Number },
    currentPageNo: { type: Number },
  },
  mounted() {
    if (this.currentPageNo) this.currentPage = this.currentPageNo;
  },
  methods: {
    loadPreviousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.$emit("page-changed", this.currentPage);
      }
    },

    loadNextPage() {
      this.currentPage++;
      this.$emit("page-changed", this.currentPage);
    },
  },
  computed: {
    totalPage() {
      return Math.ceil(this.totalproducts / 24);
    },
  },
};
</script>
<style>
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 500px;
}
</style>
