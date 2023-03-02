
<template>
  <v-card
 
    color="grey-lighten-4"
   flat
    height="90px"
    
  >
  
    <v-toolbar extended>
      
<div>
      <v-toolbar-title>
      <button class="title">
        Quasiris   
      </button>
      
     
      </v-toolbar-title>
      
      
      </div>
 
<div>
  <v-card  class="searchbar">
    <input type="text"> <v-btn>Search</v-btn>
  </v-card>
    
    
    
    </div>
    <v-spacer></v-spacer>

      <button class="login" @click="showLoginForm = true">
      <v-icon>mdi-login </v-icon>  Login/Register 
<form v-if="showLoginForm">
      <!-- Login form fields go here -->
    </form>
      </button>
     
     <button class="cart">
       My Cart <v-icon>mdi-cart </v-icon>
      </button>
     

   <button class="menu">
      
      
    <p>Menu<v-icon>mdi-dots-vertical</v-icon></p>
      
    
      </button>
      
    </v-toolbar>
  </v-card>
</template>

<script>

export default {
  name: 'PageHead',

  data () { 
return{
  showLoginForm: false


}
   },
}
</script>
<style>

.title {
   
  

 
 color: red;
 background-color: white;
 
 font-weight: bold;
 width: 200px;
  height: 150px;
  font-size: 36px;
  padding-top: 30px;

  
  

  
}


.searchbar{
 align-items: center;
 margin-left: 80px;

 
 
}

.login{
  background-color: white;
  padding-top: 30px;
  text-align: center;
  width: 300px;
  height:150px;
}
.cart{
  background-color: white;
  
   border-color: black;
    padding-top: 30px;
    border-left: 1px solid black;
    font-weight: 700;
    width: 150px;
    height: 150px;
}

.menu {
  
  background-color: red;
  color: white;
  border: none;
  padding-top: 30px;
  font-size: 20px;
  cursor: pointer;
  border-left: 1px solid black;
  font-weight: 700;
  width: 150px;
  text-align: center;
  height: 150px;
  
}




</style>