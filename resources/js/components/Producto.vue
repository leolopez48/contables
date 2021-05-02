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
                  v-model="producto.Id"
                />
              </div>
              <div class="col-md-8 col-sm-12">
                <label for="" class="pt-2">Nombre</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="producto.Nombre"
                />
              </div>
              <div class="col-md-4 col-sm-12">
                <label for="" class="pt-2">Existencias</label>
                <input
                  type="number"
                  class="form-control"
                  v-model="producto.Existencias"
                  min="0"
                />
              </div>
              <div class="col-md-8 col-sm-12">
                <label for="" class="pt-2">Descripción</label>
                <textarea
                  name=""
                  id=""
                  cols="6"
                  rows="4"
                  class="form-control"
                  v-model="producto.Descripcion"
                ></textarea>
              </div>
              <div class="col-md-4 col-sm-12">
                <label for="" class="pt-2">Precio</label>
                <input
                  type="number"
                  class="form-control"
                  v-model="producto.Precio"
                  step="0.1"
                />
              </div>
              <div class="col-md-6 col-sm-12">
                <label for="" class="pt-2">Costo</label>
                <input
                  type="number"
                  class="form-control"
                  v-model="producto.Costo"
                />
              </div>
              <div class="col-md-6 col-sm-12">
                <label for="" class="pt-2">Código</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="producto.Codigo"
                />
              </div>
              <div class="col-md-4 col-sm-12">
                <label for="" class="pt-2">Imagen</label>
                <br />
                <img :src="imagen" height="100px" width="120px" class="mb-1" />
                <input
                  type="file"
                  accept="image/png, image/jpeg, image/jpg"
                  @change="prevImagen"
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
    <div v-if="productos">
      <div class="table-responsive">
        <table class="table table-stripped table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Nombre</th>
              <th scope="col">Existencias</th>
              <th scope="col">Precio</th>
              <th scope="col">Costo</th>
              <th scope="col">Descripcion</th>
              <th scope="col">Imagen</th>
              <th scope="col">Codigo</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="pro in productos" :key="pro.Id">
              <td>{{ pro.Id }}</td>
              <td>{{ pro.Nombre }}</td>
              <td>{{ pro.Existencias }}</td>
              <td>{{ pro.Precio }}</td>
              <td>{{ pro.Costo }}</td>
              <td>{{ pro.Descripcion }}</td>
              <td><img :src="pro.Imagen" alt="" width="100px" /></td>
              <td>{{ pro.Codigo }}</td>
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
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
import Pagination from "./Pagination.vue";

export default {
  components: { Pagination },
  data() {
    return {
      productos: Array,
      modificar: false,
      producto: {},
      titulo: String,
      paginacion: {},
      noimagen: "/img/no-image.png",
      imagen: "/img/no-image.png",
      imagenModificada: false,
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    async init() {
      const res = await axios.get("/api/producto");
      this.productos = res.data.productos.data;
      this.paginacion = res.data.productos;
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
        const res = await axios.delete("/api/producto/" + id);
        if (res.data.mensaje == "correcto") {
          Swal.fire({
            title: "Eliminación exitosa.",
            text: "El producto se ha eliminado.",
            icon: "success",
            confirmButtonText: "Hecho",
          });
        }
        this.init();
      }
    },

    async editar(producto) {
      this.producto = producto;
      this.imagen = producto.Imagen;
    },

    async guardar() {
      let form;
      let cadenaTitulo;
      let cadenaTexto;
      let respuesta;

      if (this.modificar) {
        if (this.imagenModificada) {
          form = new FormData();
          form.append("Id", this.producto.Id);
          form.append("Nombre", this.producto.Nombre);
          form.append("Existencias", this.producto.Existencias);
          form.append("Precio", this.producto.Precio);
          form.append("Costo", this.producto.Costo);
          form.append("Descripcion", this.producto.Descripcion);
          form.append("Imagen", this.producto.Imagen);
          form.append("Codigo", this.producto.Codigo);
          form.append("imagenModificada", this.imagenModificada);

          respuesta = await axios.post(
            "/api/producto/" +
              this.producto.Id +
              "?_method=PUT&imagenModificada=true",
            form
          );
        } else {
          form = this.producto;
          respuesta = await axios.put(
            "/api/producto/" + this.producto.Id,
            this.producto
          );
        }

        if (respuesta.data.mensaje == "correcto") {
          cadenaTitulo = "Modificación";
          cadenaTexto = "modificado";
        }
      } else {
        //Insertar
        if (this.imagenModificada) {
          form = new FormData();
          form.append("Id", this.producto.Id);
          form.append("Nombre", this.producto.Nombre);
          form.append("Existencias", this.producto.Existencias);
          form.append("Precio", this.producto.Precio);
          form.append("Costo", this.producto.Costo);
          form.append("Descripcion", this.producto.Descripcion);
          form.append("Imagen", this.producto.Imagen);
          form.append("Codigo", this.producto.Codigo);

          respuesta = await axios.post("/api/producto/", form, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
        } else {
          form = this.producto;
          respuesta = await axios.put(
            "/api/producto/" + this.producto.Id,
            this.producto
          );
        }

        if (respuesta.data.mensaje == "correcto") {
          cadenaTitulo = "Creación";
          cadenaTexto = "creado";
        }
      }
      console.log(respuesta);
      if (respuesta.data.mensaje == "correcto") {
        Swal.fire({
          title: cadenaTitulo + " exitosa.",
          text: "El producto se ha " + cadenaTexto + ".",
          icon: "success",
          confirmButtonText: "Hecho",
        });
      }

      $(this.$refs.vueModal).modal("hide");
      await this.init();
    },

    abrirModal() {
      this.producto = {};
      this.imagen = this.noimagen;
      if (this.modificar) {
        this.titulo = "Modificar producto";
      } else {
        this.titulo = "Nuevo producto";
      }
    },

    prevImagen(e) {
      const archivo = e.target.files[0];
      this.imagen = URL.createObjectURL(archivo);
      this.imagenModificada = true;
      if (this.modificar) {
        this.producto.Imagen = this.imagen;
      } else {
        this.producto.Imagen = archivo;
      }
    },
  },
};
</script>

<style scoped>
.modal-xl {
  width: 60%;
}

img {
  border-radius: 10px;
}
</style>
