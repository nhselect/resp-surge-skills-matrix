<template>
  <div>
    <a class="nhsuk-skip-link" href="#maincontent">Skip to main content</a>
    <NhsHeader />
    <div class="nhsuk-width-container-fluid">
      <main id="maincontent" class="nhsuk-main-wrapper" role="main">
        <Nuxt />
        <div class="email-contact">
          <h2>Can't find what you are looking for?</h2>
          <p>
            Please email
            <a href="mailto:learningnetwork@nhselect.org.uk"
              >learningnetwork@nhselect.org.uk</a
            >
            stating what you need and we will do our best to locate some
            suitable resources.
          </p>
        </div>
        <div class="install-instructions">
          <h2>Install on your phone</h2>
          <p>
            You can install this as an app on your phone by accessing your
            browser settings/share settings and selecting
            <strong>Add to Home Screen</strong>
            (please note: steps vary between devices and browsers)
          </p>
        </div>
        <div class="programme-list">
          <Programmes />
        </div>
      </main>
    </div>
    <NhsFooter />
  </div>
</template>

<script>
import Programmes from '~/components/Programmes.vue'
import NhsFooter from '~/components/NhsFooter.vue'
import NhsHeader from '~/components/NhsHeader.vue'

export default {
  components: {
    Programmes,
    NhsFooter,
    NhsHeader,
  },
}
</script>

<style lang="scss">
@import 'node_modules/nhsuk-frontend/packages/components/skip-link/skip-link';
@import 'node_modules/nhsuk-frontend/packages/components/action-link/action-link';

html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}
</style>
