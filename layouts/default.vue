<template>
  <div>
    <a class="nhsuk-skip-link" href="#maincontent">Skip to main content</a>
    <header class="nhsuk-header nhsuk-header--transactional" role="banner">
      <div class="nhsuk-width-container-fluid nhsuk-header__container">
        <div class="nhsuk-header__logo nhsuk-header__logo--only">
          <svg
            class="nhsuk-logo"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 40 16"
            height="40"
            width="100"
          >
            <path
              class="nhsuk-logo__background"
              fill="#005eb8"
              d="M0 0h40v16H0z"
            ></path>
            <path
              class="nhsuk-logo__text"
              fill="#fff"
              d="M3.9 1.5h4.4l2.6 9h.1l1.8-9h3.3l-2.8 13H9l-2.7-9h-.1l-1.8 9H1.1M17.3 1.5h3.6l-1 4.9h4L25 1.5h3.5l-2.7 13h-3.5l1.1-5.6h-4.1l-1.2 5.6h-3.4M37.7 4.4c-.7-.3-1.6-.6-2.9-.6-1.4 0-2.5.2-2.5 1.3 0 1.8 5.1 1.2 5.1 5.1 0 3.6-3.3 4.5-6.4 4.5-1.3 0-2.9-.3-4-.7l.8-2.7c.7.4 2.1.7 3.2.7s2.8-.2 2.8-1.5c0-2.1-5.1-1.3-5.1-5 0-3.4 2.9-4.4 5.8-4.4 1.6 0 3.1.2 4 .6"
            ></path>
          </svg>
        </div>
      </div>
    </header>
    <div class="nhsuk-width-container-fluid">
      <main id="maincontent" class="nhsuk-main-wrapper" role="main">
        <Nuxt />
      </main>
    </div>
    <footer role="contentinfo">
      <div id="nhsuk-footer" class="nhsuk-footer">
        <div class="nhsuk-width-container">
          <p class="nhsuk-footer__copyright">&copy; Crown copyright</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
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
@import 'node_modules/nhsuk-frontend/packages/components/header/header';
@import 'node_modules/nhsuk-frontend/packages/components/footer/footer';
@import 'node_modules/nhsuk-frontend/packages/components/skip-link/skip-link';

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
