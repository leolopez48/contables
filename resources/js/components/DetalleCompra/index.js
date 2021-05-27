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
            detallecompras: Array,
            // detallecomprasMod: "",
            compras: [],
            compra: {},
            productos: [],
            modificar: false,
            detallecompra: {},
            titulo: String,
            paginacion: {},
            proveedores: [],
            ultimoAgregado: [],
            carrito: [],
            cantidadSeleccionada: 1,
            empresa: {},
            tituloRetencion: 'Percepción',
            productosTemp: [],
        };
    },

    mounted() {
        this.init();
        this.compra.total = 0.00;
        this.compra.iva = 0.00;
        this.compra.retencion = 0.00;
        // console.log(csrf)
    },

    methods: {
        async init() {
            const res = await axios.get("/api/detallecompra");
            this.detallecompras = res.data.detallecompras.data;
            // this.paginacion = JSON.stringify(res.data.detallecompras.data);
            this.compras = res.data.compras;
            this.productos = res.data.productos;
            this.productosTemp = res.data.productos;
            this.proveedores = res.data.proveedores;
            this.paginacion = res.data.detallecompras;
            // console.log(JSON.parse(JSON.stringify(this.paginacion)))
            // this.paginacion = JSON.stringify(this.paginacion)
            this.empresa = res.data.empresa;
            // this.$refs.selectProductos.disabled = true;
        },

        async getResults(page = 1) {
            const res = await axios.get(this.paginacion.path + "?page=" + page);
            this.detallecompras = res.data.detallecompras.data;
            this.paginacion = res.data.detallecompras;
            // console.log(res.data);
        },

        async eliminar(id) {
            // console.log(detalle.Id)
            // const id = detalle.Id;

            const resultado = await Swal.fire({
                title: "Estás seguro?",
                text: "Esta acción no se puede revertir.",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Si, eliminar.",
            });

            if (resultado.isConfirmed) {
                console.log('ID: ' + id)
                const res = await axios.post("/api/detallecompra/eliminar", {
                    Id: id
                });
                if (res.data.mensaje == "correcto") {
                    Swal.fire({
                        title: "Eliminación exitosa.",
                        text: "El detalle compra se ha eliminado.",
                        icon: "success",
                        confirmButtonText: "Hecho",
                    });
                }
                this.init();
            }
        },

        async editar(detalleCompra) {

            const compra = this.compras.find(el => el.Id == detalleCompra.compra);

            this.detallecompra.Id = detalleCompra.Id;
            this.compra = compra;
            this.compra.total = compra.afectas;

            if (typeof (this.compra.proveedor) != 'number') {
                const proveedor = parseInt(this.compra.proveedor.split(" ", 1));
                this.compra.proveedor = proveedor;
            }

            const proveedor = this.proveedores.find(el => el.Id == compra.proveedor);
            this.compra.proveedor = `${proveedor.Id} - ${proveedor.nombre} (${proveedor.clasificacion})`;

            let resp = await axios.post('/api/detallecompra/compras', {
                "compra": compra.Id
            });
            const productos = resp.data.detalleCompras;
            this.carrito = [];

            productos.forEach(el => {
                this.carrito.push(el);
            });

            /*const array = this.productos;
            this.productosTemp = this.productos;
            for (let i = 0; i < productos.length; i++) {

                if (this.productosTemp.some((el) => el.Id == productos[i].Id)) {
                    this.productosTemp.splice(productos[i], 1);
                }

            }*/

            this.calcularFecha();
        },

        async guardar() {
            if (this.modificar) {
                if (typeof (this.compra.proveedor) != 'number') {
                    const proveedor = parseInt(this.compra.proveedor.split(" ", 1));
                    this.compra.proveedor = proveedor;
                }

                const id = this.detallecompra.Id;
                this.compra.condicion = 1;
                this.detallecompra = {
                    Id: id,
                    productos: this.carrito,
                    compra: this.compra,
                }
                // console.log(this.detallecompra)
                const res = await axios.put(
                    "/api/detallecompra/" + this.detallecompra.Id,
                    this.detallecompra
                );

                if (res.data.mensaje == "correcto") {
                    Swal.fire({
                        title: "Modificación exitosa.",
                        text: "El detallecompra se ha modificado.",
                        icon: "success",
                        confirmButtonText: "Cool",
                    });
                }
            } else {
                //Insertar
                if (typeof (this.compra.proveedor) != 'number') {
                    const proveedor = parseInt(this.compra.proveedor.split(" ", 1));
                    this.compra.proveedor = proveedor;
                }

                this.detallecompra = {
                    productos: this.carrito,
                    compra: this.compra,
                }
                const res = await axios.post("/api/detallecompra/",
                    this.detallecompra,
                );
                // console.log(res.data);
                if (res.data.mensaje == "correcto") {
                    Swal.fire({
                        title: "Eliminación exitosa.",
                        text: "El detallecompra se ha eliminado.",
                        icon: "success",
                        confirmButtonText: "Hecho",
                    });
                }
            }
            $(this.$refs.vueModal).modal("hide");
            await this.init();
        },

        async abrirModal() {
            this.detallecompra = {};
            this.carrito = [];
            this.compra = {};
            if (this.modificar) {
                this.titulo = "Modificar compra";
            } else {
                this.titulo = "Nueva compra";
                const respuesta = await axios.get("/api/producto/");
                this.productos = respuesta.data.productos.data;
                this.productosTemp = this.productos;

                this.calcularFecha();
            }
            this.compra.total = 0.00;
            this.compra.iva = 0.00;
            this.compra.retencion = 0.00;
        },

        calcularFecha() {
            const hoy = new Date();
            this.compra.fecha = hoy.toISOString().split('T')[0];
        },

        crearProducto() {
            try {
                const seleccionado = this.buscarSeleccionado(this.ultimoAgregado, this.productos);
                // console.log(seleccionado)
                if (this.cantidadSeleccionada <= seleccionado.Existencias) {

                    seleccionado.cantidad = this.cantidadSeleccionada;
                    seleccionado.Existencias = seleccionado.Existencias - this.cantidadSeleccionada;

                    if (this.carrito.some((el) => el.Id == seleccionado.Id)) {
                        Swal.fire({
                            title: "El producto ya fue agregado.",
                            text: "Un producto puede ser agregado una sola vez al carrito.",
                            icon: "error",
                            confirmButtonText: "Hecho",
                        });
                    } else {
                        this.totalesCarrito(seleccionado, false);
                        this.carrito.push(seleccionado);
                    }

                } else {

                    Swal.fire({
                        title: "Producto con pocas existencias.",
                        text: "Producto seleccionado no cuenta con tal cantidad de existencias, las existencias disponibles son: " + seleccionado.Existencias,
                        icon: "error",
                        confirmButtonText: "Hecho",
                    });
                }

            } catch (error) {
                console.log(error)
                Swal.fire({
                    title: "Verifica los datos del producto o proveedor",
                    text: "No has seleccionado un producto o proveedor.",
                    icon: "error",
                    confirmButtonText: "Hecho",
                });

            }
        },

        eliminarProdCarrito(prodCarrito) {
            const indice = this.carrito.indexOf(prodCarrito);
            //this.productosTemp.push(prodCarrito);
            if (indice > -1) {
                this.carrito.splice(indice, 1);
                const seleccionado = this.productos.find(el => el.Id == prodCarrito.Id);
                seleccionado.Existencias = seleccionado.Existencias - this.cantidadSeleccionada;
                this.totalesCarrito(seleccionado, true);
            }
        },

        totalesCarrito(seleccionado, eliminandoProducto) {
            let afectas = 0.00;

            const totalProducto = parseFloat(seleccionado.Precio) * parseInt(this.cantidadSeleccionada);
            console.log(totalProducto)
            const iva = cal.ivaDeUnNeto(totalProducto);
            // const empresa = this.empresa.calificacion;

            const proveedor = this.buscarSeleccionado(this.compra.proveedor, this.proveedores);
            // console.log(this.empresa.clasificacion)
            // console.log(this.empresa.clasificacion, totalProducto, proveedor.clasificacion, 'Compra')
            this.compra.condicion = 1;
            const retencion = cal.retencionNeto(this.empresa.clasificacion, totalProducto, proveedor.clasificacion, 'Compra');

            this.tituloRetencion = (retencion.transaccion == 'Retención') ? 'Retención' : 'Percepción';

            if (eliminandoProducto) {
                afectas = totalProducto + iva + retencion.total;
                // console.log(totalProducto, iva, retencion)
                this.compra.total = parseFloat(this.compra.total) - afectas;
                this.compra.iva = parseFloat(this.compra.iva) + parseFloat(iva);
                this.compra.retencion = parseFloat(this.compra.retencion) + retencion.total;
            } else {
                afectas = totalProducto + parseFloat(this.compra.total) + parseFloat(iva) + retencion.total;
                // console.log("Total" + this.compra.total)
                // console.log("iva" + iva)
                // console.log("Producto" + totalProducto)
                this.compra.total = afectas;
                this.compra.iva = parseFloat(this.compra.iva) + parseFloat(iva);
                this.compra.retencion = parseFloat(this.compra.retencion) + retencion.total;
            }
        },

        buscarSeleccionado(variable, array) {
            const idSeleccionado = parseInt(variable.split(" ", 1));
            const seleccionado = array.find(el => el.Id == idSeleccionado);
            // console.log(seleccionado)
            return seleccionado;
        },

        eliminarProductosTemp(seleccionado) {
            const indice = this.productos.indexOf(seleccionado);
            console.log("Indice: " + indice)
            if (indice > -1) {
                this.productosTemp.splice(indice, 1);
            }
        }
    },
};
