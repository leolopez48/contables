<template>
    <div class="container">
        <!-- Modal -->
        <div id="myModal" ref="vueModal" class="modal fade" role="dialog">
            <div class="modal-dialog modal-xl">
                <!-- Modal content-->
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">
                            {{ titulo }}
                        </h5>
                        <button type="button" class="close" data-dismiss="modal">
                            &times;
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-md-12">
                                <h5 class="mt-1">Resumen</h5>
                                <hr>
                            </div>

                            <div v-if="modificar" class="col-md-4">
                                <label for="" class="pt-2">Id</label>
                                <input type="text" disabled class="form-control" v-model="compra.Id" />
                            </div>

                            <!-- <div class="col-md-4 col-sm-12">
                                <label for="" class="pt-2">Compras</label>
                                <select class="custom-select" v-model="detallecompra.clasificacion">
                                    <option selected>Selecciona un proveedor</option>
                                    <option v-for="com in compras" :key="com.Id"> {{com.registrado_por}}</option>
                                </select>
                            </div> -->

                            <!-- <div class="col-md-4 col-sm-12">
                                <label for="" class="pt-2">Productos</label>
                                <select class="form-control" v-model="detallecompra.clasificacion">
                                    <option v-for="pro in productos" :key="pro.Id"> {{pro.Nombre}}</option>
                                </select>
                            </div> -->

                            <div class="col-md-4 col-sm-12">
                                <label for="" class="pt-2">Total</label>
                                <input type="number" step="0.01" disabled class="form-control" v-model="compra.total" />
                            </div>

                            <div class="col-md-4 col-sm-12">
                                <label for="" class="pt-2">IVA</label>
                                <input type="number" step="0.01" disabled class="form-control" v-model="compra.iva" />
                            </div>

                            <div class="col-md-4 col-sm-12">
                                <label for="" class="pt-2">Retención</label>
                                <input type="number" step="0.01" disabled class="form-control"
                                    v-model="compra.retencion" />
                            </div>

                            <div class="col-md-6 col-sm-12">
                                <label for="" class="pt-2">Proveedor</label>
                                <select class="custom-select" v-model="compra.proveedor">
                                    <option v-for="prov in proveedores" :key="prov.Id"> {{prov.nombre}}</option>
                                </select>
                            </div>

                            <div class="col-md-5 col-sm-12">
                                <label for="" class="pt-2">Fecha</label>
                                <input type="date" disabled class="form-control" v-model="compra.fecha" />
                            </div>

                            <div class="col-md-12">
                                <h5 class="mt-3">Productos</h5>
                                <hr>
                                <div class="row">
                                    <div class="col-md-4">

                                        <label for="" class="pt-2">Producto</label>
                                        <select class="custom-select" v-model="ultimoAgregado">
                                            <option v-for="pro in productos" :key="pro.Id" :v-value="pro.Id">{{pro.Id}}
                                                -
                                                {{pro.Nombre}}
                                            </option>
                                        </select>
                                    </div>
                                    <div class="col-md-4 col-sm-12">
                                        <label for="" class="pt-2">Cantidad</label>
                                        <input type="number" step="1" min="1" value="1" class="form-control"
                                            v-model="cantidadSeleccionada" />
                                    </div>
                                    <div class="col-md-4">
                                        <a href="#" @click="crearProducto()" class="mt-3 btn btn-primary"><i
                                                class="fas fa-plus"></i>
                                            Agregar</a>
                                    </div>
                                </div>
                                <h5 class="mt-3">Carrito</h5>
                                <hr>
                                <div class="container">
                                    <div class="row">
                                        <div class="col-md-12 text-center">
                                            <table class="table table-stripped table-hover mt-3 table-responsive">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">#</th>
                                                        <th scope="col">Imagen</th>
                                                        <th scope="col">Nombre</th>
                                                        <th scope="col">Existencias</th>
                                                        <th scope="col">Precio</th>
                                                        <th scope="col">Costo</th>
                                                        <th scope="col">Descripción</th>
                                                        <th scope="col">Codigo</th>
                                                        <th scope="col">Acciones</th>
                                                    </tr>
                                                </thead>
                                                <tbody ref="tablaCarrito">
                                                    <tr v-if="carrito.length > 0">
                                                    <tr v-for="carrito in carrito" :key="carrito.Id">
                                                        <td>{{carrito.Id}}</td>
                                                        <td><img :src="carrito.Imagen" width="50px" alt=""></td>
                                                        <td>{{carrito.Nombre}}</td>
                                                        <td>{{carrito.Existencias}}</td>
                                                        <td>{{carrito.Precio}}</td>
                                                        <td>{{carrito.Costo}}</td>
                                                        <td>{{carrito.Descripcion}}</td>
                                                        <td>{{carrito.Codigo}}</td>
                                                        <a href="#" class="btn btn-danger mt-1" title="Eliminar"
                                                            @click="eliminarProdCarrito(carrito)">
                                                            <i class="fas fa-trash"></i>
                                                        </a>
                                                    </tr>
                                                    </tr>
                                                    <tr v-if="carrito.length == 0">
                                                        <td colspan="9">El carrito está vacío.</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">
                            Close
                        </button>
                        <button type="button" class="btn btn-primary" @click="guardar()">
                            Guardar
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <!-- MODAL -->

        <div class="container-fluid">
            <a href="#" class="btn btn-primary mb-2 mt-3" @click="
          modificar = false;
          abrirModal();
        " data-toggle="modal" data-target="#myModal"><i class="fas fa-plus" title="Agregar"></i></a>
        </div>
        <div v-if="detallecompras">
            <div class="table-responsive">
                <table class="table table-stripped table-hover">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Compra</th>
                            <th scope="col">Producto</th>
                            <th scope="col">Cantidad</th>
                            <th scope="col">Precio</th>
                            <th scope="col">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="det in detallecompras" :key="det.Id">
                            <td>{{ det.Id }}</td>
                            <td> {{ det.compra }}</td>
                            <td>{{ det.producto }}</td>
                            <td>{{ det.cant }}</td>
                            <td>{{ det.price }}</td>
                            <td>
                                <a href="#" class="btn btn-secondary mt-1" @click="
                                    modificar = true;
                                    abrirModal();
                                    editar(det);" title="Editar" data-toggle="modal" data-target="#myModal">
                                    <i class="fas fa-edit"></i>
                                </a>
                                <a href="#" class="btn btn-danger mt-1" title="Eliminar" @click="eliminar(det.Id)"><i
                                        class="fas fa-trash"></i></a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </div>
        <pagination :array="paginacion" />
    </div>
</template>

<script src="./index.js">
</script>

<style scoped>
    .modal-xl {
        width: 60%;
    }

</style>
../Pagination.vue
