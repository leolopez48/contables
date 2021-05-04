<template>
  <div class="row">
    <div class="col-md-12">
      <h3 class="mr-auto">Inicio</h3>
      <hr />
    </div>
    <div class="col-md-10 offset-md-1">
      <div class="card">
        <div class="card-header">
          <div class="row">
            <h5 class="ml-3 mt-2">Generalidades</h5>
          </div>
        </div>
        <div class="card-body">
          <div class="row">
            <div class="col-md-6">
              <label for="" class="mt-2">Nombre comercial</label>
              <input
                type="text"
                class="form-control"
                v-model="empresa.comercial"
                ref="comercial"
              />
            </div>
            <div class="col-md-6">
              <label for="" class="mt-2">Nombre Jurídico</label>
              <input
                type="text"
                class="form-control"
                v-model="empresa.juridico"
              />
            </div>
            <div class="col-md-4">
              <label for="" class="mt-2">NIT</label>
              <input type="text" class="form-control" v-model="empresa.nit" />
            </div>
            <div class="col-md-4">
              <label for="" class="mt-2">NRC</label>
              <input type="text" class="form-control" v-model="empresa.nrc" />
            </div>
            <div class="col-md-4">
              <label for="" class="mt-2">Clasificación</label>
              <select class="form-control" v-model="empresa.clasificacion">
                <option value="ninguno">Ninguno</option>
                <option value="pequeño">Pequeño</option>
                <option value="mediano">Mediano</option>
                <option value="gran contribuyente">Gran contribuyente</option>
              </select>
            </div>
          </div>
        </div>
        <div class="card-footer">
          <a
            href="#"
            class="float-right btn btn-success"
            @click="actualizarInfo()"
            >Actualizar</a
          >
        </div>
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
      empresa: {},
      primeraVez: false,
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    async init() {
      const res = await axios.get("/api/empresa");
      this.empresa = res.data.empresa[0];
      if (res.data.empresa == "") {
        this.primeraVez = true;
        this.empresa = {};
        const result = await Swal.fire({
          title: "Advertencia",
          text: "Aún falta información importante por completar.",
          icon: "warning",
          showCancelButton: false,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Completar",
        });

        this.$refs.comercial.focus();
      }
    },
    async actualizarInfo() {
      let res;
      if (this.primeraVez) {
        this.empresa.Id = 1;
        res = await axios.post("/api/empresa", this.empresa);
      } else {
        const result = await Swal.fire({
          title: "Actualizar información de empresa",
          text:
            "Estás seguro de la actualización? Los cálculos de las nuevas operaciones cambiarán.",
          icon: "question",
          showCancelButton: true,
          cancelButtonText: "Cancelar",
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Si, Actualizar",
        });
        if (result.isConfirmed) {
          res = await axios.put(
            "/api/empresa/" + this.empresa.Id,
            this.empresa
          );
        }
      }
      if (res.data.mensaje == "correcto") {
        Swal.fire("Información actualizado", "", "success");
      } else {
        Swal.fire("No se pudo actualizar.", "", "error");
      }
      this.init();
    },
  },
};
</script>
