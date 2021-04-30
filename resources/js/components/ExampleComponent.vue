<template>
  <div class="container">
    <div v-if="array">
      <table class="table table-bordered">
        <thead>
          <tr>
            <th scope="col">Valor</th>
            <th scope="col">Accciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="a in array" :key="a">
            <td>
              {{ a }}
            </td>
            <td>
              <a href="#" class="btn btn-primary" @click="boton(a)">Editar</a>
              <a href="#" class="btn btn-danger">Eliminar</a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      array: Array,
    };
  },
  props: {
    numero: "",
  },
  mounted() {
    this.init(5);
  },
  methods: {
    init(id) {
      console.log("Component mounted." + id);
      this.array = [5, 6, 7, 4];
    },
    async boton(id) {
      const res = await axios.post("http://127.0.0.1:8000/iva", {
        id: id,
      });
      console.log(res);
      alert("El valor del iva es: " + res.data.iva);
    },
  },
};
</script>
