<template>
    <v-card
        
   flat
    height="90px">
    <v-toolbar extended>
<div> 
      <button class="titlef">
        Quasiris   
      </button>
     
    
      </div>
      <v-spacer></v-spacer>
        <div>
            
      <v-btn
        v-for="icon in icons"
        :key="icon"
        class="mx-4"
        :icon="icon"
        variant="text">
        <v-icon size="24px">
            {{icon}}
            </v-icon>
      </v-btn>
      <v-btn>imprint</v-btn>
      <v-btn>data <br> protection</v-btn>
      <v-btn>condition</v-btn>
      <v-btn>certificate</v-btn>
    </div>
      

    </v-toolbar>
    </v-card>

</template>


<script>

export default {
  name: 'PageFooter',

  data: () => ({ 
    icons: [
        'mdi-facebook',
        'mdi-twitter',
        'mdi-linkedin',
        'mdi-instagram',
        'mdi-youtube',
        'mdi-xing',
      ],

   }),
}
</script>


<style>
.titlef {
   
  

 
 color: red;
 background-color: white;
 
 font-weight: bold;
 width: 150px;
  height: 150px;
  font-size: 26px;
  padding-top: 30px;

  
  

  
}

</style>