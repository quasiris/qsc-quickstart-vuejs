<template>
<v-container fluid>
<v-card>
          <v-menu open-on-hover>
            <template v-slot:activator="{ props }"> 
              <v-btn color="primary" v-bind="props"> 
           Sort by:    {{selectedSort.name}}    </v-btn> 
            </template>

            <v-list>
              <v-list-item v-for="(sort, index) in sorts" :key="sort"  @click="selectSort(sort)" :value="index === 0" >
                <v-list-item-title>{{ sort.name }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
  </v-card>
</v-container>

</template>
<script>
export default {
  name: "PageSort",
  
};

</script>
<style>


</style>