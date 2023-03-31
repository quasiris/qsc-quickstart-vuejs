<template>
  <h2>Our Products Range</h2>
  <v-card>
    <v-col cols="12" v-for="facet in facets" :key="facet">
     
        <h2>{{ facet.name }}</h2>
   
      <ul>
      
        
        <div class="filters" v-for="value in facet.values" :key="value">
  <v-toolbar class="toolbar">        <input class="checkbox"
            type="checkbox"
            :value="value.filter"
            v-model="selectedFilters"
          /> &nbsp;
         {{ value.value }} <v-spacer></v-spacer> {{value.count}} </v-toolbar>
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
     font-weight: bold;

}
.checkbox {
  transform: scale(0.9);
}
.toolbar{
  background-color: white;
}


</style>
