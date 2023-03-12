<template>
  <v-app>
    
    <PageContent />
    <PageFooter />
  </v-app>
</template>

<script>


import PageContent from './components/PageContent.vue';
import PageFooter from './components/PageFooter.vue';

export default {
  name: 'App',

  components: {
    
    PageContent,
    PageFooter, 
  },

  data: () => ({
    //
  }),
}
</script>
