<template>
  <h2>Our Products Range</h2>
  <div class="myfacet">
   
    <v-col cols="12" v-for="facet in facets" :key="facet">
      <h2>{{ facet.name }}</h2>
      <div class="filters" v-for="value in facet.values" :key="value">
        <input
          class="checkbox"
          type="checkbox"
          :value="value.filter"
          v-model="selectedFilters"
        />
        {{ value.value }} ({{ value.count }})
      </div>
    </v-col>
  </div>
</template>

<script>
export default {
  name: "PageFacet",
  data() {
    return {
      selectedFilters: [],
    };
  },
  watch: {
    selectedFilters() {
      this.$emit("selectedFilters", this.selectedFilters);
    },
    searchQuery() {
      this.selectedFilters = [];
    },
  },
  props: {
    facets: { type: Array, required: true },
    searchQuery: { type: String, default: "" },
  },
};
</script>

<style>
.filters {
  font-size: 14px;

}
.checkbox {
  transform: scale(0.9);
}
.toolbar {
  background-color: white;
}
.myfacet{
  border-right: .1px solid black;
  border-bottom: .1px solid black;
}
</style>
