<template>
  <div class="text-center m-3">
    <!-- Paginacion -->
    <paginationLaravel :data="data" @pagination-change-page="getResults">
    </paginationLaravel>
  </div>
</template>

<script>
import paginationLaravel from "laravel-vue-pagination";
export default {
  components: { paginationLaravel },
  props: {
    array: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      data: {},
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    async init() {
      const data = this.array;
      this.data = data;
    },
    async getResults(page = 1) {
      const res = await axios.get(this.data.path + "?page=" + page);
      this.data = res.data.detallecompras;
      console.log(res.data);
    },
  },
};
</script>
