<template>
  <h2>Our Products Range</h2>
  <v-card>
    <v-col cols="12" v-for="facet in facets" :key="facet">
      <button>
        <h2>{{ facet.name }}</h2>
      </button>
      <ul>
        <li v-for="value in facet.values" :key="value">
          <input
            type="checkbox"
            :value="value.filter"
            v-model="selectedFilters"
          />
          {{ value.value }}
        </li>
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
  },
  props: {
    facets: { type: Array, required: true },
  },
};
</script>

<style></style>
