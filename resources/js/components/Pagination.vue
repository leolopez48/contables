<template>
  <div class="text-center m-3">
    <!-- Paginacion -->
    <pagination1 :data="array" @pagination-change-page="getResults">
    </pagination1>
  </div>
</template>

<script>
import pagination1 from "laravel-vue-pagination";
export default {
  components: { pagination1 },
  props: {
    array: {
      type: Object,
      default: {},
      required: true,
    },
  },
  data() {
    return {
      laravelData: { ...this.array },
    };
  },
  mounted() {
    // console.log(JSON.stringify(this));
    const data = JSON.stringify(this.array);
    console.log(data);
  },
  methods: {
    async getResults(page = 1) {
      //   console.log(this.$props.array.path);
      const res = await axios.get(this.laravelData.path + "?page=" + page);
      this.array = res.data;
    },
  },
};
</script>
