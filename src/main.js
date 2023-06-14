import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "@/plugins/vuetify";
import { store } from "./store/store";
import "./plugins";
import "@/assets/scss/_global.scss";
Vue.config.productionTip = false;


// plugin svgrender 
// import Vue plugin
import VueSvgInlinePlugin from "vue-svg-inline-plugin";

// import polyfills for IE if you want to support it
import "vue-svg-inline-plugin/src/polyfills";
// use Vue plugin without options
Vue.use(VueSvgInlinePlugin);

// use Vue plugin with options
VueSvgInlinePlugin.install(Vue, {
	attributes: {
		data: [ "src" ],
		remove: [ "alt" ]
	}
});

// end:: svgrender 

import VueSlickCarousel from 'vue-slick-carousel'
  import 'vue-slick-carousel/dist/vue-slick-carousel.css'
  // optional style for arrows & dots
  import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'
  


  Vue.component(VueSlickCarousel)
  Vue.component("VueSlickCarousel", VueSlickCarousel);
  import VueApexCharts from 'vue-apexcharts'
  Vue.use(VueApexCharts)

  Vue.component('apexchart', VueApexCharts)
new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount("#app");
