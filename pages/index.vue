<template>
  <div>
    <div class="nhsuk-grid-row">
      <div class="nhsuk-grid-column-two-thirds">
        <h1 class="nhsuk-heading-l">
          Respiratory Surge in Children
          <br /><span class="nhsuk-caption-xl nhsuk-u-font-weight-bold"
            >Searchable Index</span
          >
        </h1>
        <p class="nhsuk__lead">
          Use the search bar and the filters below to find specific resources.
        </p>
        <p>
          Need rapid training to learn about an area of interest, learning
          pathway, or experience-appropriate content? View our new Rapid Access
          Lists:
        </p>
        <RapidAccessListMenu />
      </div>
      <div class="nhsuk-grid-column-one-third">
        <Programmes />
      </div>
    </div>
    <Matrix />
  </div>
</template>

<script>
export default {
  components: {},
}
</script>

<style lang="scss">
h1.nhsuk-heading-l > span.nhsuk-caption-xl {
  color: $color_nhsuk-pink;
}
</style>
