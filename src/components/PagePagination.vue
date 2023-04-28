<template>
  <div class="pagination">
    <v-pagination
      v-model="currentPage"
      :length="totalPage"
      :total-visible="7"
      
    ></v-pagination>
  </div>
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
    searchQuery: { type: String, default: "" },
    selectedFilters: { type: Array, required: true },
  },

  methods: {},
  computed: {
    totalPage() {
      return Math.ceil(this.totalproducts / 24);
    },
  },
  watch: {
    searchQuery() {
      this.currentPage = 1;
    },
    selectedFilters() {
      this.currentPage = 1;
    },

    currentPage() {
      this.$emit("page-changed", this.currentPage);
    },
  },
};
</script>
<style></style>
