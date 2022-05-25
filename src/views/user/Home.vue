<template>
  <Title title="房间总览"></Title>
  <ElTable />
</template>

<script>
import { ElTable } from "element-plus";
import Title from "../../components/Title.vue";

export default {
  name: "Home",
  data() {
    return {
      roomData: null,
    };
  },
  components: { ElTable, Title },
  computed: {},
  methods: {},
};
</script>

<style></style>
