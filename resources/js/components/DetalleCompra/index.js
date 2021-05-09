import axios from "axios";
import Swal from "sweetalert2";
import Pagination from "../Pagination.vue";
import Calculos from "../../Librerias/calculos"

const cal = new Calculos();

export default {
    components: {
        Pagination
    },

    data() {
        return {
            detallecompras: Array,
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
    },

    methods: {
        async init() {
            const res = await axios.get("/api/detallecompra");
            this.detallecompras = res.data.detallecompras.data;
            this.compras = res.data.compras;
            this.productos = res.data.productos;
            this.productosTemp = res.data.productos;
            this.proveedores = res.data.proveedores;
            this.paginacion = res.data.detallecompras;
            this.empresa = res.data.empresa;
            // this.$refs.selectProductos.disabled = true;
        },

        async eliminar(id) {
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
                const res = await axios.delete("/api/detallecompra/" + id);
                if (res.data.mensaje == "correcto") {
                    Swal.fire({
                        title: "Eliminación exitosa.",
                        text: "El detallecompra se ha eliminado.",
                        icon: "success",
                        confirmButtonText: "Cool",
                    });
                }
                this.init();
            }
        },

        async editar(detallecompra) {
            this.detallecompra = detallecompra;
        },

        async guardar() {
            if (this.modificar) {
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
                console.log(res.data);
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

        abrirModal() {
            this.detallecompra = {};
            if (this.modificar) {
                this.titulo = "Modificar compra";
            } else {
                this.titulo = "Nueva compra";
                this.calcularFecha();
            }
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
                    this.totalesCarrito(seleccionado, false);
                    this.carrito.push(seleccionado);
                    this.eliminarProductosTemp(seleccionado);

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
            this.productosTemp.push(prodCarrito);
            if (indice > -1) {
                this.carrito.splice(indice, 1);
                const seleccionado = this.productos.find(el => el.Id == prodCarrito.Id);
                this.totalesCarrito(seleccionado, true);
            }
        },

        totalesCarrito(seleccionado, eliminandoProducto) {
            let afectas = 0.00;

            const totalProducto = seleccionado.Precio * this.cantidadSeleccionada;
            const iva = cal.ivaDeUnNeto(totalProducto);
            // const empresa = this.empresa.calificacion;

            const proveedor = this.buscarSeleccionado(this.compra.proveedor, this.proveedores);
            // console.log(this.empresa.clasificacion)
            console.log(this.empresa.clasificacion, totalProducto, proveedor.clasificacion, 'Compra')
            this.compra.condicion = 'Compra';
            const retencion = cal.retencionNeto(this.empresa.clasificacion, totalProducto, proveedor.clasificacion, 'Compra');

            this.tituloRetencion = (retencion.transaccion == 'Retención') ? 'Retención' : 'Percepción';

            if (eliminandoProducto) {
                afectas = totalProducto + iva + retencion.total;
                this.compra.total -= afectas;
                this.compra.iva -= iva;
                this.compra.retencion -= retencion.total;
            } else {
                afectas = totalProducto + this.compra.total + iva + retencion.total;
                this.compra.total = afectas + this.compra.total;
                this.compra.iva += iva;
                this.compra.retencion += retencion.total;
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
            console.log(indice)
            if (indice > -1) {
                this.productosTemp.splice(indice, 1);
            }
        }
    },
};
