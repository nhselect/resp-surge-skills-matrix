<template>
  <div class="elect-programmes nhsuk-contents-list nhsuk-u-padding-4">
    <h3>Our programmes:</h3>
    <ul class="nhsuk-contents-list__list">
      <li class="nhsuk-contents-list__item nhsuk-u-font-weight-bold">
        <a
          href="https://www.e-lfh.org.uk/programmes/cypmh_in_acute_settings/"
          target="_blank"
        >
          Children and Young People with Mental Health Needs, Autism or Learning
          Disability
        </a>
      </li>
      <li class="nhsuk-contents-list__item">
        <a
          href="https://www.e-lfh.org.uk/programmes/respiratory_surge_in_children/"
          target="_blank"
        >
          Respiratory Surge in Children
        </a>
      </li>
      <li class="nhsuk-contents-list__item">
        <a
          href="https://www.e-lfh.org.uk/programmes/london-transformation-and-learning-collaborative-ltlc/"
          target="_blank"
        >
          Adult Critical Care
        </a>
      </li>
    </ul>
  </div>
</template>

<style lang="scss">
@import 'node_modules/nhsuk-frontend/packages/components/contents-list/contents-list';

.ltlc__programme-logo {
  max-width: 100%;
}

.NuxtLogo {
  animation: 1s appear;
  margin: auto;
}

@keyframes appear {
  0% {
    opacity: 0;
  }
}

.elect-programmes {
  border: 1px solid $nhsuk-border-color;
}
</style>
