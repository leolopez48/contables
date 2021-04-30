<template>
  <div class="container">
    <!-- Modal -->
    <div id="myModal" class="modal fade" role="dialog">
      <div class="modal-dialog modal-xl">
        <!-- Modal content-->
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Nuevo Cliente</h5>
            <button type="button" class="close" data-dismiss="modal">
              &times;
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div v-if="modificar" class="col-md-4">
                <label for="" class="pt-2">Id</label>
                <input type="text" disabled class="form-control" />
              </div>
              <div class="col-md-8 col-sm-12">
                <label for="" class="pt-2">Nombre</label>
                <input type="text" class="form-control" />
              </div>
              <div class="col-md-4 col-sm-12">
                <label for="" class="pt-2">Clasificación</label>
                <select name="" id="" class="form-control">
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
                ></textarea>
              </div>
              <div class="col-md-4 col-sm-12">
                <label for="" class="pt-2">NIT</label>
                <input type="text" class="form-control" />
              </div>
              <div class="col-md-4 col-sm-12">
                <label for="" class="pt-2">NRC</label>
                <input type="text" class="form-control" />
              </div>
              <div class="col-md-4 col-sm-12">
                <label for="" class="pt-2">Razón social</label>
                <input type="text" class="form-control" />
              </div>
              <div class="col-md-6 col-sm-12">
                <label for="" class="pt-2">Giro</label>
                <input type="text" class="form-control" />
              </div>
              <div class="col-md-6 col-sm-12">
                <label for="" class="pt-2">Teléfono</label>
                <input type="text" class="form-control" />
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">
              Close
            </button>
            <button type="button" class="btn btn-primary">Guardar</button>
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
    <div v-if="clientes">
      <div class="table-responsive">
        <table class="table table-stripped table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Nombre</th>
              <th scope="col">Clasificación</th>
              <th scope="col">Dirección</th>
              <th scope="col">NIT</th>
              <th scope="col">NRC</th>
              <th scope="col">Razón social</th>
              <th scope="col">Giro</th>
              <th scope="col">Teléfono</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="cli in clientes" :key="cli.Id">
              <td>{{ cli.Id }}</td>
              <td>{{ cli.nombre }}</td>
              <td>{{ cli.clasificacion }}</td>
              <td>{{ cli.direccion }}</td>
              <td>{{ cli.nit }}</td>
              <td>{{ cli.nrc }}</td>
              <td>{{ cli.razon_social }}</td>
              <td>{{ cli.giro }}</td>
              <td>{{ cli.telefono }}</td>
              <td>
                <a
                  href="#"
                  class="btn btn-secondary"
                  @click="
                    modificar = true;
                    editar(cli);
                  "
                  title="Editar"
                  data-toggle="modal"
                  data-target="#myModal"
                >
                  <i class="fas fa-edit"></i>
                </a>
                <a
                  href="#"
                  class="btn btn-danger"
                  title="Eliminar"
                  @click="eliminar(cli.Id)"
                  ><i class="fas fa-trash"></i
                ></a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
export default {
  data() {
    return {
      clientes: Array,
      modal: 0,
      modificar: false,
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    async init() {
      const res = await axios.get("/api/cliente");
      this.clientes = res.data.clientes;
      console.log(res);
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
        const res = await axios.delete("/api/cliente/" + id);
        // console.log(res);
        if (res.data.mensaje == "correcto") {
          Swal.fire({
            title: "Eliminación exitosa.",
            text: "El cliente se ha eliminado.",
            icon: "success",
            confirmButtonText: "Cool",
          });
        }
        this.init();
      }
    },
    async editar(id) {
      const res = await axios.put("/api/cliente/" + id);
      console.log(res);
      this.init();
    },
    abrirModal() {
      this.modal = 1;
    },
  },
};
</script>

<style scoped>
.modal-xl {
  width: 60%;
}
</style>
