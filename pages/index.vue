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
        <div class="nhsuk-action-link">
          <a
            class="nhsuk-action-link__link"
            href="https://forms.office.com/Pages/ResponsePage.aspx?id=-79gf9LZcUSKsPyF5z_3qWrr7hJ6td1DsRX0S5ZELqFUQzE1MDVCVTlOMEtGMTA3TEgxODZWUFlUUSQlQCN0PWcu"
            target="_blank"
          >
            <svg
              class="nhsuk-icon nhsuk-icon__arrow-right-circle"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              aria-hidden="true"
              width="36"
              height="36"
            >
              <path d="M0 0h24v24H0z" fill="none"></path>
              <path
                d="M12 2a10 10 0 0 0-9.95 9h11.64L9.74 7.05a1 1 0 0 1 1.41-1.41l5.66 5.65a1 1 0 0 1 0 1.42l-5.66 5.65a1 1 0 0 1-1.41 0 1 1 0 0 1 0-1.41L13.69 13H2.05A10 10 0 1 0 12 2z"
              ></path>
            </svg>
            <span class="nhsuk-action-link__text">Comments or feedback?</span>
          </a>
        </div>
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
