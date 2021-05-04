/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue').default;

/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))

import ClienteComponent from "./components/Cliente.vue";
import ProveedorComponent from "./components/Proveedor.vue";
import ProductoComponent from "./components/Producto.vue";
import DetalleCompraComponent from "./components/DetalleCompra/DetalleCompra.vue";
import PaginationComponent from "./components/Pagination.vue";
import InicioComponent from "./components/Inicio.vue";
// import JwPagination from 'jw-vue-pagination';

Vue.component('cliente', ClienteComponent);
Vue.component('proveedor', ProveedorComponent);
Vue.component('producto', ProductoComponent);
Vue.component('detallecompra', DetalleCompraComponent);
Vue.component('pagination', PaginationComponent);
Vue.component('inicio', InicioComponent);
Vue.component('pagination-vue', require('laravel-vue-pagination'));

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

const app = new Vue({
    el: '#app',
});
