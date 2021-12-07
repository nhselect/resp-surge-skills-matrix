<template>
  <div class="nhsuk-grid-row">
    <div v-if="resources.length > 0" class="nhsuk-grid-column-one-third">
      <Picker
        :resources="resources"
        @changeModel="links = $event"
        @clear="links = resources"
      />
    </div>
    <div class="nhsuk-grid-column-two-thirds">
      <div id="resources" class="nhsuk-card ltlc-resources">
        <div class="nhsuk-card__content">
          <h2 class="nhsuk-card__heading">Resources</h2>
          <p v-if="links.length == resources.length">
            Showing <strong>all</strong> resources - start searching using the
            <a href="#maincontent">filters or search bar</a>.
          </p>
          <p v-else-if="links.length > 0">
            Found <strong>{{ links.length }}</strong> resources.
          </p>
          <p v-else-if="links.length == 0">
            <strong>Nothing found</strong> - try widening or simplifying your
            search.
          </p>
          <Resources :links="links" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import Picker from '@/components/Picker.vue'
import Resources from '@/components/Resources.vue'
import { IResource, IObjective } from '~/interfaces'

@Component({
  components: { Picker, Resources },
})
export default class Matrix extends Vue {
  resources: IResource[] = []
  objectives: IObjective[] = []
  links: IResource[] = []

  async fetch(): Promise<void> {
    const resources = (await this.$content('resources').fetch()) as any[]
    if (Array.isArray(resources)) {
      this.resources = resources
    } else {
      this.resources = [resources]
    }

    this.resources = this.resources.map((item) => {
      const objectives = item.mapped_skills.map((i) => i.objective).join(' ')
      const search = [
        item.title,
        item.description,
        item.keywords,
        objectives,
      ].join(' ')
      return { ...item, search }
    })

    // this.links = this.resources
  }
}
</script>

<style scoped>
.ltlc-resources {
  background: transparent;
}
</style>
