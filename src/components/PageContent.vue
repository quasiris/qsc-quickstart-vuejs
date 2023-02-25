<template>
<v-container fluid>
 
 <v-row>
 

<v-col cols="3">
 <v-card> <h1> All Categories</h1> </v-card>
 <v-divider></v-divider>
 <v-card>
  <v-toolbar height="1000" width="400">
      <v-list dense class="mt-n5" width="500px" height="1000">
        <v-list-item v-for="style in styles" :key="style.title">
          <v-list-item-content>
            <v-list-item-title width="200">
              {{style.title}}
              </v-list-item-title> 
          </v-list-item-content>
        </v-list-item>
        </v-list>
  </v-toolbar>
  </v-card>
</v-col>

<v-col cols="9">
  
  <v-card><h1>All Products</h1></v-card>
  
  
     <v-card col="3" class="product" v-for="product in products" :key="product">
  
 <v-divider></v-divider><v-card height="150px" width="250px"><img class="image" :src="product.document.previewImageUrl"/> ---<br>
  {{product.document.name}} </v-card>
 </v-card>
 </v-col>

 



  </v-row> 


 
  </v-container>  
</template>


<script>
import axios from 'axios';
export default {
  name: 'PageContent',

  data (){ 
return{
      products:[],
      styles:[
        {title: 'wires'
        },
        {title: 'wires'
        },
        {title: 'wires'
        },
        {title: 'wires'
        },
        {title: 'wires'
        },
        {title: 'wires'
        },
      ],
};
  
     
     
},
async mounted(){
let apiData = await axios.get("https://qsc-dev.quasiris.de/api/v1/search/ab/products");
console.log("api data",apiData.data.result.products.documents);
this.products=apiData.data.result.products.documents;
}
};

</script>

<style>

.image{
  height: 120px;
  width: 200px;
}
  

</style>

