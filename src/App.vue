<template>
  <v-app>
    <PageHead />
    <PageContent />
    <PageFooter />
  </v-app>
</template>

<script>

import PageHead from './components/PageHead.vue';
import PageContent from './components/PageContent.vue';
import PageFooter from './components/PageFooter.vue';

export default {
  name: 'App',

  components: {
    PageHead,
    PageContent,
    PageFooter, 
  },

  data: () => ({
    //
  }),
}
</script>
