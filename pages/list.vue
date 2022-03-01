<template>
  <div>
    <h1>List view</h1>
    <a href="/">Back to search</a>
    <Resources :links="links" />
  </div>
</template>

<script>
export default {
  components: {},
  head: {
    script: [
      {
        src: 'https://kit.fontawesome.com/d321bb2fa5.js',
        crossOrigin: 'anonymous',
      },
    ],
  },
}
</script>

<style lang="scss">
@import 'node_modules/nhsuk-frontend/packages/components/action-link/action-link';

h1 small {
  color: $color_nhsuk-pink;
  font-weight: bold;
}
</style>
