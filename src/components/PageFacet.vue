<template>
  <h2>Our Products Range</h2>
  <v-card>
    <v-col cols="12" v-for="facet in facets" :key="facet">
      <button>
        <h2>{{ facet.name }}</h2>
      </button>
      <ul>
        <div class="filters" v-for="value in facet.values" :key="value">
          <input class="checkbox"
            type="checkbox"
            :value="value.filter"
            v-model="selectedFilters"
          />
          {{ value.value }}
        </div>
      </ul>
    </v-col>
  </v-card>
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
    searchQuery(){
      this.selectedFilters= []
    },
  },
  props: {
    facets: { type: Array, required: true },
      searchQuery: { type: String, default: "" },
  },

};
</script>

<style>
.filters{
     font-size: 13px;

}
.checkbox {
  transform: scale(0.9);
}


</style>
