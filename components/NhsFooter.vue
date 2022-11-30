<template>
  <footer role="contentinfo">
    <div id="nhsuk-footer" class="nhsuk-footer">
      <div class="nhsuk-width-container">
        <h2 class="nhsuk-u-visually-hidden">Support links</h2>
        <ul class="nhsuk-footer__list">
          <li
            v-for="link in links"
            :key="link.url"
            class="nhsuk-footer__list-item"
          >
            <a
              class="nhsuk-footer__list-item-link"
              :href="link.url"
              target="_blank"
            >
              {{ link.title }}
            </a>
          </li>
        </ul>
        <p class="nhsuk-footer__copyright">
          &copy; London Transformation and Learning Collaborative
        </p>
      </div>
    </div>
  </footer>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import { ILink } from '~/interfaces'

@Component
export default class NhsFooter extends Vue {
  links: ILink[] = [
    {
      title: 'Accessibility statement',
      url: 'https://thelearningcollaborative.co.uk/accessibility',
    },
    {
      title: 'Respiratory Surge in Children programme',
      url: 'https://www.e-lfh.org.uk/programmes/respiratory_surge_in_children/',
    },
  ]
}
</script>

<style lang="scss">
@import 'node_modules/nhsuk-frontend/packages/components/footer/footer';
</style>
