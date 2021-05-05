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
            compra: [],
            productos: [],
            modificar: false,
            detallecompra: {},
            titulo: String,
            paginacion: {},
            archivo: [],
            proveedores: [],
            ultimoAgregado: [],
            carrito: [],
            cantidadSeleccionada: 1,
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
            this.proveedores = res.data.proveedores;
            this.paginacion = res.data.detallecompras;
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

                const idSeleccionado = parseInt(this.ultimoAgregado.split(" ", 1));
                const seleccionado = this.productos.find(el => el.Id == idSeleccionado);
                this.carrito.push(seleccionado);

                if (this.cantidadSeleccionada <= seleccionado.Existencias) {
                    this.totalesCarrito(seleccionado, false);

                } else {

                    Swal.fire({
                        title: "Producto con pocas existencias.",
                        text: "Producto seleccionado no cuenta con tal cantidad de existencias, las existencias disponibles son: " + seleccionado.Existencias,
                        icon: "error",
                        confirmButtonText: "Hecho",
                    });
                }

            } catch (error) {
                // console.log(error)
                Swal.fire({
                    title: "Verifica los datos del producto",
                    text: "No has seleccionado un producto.",
                    icon: "error",
                    confirmButtonText: "Hecho",
                });

            }
        },
        eliminarProdCarrito(prodCarrito) {
            const indice = this.carrito.indexOf(prodCarrito);
            if (indice > -1) {
                this.carrito.splice(indice, 1);
                const seleccionado = this.productos.find(el => el.Id == prodCarrito.Id);
                this.totalesCarrito(seleccionado, true);
            }
        },
        totalesCarrito(seleccionado, eliminandoProducto) {
            let afectas = 0.00;


            const iva = cal.ivaDeUnNeto(seleccionado.Precio);
            const totalProducto = seleccionado.Precio * this.cantidadSeleccionada;

            afectas = (totalProducto) * iva + totalProducto;

            if (eliminandoProducto) {
                this.compra.total -= afectas;
                this.compra.iva -= iva;
            } else {
                this.compra.total = afectas + this.compra.total;
                this.compra.iva += iva;
            }
        }
    },
};
