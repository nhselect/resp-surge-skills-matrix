<template>
  <div id="picker" class="nhsuk-fieldset">
    <div class="nhsuk-form-group">
      <label class="nhsuk-label" for="search">What are you looking for?</label>
      <input
        id="search"
        v-model="searchQuery"
        class="nhsuk-input nhsuk-u-width-full"
        name="Search"
        type="text"
        placeholder="e.g. keywords, objectives, topics"
      />
      <p v-if="results > 0">
        <strong class="nhsuk-tag nhsuk-tag--green">
          <a href="#resources">Found {{ results }} resources</a>
        </strong>
      </p>
    </div>
    <div class="nhsuk-form-group" label="Duration">
      <label class="nhsuk-label" for="duration">
        Maximum Duration (minutes)
      </label>
      <input
        id="duration"
        v-model="duration"
        class="nhsuk-input nhsuk-u-width-one-quarter"
        name="duration"
        type="number"
      />
    </div>
    <div class="nhsuk-form-group" label="Resource Type">
      <fieldset class="nhsuk-fieldset">
        <legend class="nhsuk-fieldset__legend">
          <p class="nhsuk-fieldset__heading">Format</p>
        </legend>
        <div class="nhsuk-checkboxes">
          <div
            v-for="item in getFormats()"
            :key="item"
            class="nhsuk-checkboxes__item"
          >
            <input
              v-model="formats"
              class="nhsuk-checkboxes__input"
              type="checkbox"
              :label="item"
              :value="item"
              :name="item"
              checked="checked"
            />
            <label class="nhsuk-label nhsuk-checkboxes__label" :for="item">
              {{ item }}
            </label>
          </div>
        </div>
      </fieldset>
    </div>
    <div class="nhsuk-form-group">
      <button class="nhsuk-button" @click="clearFilters">Clear Filters</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'nuxt-property-decorator'
import { IResource } from '~/interfaces'

@Component
export default class Picker extends Vue {
  @Prop({ required: true }) readonly resources!: IResource[]
  search = ''
  searchQuery = ''
  duration = 0
  results = 0
  formats: String[] = [
    'Audio',
    'Video',
    'Infographic',
    'Interactive',
    'Slides',
    'Text',
    'Website',
  ]

  getFormats() {
    return [
      ...new Set(this.resources.map((resource) => resource.format)),
    ].sort()
  }

  getLinks() {
    let resource = this.resources.filter((resource) => {
      return this.searchQuery
        .toLowerCase()
        .split(' ')
        .every((v) => resource.search.toLowerCase().includes(v))
    })

    if (this.duration > 0) {
      resource = resource.filter((resource) => {
        return resource.duration <= this.duration
      })
    }

    if (this.formats.length > 0) {
      resource = resource.filter((resource) => {
        return this.formats.includes(resource.format)
      })
    }

    if (resource && resource.length > 0) {
      this.results = resource.length
      return resource
    }

    if (resource.length === 0) {
      this.results = 0
      return resource
    }

    this.results = 0
    return this.resources
  }

  // clear all filters
  clearFilters() {
    this.searchQuery = ''
    this.formats = [
      'Audio',
      'Video',
      'Infographic',
      'Interactive',
      'Slides',
      'Text',
      'Website',
    ]
    this.duration = 0
    this.results = 0
  }

  @Watch('searchQuery')
  onSearchChanged() {
    this.$emit('clear')
    this.results = 0

    if (this.searchQuery !== '') {
      this.$emit('changeModel', this.getLinks())
    }
  }

  @Watch('duration')
  onDurationChanged() {
    this.$emit('clear')
    this.results = 0

    if (this.duration > 0) {
      this.$emit('changeModel', this.getLinks())
    }
  }

  @Watch('formats')
  onFormatChanged() {
    this.$emit('clear')

    this.searchQuery = ''

    this.$emit('changeModel', this.getLinks())
  }
}
</script>

<style lang="scss">
@import 'node_modules/nhsuk-frontend/packages/components/fieldset/fieldset';
@import 'node_modules/nhsuk-frontend/packages/components/select/select';
@import 'node_modules/nhsuk-frontend/packages/components/label/label';
@import 'node_modules/nhsuk-frontend/packages/components/input/input';
@import 'node_modules/nhsuk-frontend/packages/components/tag/tag';
@import 'node_modules/nhsuk-frontend/packages/components/checkboxes/checkboxes';
</style>
