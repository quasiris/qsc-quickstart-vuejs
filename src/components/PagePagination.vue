<template>
  <v-container fluid>
    <div class="pagination">
      <v-toolbar>
        <button @click="loadPreviousPage" :disabled="currentPages === 1">
          <v-icon>mdi-chevron-left</v-icon>
        </button>

        <p>Page {{ currentPages }}</p>
        <button @click="loadNextPage" :disabled="currentPages === totalPage">
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
    
    };
  },
  props: {
    totalpage: { type: Number },
    currentPages: { type: Number },
  },
  mounted() {
    if (this.currentPages)
     this.currentPage = this.currentPages;
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
