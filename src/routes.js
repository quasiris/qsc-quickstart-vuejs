import {createWebHashHistory, createRouter} from "vue-router";
import Home from './components/ProductDetails.vue';

const routes=[
    {
        name: 'ProductDetails',
        path: '/',
        component: ProductDetails
    }
];
const router=createRouter({
history:createWebHistory(),
routes
});

export default router;