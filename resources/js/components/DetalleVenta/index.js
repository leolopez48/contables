import axios from "axios";
import Swal from "sweetalert2";
import PaginationLaravel from "laravel-vue-pagination";
import Calculos from "../../Librerias/calculos"

const cal = new Calculos();
const csrf = document.getElementsByName('csrf-token')[0].content;

export default {
    components: {
        PaginationLaravel
    },

    data() {
        return {
            detalleventas: [],
            documentos: [],
            documentosSerie: [],
            // compras: [],
            venta: {},
            documentoVenta: {},
            documentoSerie: {},
            // productos: [],
            modificar: false,
            // detallecompra: {},
            titulo: String,
            paginacion: {},
            // proveedores: [],
            // ultimoAgregado: [],
            // carrito: [],
            // cantidadSeleccionada: 1,
            // empresa: {},
            tituloRetencion: 'Percepción',
            listaClie: [],
            listaProd: [],
            // productosTemp: [],
        };
    },

    mounted() {
        this.init();
        // this.compra.total = 0.00;
        // this.compra.iva = 0.00;
        // this.compra.retencion = 0.00;
    },

    methods: {
        async init() {
            let res = await axios.get("/api/detalleventa");
            this.detalleventas = res.data.detalleventas.data;

            res = await axios.get("/api/documento");
            this.documentos = res.data.documentos.data;
            this.paginacion = res.data.documentos;

            res = await axios.get("/api/documentoserie");
            this.documentosSerie = res.data.documentoSerie.data;

            res = await axios.get("/api/cliente");
            const clientes = res.data.clientes;

            clientes.data.forEach(el => {
                this.listaClie.push(`${el.Id} - ${el.nombre} (${el.clasificacion})`)
            });


            // this.compras = res.data.compras;
            // this.productos = res.data.productos;
            // this.productosTemp = res.data.productos;
            // this.proveedores = res.data.proveedores;

            // this.clientes.forEach(el => {
            //     this.listaProv.push(`${el.Id} - ${el.nombre} (${el.clasificacion})`)
            // });

            // this.productos.forEach(el => {
            //     this.listaProd.push(`${el.Id} - ${el.Nombre}`)
            // });

            // this.paginacion = res.data.detallecompras;

            // this.empresa = res.data.empresa;
        },

        async getResults(page = 1) {
            const res = await axios.get(this.paginacion.path + "?page=" + page);
            this.detallecompras = res.data.detallecompras.data;
            this.paginacion = res.data.detallecompras;
        },

        // async eliminar(id) {

        //     const resultado = await Swal.fire({
        //         title: "Estás seguro?",
        //         text: "Esta acción no se puede revertir.",
        //         icon: "warning",
        //         showCancelButton: true,
        //         confirmButtonColor: "#3085d6",
        //         cancelButtonColor: "#d33",
        //         confirmButtonText: "Si, eliminar.",
        //     });

        //     if (resultado.isConfirmed) {
        //         console.log('ID: ' + id)
        //         const res = await axios.post("/api/detallecompra/eliminar", {
        //             Id: id
        //         });
        //         if (res.data.mensaje == "correcto") {
        //             Swal.fire({
        //                 title: "Eliminación exitosa.",
        //                 text: "El detalle compra se ha eliminado.",
        //                 icon: "success",
        //                 confirmButtonText: "Hecho",
        //             });
        //         }
        //         this.init();
        //     }
        // },

        // async editar(detalleCompra) {

        //     const compra = this.compras.find(el => el.Id == detalleCompra.compra);

        //     this.detallecompra.Id = detalleCompra.Id;
        //     this.compra = compra;
        //     this.compra.total = compra.afectas;

        //     if (typeof (this.compra.proveedor) != 'number') {
        //         const proveedor = parseInt(this.compra.proveedor.split(" ", 1));
        //         this.compra.proveedor = proveedor;
        //     }

        //     const proveedor = this.proveedores.find(el => el.Id == compra.proveedor);
        //     this.compra.proveedor = `${proveedor.Id} - ${proveedor.nombre} (${proveedor.clasificacion})`;

        //     let resp = await axios.post('/api/detallecompra/compras', {
        //         "compra": compra.Id
        //     });
        //     const productos = resp.data.detalleCompras;
        //     this.carrito = [];

        //     productos.forEach(el => {
        //         this.carrito.push(el);
        //     });

        //     this.calcularFecha();
        // },

        // async guardar() {
        //     if (this.modificar) {
        //         if (typeof (this.compra.proveedor) != 'number') {
        //             const proveedor = parseInt(this.compra.proveedor.split(" ", 1));
        //             this.compra.proveedor = proveedor;
        //         }

        //         const id = this.detallecompra.Id;
        //         this.compra.condicion = 1;
        //         this.detallecompra = {
        //             Id: id,
        //             productos: this.carrito,
        //             compra: this.compra,
        //         }

        //         const res = await axios.put(
        //             "/api/detallecompra/" + this.detallecompra.Id,
        //             this.detallecompra
        //         );

        //         if (res.data.mensaje == "correcto") {
        //             Swal.fire({
        //                 title: "Modificación exitosa.",
        //                 text: "El detallecompra se ha modificado.",
        //                 icon: "success",
        //                 confirmButtonText: "Cool",
        //             });
        //         }
        //     } else {
        //         //Insertar
        //         if (typeof (this.compra.proveedor) != 'number') {
        //             const proveedor = parseInt(this.compra.proveedor.split(" ", 1));
        //             this.compra.proveedor = proveedor;
        //         }

        //         this.detallecompra = {
        //             productos: this.carrito,
        //             compra: this.compra,
        //         }
        //         const res = await axios.post("/api/detallecompra/",
        //             this.detallecompra,
        //         );

        //         if (res.data.mensaje == "correcto") {
        //             Swal.fire({
        //                 title: "Eliminación exitosa.",
        //                 text: "El detallecompra se ha eliminado.",
        //                 icon: "success",
        //                 confirmButtonText: "Hecho",
        //             });
        //         }
        //     }
        //     $(this.$refs.vueModal).modal("hide");
        //     await this.init();
        // },

        async abrirModal() {
            // this.detallecompra = {};
            // this.carrito = [];
            // this.compra = {};
            if (this.modificar) {
                this.titulo = "Modificar venta";
            } else {
                this.titulo = "Nueva venta";
                // const respuesta = await axios.get("/api/producto/");
                // this.productos = respuesta.data.productos.data;
                // this.productosTemp = this.productos;

                this.venta.fecha = cal.calcularFecha();
            }
            // this.compra.total = 0.00;
            // this.compra.iva = 0.00;
            // this.compra.retencion = 0.00;
        },



        // crearProducto() {
        //     try {
        //         const seleccionado = this.buscarSeleccionado(this.ultimoAgregado, this.productos);

        //         if (this.cantidadSeleccionada <= seleccionado.Existencias) {

        //             seleccionado.cantidad = this.cantidadSeleccionada;
        //             seleccionado.Existencias = parseInt(seleccionado.Existencias) + parseInt(this.cantidadSeleccionada);

        //             if (this.carrito.some((el) => el.Id == seleccionado.Id)) {
        //                 Swal.fire({
        //                     title: "El producto ya fue agregado.",
        //                     text: "Un producto puede ser agregado una sola vez al carrito.",
        //                     icon: "error",
        //                     confirmButtonText: "Hecho",
        //                 });
        //             } else {
        //                 this.totalesCarrito(seleccionado, false);
        //                 this.carrito.push(seleccionado);
        //             }

        //         } else {

        //             Swal.fire({
        //                 title: "Producto con pocas existencias.",
        //                 text: "Producto seleccionado no cuenta con tal cantidad de existencias, las existencias disponibles son: " + seleccionado.Existencias,
        //                 icon: "error",
        //                 confirmButtonText: "Hecho",
        //             });
        //         }

        //     } catch (error) {
        //         console.log(error)
        //         Swal.fire({
        //             title: "Verifica los datos del producto o proveedor",
        //             text: "No has seleccionado un producto o proveedor.",
        //             icon: "error",
        //             confirmButtonText: "Hecho",
        //         });

        //     }
        // },

        // eliminarProdCarrito(prodCarrito) {
        //     const indice = this.carrito.indexOf(prodCarrito);
        //     if (indice > -1) {
        //         this.carrito.splice(indice, 1);
        //         const seleccionado = this.productos.find(el => el.Id == prodCarrito.Id);
        //         seleccionado.Existencias = seleccionado.Existencias - this.cantidadSeleccionada;
        //         this.totalesCarrito(seleccionado, true);
        //     }
        // },

        // totalesCarrito(seleccionado, eliminandoProducto) {
        //     let afectas = 0.00;

        //     const totalProducto = parseFloat(seleccionado.Precio) * parseInt(this.cantidadSeleccionada);
        //     console.log(totalProducto)
        //     const iva = cal.ivaDeUnNeto(totalProducto);

        //     const proveedor = this.buscarSeleccionado(this.compra.proveedor, this.proveedores);

        //     this.compra.condicion = 1;
        //     const retencion = cal.retencionNeto(this.empresa.clasificacion, totalProducto, proveedor.clasificacion, 'Compra');

        //     this.tituloRetencion = (retencion.transaccion == 'Retención') ? 'Retención' : 'Percepción';

        //     if (eliminandoProducto) {
        //         afectas = totalProducto + iva + retencion.total;

        //         this.compra.total = parseFloat(this.compra.total) - afectas;
        //         this.compra.iva = parseFloat(this.compra.iva) + parseFloat(iva);
        //         this.compra.retencion = parseFloat(this.compra.retencion) + retencion.total;
        //     } else {
        //         afectas = totalProducto + parseFloat(this.compra.total) + parseFloat(iva) + retencion.total;

        //         this.compra.total = afectas;
        //         this.compra.iva = parseFloat(this.compra.iva) + parseFloat(iva);
        //         this.compra.retencion = parseFloat(this.compra.retencion) + retencion.total;
        //     }
        // },

        // buscarSeleccionado(variable, array) {
        //     const idSeleccionado = parseInt(variable.split(" ", 1));
        //     const seleccionado = array.find(el => el.Id == idSeleccionado);

        //     return seleccionado;
        // },

        // eliminarProductosTemp(seleccionado) {
        //     const indice = this.productos.indexOf(seleccionado);
        //     console.log("Indice: " + indice)
        //     if (indice > -1) {
        //         this.productosTemp.splice(indice, 1);
        //     }
        // }
    },
};
