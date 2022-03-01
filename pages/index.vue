<template>
  <div>
    <h1>Respiratory Surge in Children <small>Searchable Index</small></h1>
    <p class="nhsuk__lead">
      Use the search bar or the drop down boxes below to find specific
      resources.
    </p>
    <p>
      <strong>
        Access the new
        <a
          href="https://www.e-lfh.org.uk/programmes/respiratory_surge_in_children/#PaediatricDigitalSkillsPasspor"
          target="_blank"
        >
          Paediatric Digital Skills Passports
        </a>
        , endorsed by the Paediatric Critical Care Society (PCCS)
      </strong>
    </p>
    <Matrix />
    <div class="links">
      <h2>Can't find what you are looking for?</h2>
      <p>
        Please email
        <a href="mailto:LTLC@hee.nhs.uk">LTLC@hee.nhs.uk</a> stating what you
        need and we will do our best to locate some suitable resources.
      </p>
    </div>
    <div>
      <h2>Install on your phone</h2>
      <p>
        You can install this as an app on your phone by accessing your browser
        settings/share settings and selecting
        <strong>Add to Home Screen</strong>
        (please note: steps vary between devices and browsers)
      </p>
    </div>
    <div>
      <h2>Learn more about our LTLC programmes</h2>
      <Logo />
    </div>
  </div>
</template>

<script>
import Logo from '~/components/Logo.vue'
import Matrix from '~/components/Matrix.vue'

export default {
  components: {
    Logo,
    Matrix,
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
