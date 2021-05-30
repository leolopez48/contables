<template>
    <div class="container">
        <!-- Modal -->
        <div id="myModal" ref="vueModal" class="modal fade" role="dialog">
            <div class="modal-dialog modal-lg modal-dialog-scrollable modal-dialog-centered">
                <!-- Modal content -->
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

                            <div v-if="modificar" class="col-md-4 pt-0">
                                <!-- <label for="" class="pt-2">Id Detalle</label>
                                <input type="text" disabled class="form-control" v-model="detallecompra.Id" /> -->
                                <label for="" class="pt-0">Id Venta</label>
                                <input type="text" disabled class="form-control" v-model="venta.Id" />
                            </div>

                            <div class="col-md-4 col-sm-12 pt-0">
                                <label for="" class="pt-0">Total</label>
                                <input type="number" step="0.01" disabled class="form-control" v-model="venta.total" />
                            </div>

                            <div class="col-md-4 col-sm-12 pt-0">
                                <label for="" class="pt-0">IVA</label>
                                <input type="number" step="0.01" disabled class="form-control" v-model="venta.iva" />
                            </div>

                            <div class="col-md-4 col-sm-12 pt-0">
                                <label for="" class="pt-0">{{ tituloRetencion }}</label>
                                <input type="number" step="0.01" disabled class="form-control"
                                    v-model="venta.retencion" />
                            </div>

                            <div class="col-md-4 col-sm-12 pt-0 pb-0">
                                <label for="" class="pt-0">Cliente</label>
                                <div data-app>
                                    <v-combobox v-model="venta.cliente" dense outlined :items="listaClie">
                                    </v-combobox>
                                </div>
                            </div>

                            <div class="col-md-4 col-sm-12 pt-0 pb-0">
                                <label for="" class="pt-0">Número de serie</label>
                                <input type="text" class="form-control" v-model="venta.numero" />
                            </div>

                            <div class="col-md-4 col-sm-12 pt-0 pb-0">
                                <label for="" class="pt-0">Fecha</label>
                                <input type="date" disabled class="form-control" v-model="venta.fecha" />
                            </div>

                            <div class="col-md-4 col-sm-12 pt-0">
                                <label class="pt-0">Condiciones de pago</label>
                                <select v-model="documentoSerie.tipo" class="custom-select">
                                    <option value="0">Contado</option>
                                    <option value="1">Crédito</option>
                                </select>
                            </div>

                            <div class="col-md-12 pt-0">
                                <h5 class="mt-1 pb-0">Documento</h5>
                                <hr />
                            </div>

                            <div class="col-md-4 col-sm-12 pt-0">
                                <label class="pt-0">Inicia desde</label>
                                <input type="number" step="0.01" class="form-control"
                                    v-model="documentoSerie.inicia_desde" />
                            </div>

                            <div class="col-md-4 col-sm-12 pt-0">
                                <label class="pt-0">Termina en</label>
                                <input type="number" step="0.01" class="form-control"
                                    v-model="documentoSerie.termina_en" />
                            </div>

                            <div class="col-md-4 col-sm-12 pt-0">
                                <label class="pt-0">Serie</label>
                                <input type="text" class="form-control" v-model="documentoSerie.serie" />
                            </div>

                            <div class="col-md-4 col-sm-12 pt-0">
                                <label class="pt-0">Tipo</label>
                                <select v-model="documentoSerie.tipo" class="custom-select pt-0">
                                    <option value="fcf">Factura consumidor final</option>
                                    <option value="ccf">Comprobante de Crédito Fiscal</option>
                                    <option value="fex">Factura de Exportación</option>
                                    <!-- <option value="nr"></option>
                                    <option value="nc"></option>
                                    <option value="nd"></option> -->
                                </select>
                            </div>

                        </div>
                        <!-- <div class="row">

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

                          <tr v-if="carrito.length == 0">
                            <td colspan="9">El carrito está vacío.</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div> -->
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
        <div v-if="detalleventas">
            <div class="">
                <table class="table table-stripped table-hover table-responsive">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Número</th>
                            <th scope="col">Serie</th>
                            <th scope="col">Cliente</th>
                            <th scope="col">Fecha</th>
                            <th scope="col">Documento</th>
                            <th scope="col">Anulada por</th>
                            <th scope="col">Fecha Anulación</th>
                            <th scope="col">Motivo anulación</th>
                            <th scope="col">Afectas</th>
                            <th scope="col">Exentas</th>
                            <th scope="col">IVA</th>
                            <th scope="col">Retención</th>
                            <th scope="col">Condición</th>
                            <th scope="col">Datos cliente</th>
                            <th scope="col">Nota remisión</th>
                            <th scope="col">Creación</th>
                            <th scope="col">Creado por</th>
                            <th scope="col">Caso</th>
                            <th scope="col">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="ventas in documentos" :key="ventas.Id">
                            <td>{{ ventas.Id }}</td>
                            <td>{{ ventas.numero }}</td>
                            <td>{{ ventas.serie }}</td>
                            <td>{{ ventas.cliente }}</td>
                            <td>{{ ventas.fecha }}</td>
                            <td>{{ ventas.documento_anterior }}</td>
                            <td>{{ ventas.anulada_por }}</td>
                            <td>{{ ventas.anulada_en }}</td>
                            <td>{{ ventas.motivo_anulacion }}</td>
                            <td>{{ ventas.afectas }}</td>
                            <td>{{ ventas.exentas }}</td>
                            <td>{{ ventas.iva }}</td>
                            <td>{{ ventas.retencion }}</td>
                            <td>{{ ventas.condiciones }}</td>
                            <td>{{ ventas.datos_cliente }}</td>
                            <td>{{ ventas.nota_remision }}</td>
                            <td>{{ ventas.creacion }}</td>
                            <td>{{ ventas.creado_por }}</td>
                            <td>{{ ventas.caso }}</td>
                            <td>
                                <a href="#" class="mt-1" @click="
                    modificar = true;
                    abrirModal();
                    editar(ventas);
                  " title="Editar" data-toggle="modal" data-target="#myModal">
                                    <i class="fas fa-edit fa-15x"></i>
                                </a>
                                <a href="#" class="mt-1" title="Eliminar" @click="eliminar(ventas.Id)"><i
                                        class="fas fa-trash fa-15x"></i></a>
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
    .fa-15x {
        font-size: 20px;
    }

</style>
