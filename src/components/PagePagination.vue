<template>
  <v-container fluid>
    <div class="pagination">
      <v-toolbar>
        <button @click="loadPreviousPage" :disabled="currentPage === 1">
          <v-icon>mdi-chevron-left</v-icon>
        </button>

        <p>Page {{ currentPage }}</p>
        <button @click="loadNextPage" :disabled="currentPage === totalPages">
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
    totalpage: { type: Number },
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
      return Math.ceil(this.totalpage / 24);
    },
  },
};
</script>
<style>
.pagination {
  width: 250px;
}
</style>
