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
                  v-model="detallecompra.Id"
                />
              </div>

              <div class="col-md-4 col-sm-12">
                <label for="" class="pt-2">Compras</label>
                <select
                  class="form-control"
                  v-model="detallecompra.clasificacion"
                >
                <option  v-for="com in compras" :key="com.Id"> {{com.registrado_por}}</option>
                </select>
              </div>

               <div class="col-md-4 col-sm-12">
                <label for="" class="pt-2">Productos</label>
                <select
                  class="form-control"
                  v-model="detallecompra.clasificacion"
                >
                <option  v-for="pro in productos" :key="pro.Id"> {{pro.Nombre}}</option>
                </select>
              </div>

              <div class="col-md-4 col-sm-12">
                <label for="" class="pt-2">Cantidad</label>
                <input type="text" class="form-control" v-model="detallecompra.cant" />
              </div>
              
              <div class="col-md-4 col-sm-12">
                <label for="" class="pt-2">Precio</label>
                <input type="text" class="form-control" v-model="detallecompra.price" />
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
              <td> {{ det.compra }}</td>
              <td>{{ det.producto }}</td>
              <td>{{ det.cant }}</td>
              <td>{{ det.price }}</td>
              <td>
                <a
                  href="#"
                  class="btn btn-secondary mt-1"
                  @click="
                    modificar = true;
                    abrirModal();
                    editar(det);
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
                  @click="eliminar(det.Id)"
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
import Pagination from "./Pagination.vue";
// import pagination from "laravel-vue-pagination";

export default {
  components: { Pagination },
  data() {
    return {
      detallecompras: Array,
      compras: [],
      productos: [],
      modificar: false,
      detallecompra: {},
      titulo: String,
      paginacion: {},
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    async init() {
      const res = await axios.get("/api/detallecompra");
      this.detallecompras = res.data.detallecompras.data;
      this.compras=res.data.compra;
      this.productos=res.data.producto;
      this.paginacion=res.data.detallecompras;
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
        this.titulo = "Modificar detallecompra";
      } else {
        this.titulo = "Nuevo detallecompra";
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
</style>
