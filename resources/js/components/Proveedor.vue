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
              <div v-if="modificar" class="col-md-4">
                <label for="" class="pt-2">Id</label>
                <input
                  type="text"
                  disabled
                  class="form-control"
                  v-model="proveedor.Id"
                />
              </div>

              <div class="col-md-8 col-sm-12">
                <label for="" class="pt-2">Tipo</label>
                <select
                  name=""
                  id=""
                  class="form-control"
                  v-model="proveedor.tipo"
                >
                  <option value="local">Local</option>
                  <option value="extranjero">Extranjero</option>
                </select>
              </div>

              <div class="col-md-4 col-sm-12">
                <label for="" class="pt-2">Clasificación</label>
                <select
                  name=""
                  id=""
                  class="form-control"
                  v-model="proveedor.clasificacion"
                >
                  <option value="ninguno">Ninguno</option>
                  <option value="pequeño">Pequeño</option>
                  <option value="mediano">Mediano</option>
                  <option value="gran contribuyente">Gran contribuyente</option>
                </select>
              </div>
              <div class="col-md-8 col-sm-12">
                <label for="" class="pt-2">Dirección</label>
                <textarea
                  name=""
                  id=""
                  cols="6"
                  rows="4"
                  class="form-control"
                  v-model="proveedor.direccion"
                ></textarea>
              </div>
              <div class="col-md-4 col-sm-12">
                <label for="" class="pt-2">NIT</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="proveedor.nit"
                />
              </div>
              <div class="col-md-4 col-sm-12">
                <label for="" class="pt-2">NRC</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="proveedor.nrc"
                />
              </div>

              <div class="col-md-4 col-sm-12">
                <label for="" class="pt-2">Nombre</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="proveedor.nombre"
                />
              </div>

              <div class="col-md-6 col-sm-12">
                <label for="" class="pt-2">Razón social</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="proveedor.razon_social"
                />
              </div>

              <div class="col-md-4 col-sm-12">
                <label for="" class="pt-2">Teléfono</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="proveedor.telefono"
                />
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

    <div v-if="proveedores">
      <div class="table-responsive">
        <table class="table table-ligth table-hover">
          <thead class="primeraFila">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Tipo</th>
              <th scope="col">Clasificación</th>
              <th scope="col">NIT</th>
              <th scope="col">NRC</th>
              <th scope="col">Nombre</th>
              <th scope="col">Razón social</th>
              <th scope="col">Dirección</th>
              <th scope="col">Teléfono</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="pro in proveedores" :key="pro.Id">
              <td>{{ pro.Id }}</td>
              <td>{{ pro.tipo }}</td>
              <td>{{ pro.clasificacion }}</td>
              <td>{{ pro.nit }}</td>
              <td>{{ pro.nrc }}</td>
              <td>{{ pro.nombre }}</td>
              <td>{{ pro.razon_social }}</td>
              <td>{{ pro.direccion }}</td>
              <td>{{ pro.telefono }}</td>
              <td>
                <a
                  href="#"
                  class="btn btn-secondary mt-1"
                  @click="
                    modificar = true;
                    abrirModal();
                    editar(pro);
                  "
                  title="Editar"
                  data-toggle="modal"
                  data-target="#myModal"
                >
                  <i class="fas fa-edit"></i>
                </a>
                <a
                  href="#"
                  class="btn btn-danger mt-1"
                  title="Eliminar"
                  @click="eliminar(pro.Id)"
                  ><i class="fas fa-trash"></i
                ></a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <pagination :array="paginacion" />
      <!-- <jw-pagination></jw-pagination> -->
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
import Pagination from "./Pagination.vue";
// import pagination from "laravel-vue-pagination";

export default {
  components: { Pagination },
  data() {
    return {
      proveedores: Array,
      modificar: false,
      proveedor: {},
      titulo: String,
      paginacion: {},
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    async init() {
      const res = await axios.get("/api/proveedor");
      this.proveedores = res.data.proveedores.data;
      this.paginacion = res.data.proveedores;
      //   console.log(this.paginacion);
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
        const res = await axios.delete("/api/proveedor/" + id);
        if (res.data.mensaje == "correcto") {
          Swal.fire({
            title: "Eliminación exitosa.",
            text: "El proveedor se ha eliminado.",
            icon: "success",
            confirmButtonText: "Cool",
          });
        }
        this.init();
      }
    },
    async editar(proveedor) {
      this.proveedor = proveedor;
    },
    async guardar() {
      if (this.modificar) {
        const res = await axios.put(
          "/api/proveedor/" + this.proveedor.Id,
          this.proveedor
        );

        if (res.data.mensaje == "correcto") {
          Swal.fire({
            title: "Modificación exitosa.",
            text: "El proveedor se ha modificado.",
            icon: "success",
            confirmButtonText: "Okay",
          });
        }
      } else {
        //Insertar
        const res = await axios.post("/api/proveedor/", this.proveedor);
        console.log(res.data);
        if (res.data.mensaje == "correcto") {
          Swal.fire({
            title: "Eliminación exitosa.",
            text: "El proveedor se ha eliminado.",
            icon: "success",
            confirmButtonText: "Hecho",
          });
        }
      }
      $(this.$refs.vueModal).modal("hide");
      await this.init();
    },
    abrirModal() {
      this.proveedor = {};
      if (this.modificar) {
        this.titulo = "Modificar proveedor";
      } else {
        this.titulo = "Nuevo proveedor";
      }
    },
    json2array(json) {
      var result = [];
      var keys = Object.keys(json);
      keys.forEach(function (key) {
        result.push(json[key]);
      });
      return result;
    },
  },
};
</script>

<style scoped>
.modal-xl {
  width: 60%;
}

.primeraFila {
  background: #343a40;
  color: white;
}
</style>
