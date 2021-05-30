<template>
  <div class="container">
    <!-- Modal -->
    <div id="myModal" ref="vueModal" class="modal fade" role="dialog">
      <div
        class="modal-dialog modal-lg modal-dialog-scrollable modal-dialog-centered"
      >
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
                <h5 class="mt-1 pb-0">Resumen</h5>
                <hr />
              </div>

              <div v-if="modificar" class="col-md-4">
                <label for="" class="pt-2">Id Detalle</label>
                <input
                  type="text"
                  disabled
                  class="form-control"
                  v-model="detallecompra.Id"
                />
                <label for="" class="pt-2">Id Compra</label>
                <input
                  type="text"
                  disabled
                  class="form-control"
                  v-model="compra.Id"
                />
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

              <div class="col-md-4 col-sm-12 pt-0">
                <label for="" class="pt-0">Total</label>
                <input
                  type="number"
                  step="0.01"
                  disabled
                  class="form-control"
                  v-model="compra.total"
                />
              </div>

              <div class="col-md-4 col-sm-12 pt-0">
                <label for="" class="pt-0">IVA</label>
                <input
                  type="number"
                  step="0.01"
                  disabled
                  class="form-control"
                  v-model="compra.iva"
                />
              </div>

              <div class="col-md-4 col-sm-12 pt-0">
                <label for="" class="pt-0">{{ tituloRetencion }}</label>
                <input
                  type="number"
                  step="0.01"
                  disabled
                  class="form-control"
                  v-model="compra.retencion"
                />
              </div>

              <div class="col-md-6 col-sm-12">
                <label for="" class="pt-2">Proveedor</label>
                <div data-app>
                  <v-combobox
                    v-model="compra.proveedor"
                    dense
                    outlined
                    :items="listaProv"
                  ></v-combobox>
                </div>
              </div>

              <div class="col-md-5 col-sm-12">
                <label for="" class="pt-2">Fecha</label>
                <input
                  type="date"
                  disabled
                  class="form-control"
                  v-model="compra.fecha"
                />
              </div>

              <div class="col-md-12 pt-0 mt-0">
                <h5 class="mt-0">Productos</h5>
                <hr />
                <div class="row">
                  <div class="col-md-4">
                    <label for="" class="pt-0">Producto</label>
                    <div data-app>
                      <v-combobox
                        v-model="ultimoAgregado"
                        dense
                        outlined
                        clearable
                        :items="listaProd"
                      ></v-combobox>
                    </div>
                  </div>
                  <div class="col-md-4 col-sm-12 pt-0">
                    <label for="" class="pt-2">Cantidad</label>
                    <input
                      type="number"
                      step="1"
                      min="1"
                      value="1"
                      class="form-control"
                      v-model="cantidadSeleccionada"
                    />
                  </div>
                  <div class="col-md-4">
                    <a
                      href="#"
                      @click="crearProducto()"
                      class="mt-3 btn btn-primary"
                      ><i class="fas fa-plus"></i> Agregar</a
                    >
                  </div>
                </div>
                <h5 class="mt-3">Carrito</h5>
                <hr />
                <div class="container">
                  <div class="row">
                    <div class="col-md-12 text-center">
                      <table
                        class="table table-stripped table-hover mt-3 table-responsive"
                      >
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
                          <!-- <tr v-if="carrito.length > 0"> -->
                          <tr v-for="carrito in carrito" :key="carrito.Id">
                            <td>{{ carrito.Id }}</td>
                            <td>
                              <img :src="carrito.Imagen" width="50px" />
                            </td>
                            <td>{{ carrito.Nombre }}</td>
                            <td>{{ carrito.Existencias }}</td>
                            <td>{{ carrito.Precio }}</td>
                            <td>{{ carrito.Costo }}</td>
                            <td>{{ carrito.Descripcion }}</td>
                            <td>{{ carrito.Codigo }}</td>
                            <a
                              href="#"
                              class="btn btn-default mt-1"
                              title="Eliminar"
                              @click="eliminarProdCarrito(carrito)"
                            >
                              <i class="fas fa-trash fa-15x"></i>
                            </a>
                          </tr>
                          <!-- </tr> -->

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
      <a
        href="#"
        class="btn btn-primary mb-2 mt-3"
        @click="
          modificar = false;
          abrirModal();
        "
        data-toggle="modal"
        data-target="#myModal"
        ><i class="fas fa-plus" title="Agregar"></i
      ></a>
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
              <td>{{ det.compra }}</td>
              <td>{{ det.producto }}</td>
              <td>{{ det.cant }}</td>
              <td>{{ det.price }}</td>
              <td>
                <a
                  href="#"
                  class="mt-1"
                  @click="
                    modificar = true;
                    abrirModal();
                    editar(det);
                  "
                  title="Editar"
                  data-toggle="modal"
                  data-target="#myModal"
                >
                  <i class="fas fa-edit fa-15x"></i>
                </a>
                <a
                  href="#"
                  class="mt-1"
                  title="Eliminar"
                  @click="eliminar(det.Id)"
                  ><i class="fas fa-trash fa-15x"></i
                ></a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <paginationLaravel :data="paginacion" @pagination-change-page="getResults">
    </paginationLaravel>
    <!-- <div v-if="paginacion.current_page"> // El if porque sino se renderiza antes de crear los datos y envía un vacío como prop
      <pagination :array="paginacion" />
    </div> -->
  </div>
</template>

<script src="./index.js">
</script>

<style scoped>
/* .modal-xl {
  width: 60%;
} */

.fa-15x {
  font-size: 20px;
}
</style>
