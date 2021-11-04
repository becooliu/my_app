<template>
  <h2 class="module-title">{{ title }}</h2>
</template>
<script>
export default {
  name: "Title",
  props: {
    title: String
  }
};
</script>
<style scoped>
.module-title {
  width: 100%;
  text-align: center;
}
</style>
