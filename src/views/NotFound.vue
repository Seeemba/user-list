<template>
  <div>
    <h1>404</h1>
    <h2>The wrong coordinate detected!</h2>
    <h3>
      The {{ resource }} you are looking for is not present in the current
      quadrant of Galaxy.
    </h3>
    <router-link to="/">Back to the home</router-link>
  </div>
</template>

<script>
export default {
  name: 'NotFound',
  props: {
    resource: {
      type: String,
      required: true
    }
  }
};
</script>

<style scoped></style>
