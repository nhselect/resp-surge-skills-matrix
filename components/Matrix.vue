<template>
  <div class="nhsuk-grid-row">
    <div
      v-if="resources.length > 0"
      class="nhsuk-grid-column-one-third ltlc-picker"
    >
      <Picker
        :resources="resources"
        @changeFilter="indexFilter = $event"
        @changeModel="links = $event"
        @changeFilterDescription="filterDescription = $event"
        @clear="links = resources"
      />
    </div>
    <div class="nhsuk-grid-column-two-thirds">
      <div id="resources" class="ltlc-resources">
        <div class="">
          <h2 class="">Resources</h2>
          <p v-if="links.length == resources.length">
            Showing <strong>all {{ resources.length }}</strong> resources -
            start searching using the
            <a href="#maincontent">filters or search bar</a>.
          </p>
          <p v-else-if="links.length > 0">
            Found <strong>{{ links.length }}</strong> resources{{
              filterDescription
            }}
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
import { IResource, IObjective, IFilter } from '~/interfaces'

@Component({
  components: { Picker, Resources },
})
export default class Matrix extends Vue {
  resources: IResource[] = []
  objectives: IObjective[] = []
  links: IResource[] = []
  indexFilter: IFilter = {
    text: '',
    duration: 0,
    formats: [],
    caresetting: '',
    staff: '',
  }

  filterDescription: string = ''

  async fetch(): Promise<void> {
    const resources = (await this.$content('resources').fetch()) as any[]
    if (Array.isArray(resources)) {
      this.resources = resources
    } else {
      this.resources = [resources]
    }

    this.resources = this.resources
      .map((item) => {
        const objectives = item.mapped_skills.map((i) => i.objective).join(' ')
        const search = [
          item.title,
          item.keywords,
          item.description,
          objectives,
        ].join(' ')
        return { ...item, search }
      })
      .sort()

    this.links = this.resources
  }
}
</script>

<style lang="scss" scoped>
.nhsuk-card.ltlc-resources {
  background: transparent;
  border: none;
}

.ltlc-picker {
  border-right: 1px solid $color_nhsuk-grey-4;
}
</style>
