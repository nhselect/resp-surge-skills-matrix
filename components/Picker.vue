<template>
  <div>
    <div v-if="!viewingList" class="nhsuk-fieldset">
      <div class="nhsuk-form-group">
        <label class="nhsuk-label" for="search"
          >What are you looking for?</label
        >
        <input
          id="search"
          v-model="indexFilter.text"
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
      <div class="nhsuk-form-group" label="Staff Group">
        <label class="nhsuk-label" for="staff">Staff Group</label>
        <select
          id="staff"
          v-model="indexFilter.staff"
          placeholder="Staff Group"
          class="nhsuk-select nhsuk-u-width-full"
        >
          <option></option>
          <option
            v-for="staff in getStaff()"
            :key="staff"
            :label="staff"
            :value="staff"
          >
            {{ staff }}
          </option>
        </select>
      </div>
      <div class="nhsuk-form-group" label="Care Setting">
        <label class="nhsuk-label" for="staff">Care Setting</label>
        <select
          id="staff"
          v-model="indexFilter.caresetting"
          placeholder="Care Setting"
          class="nhsuk-select nhsuk-u-width-full"
        >
          <option></option>
          <option
            v-for="caresetting in getCareSettings()"
            :key="caresetting"
            :label="caresetting"
            :value="caresetting"
          >
            {{ caresetting }}
          </option>
        </select>
      </div>
      <div class="nhsuk-form-group" label="Duration">
        <label class="nhsuk-label" for="duration">
          Maximum Duration (minutes)
        </label>
        <input
          id="duration"
          v-model="indexFilter.duration"
          class="nhsuk-input nhsuk-u-width-one-quarter"
          name="duration"
          type="number"
        />
        <span
          v-for="d in durationPresets"
          :key="d"
          class="nhsuk-tag nhsuk-tag--grey"
        >
          <a href="#" @click="setDuration(d)">
            {{ d > 0 ? d : 'None' }}
          </a>
        </span>
      </div>
      <div class="nhsuk-form-group" label="Resource Type">
        <fieldset class="nhsuk-fieldset">
          <legend class="nhsuk-fieldset__legend">
            <p class="nhsuk-fieldset__heading">Format</p>
          </legend>
          <div
            class="nhsuk-checkboxes nhsuk-checkboxes--small ltlc-filter__formats"
          >
            <div
              v-for="item in getFormats()"
              :key="item"
              class="nhsuk-checkboxes__item"
            >
              <input
                v-model="indexFilter.formats"
                class="nhsuk-checkboxes__input"
                type="checkbox"
                :label="item"
                :value="item"
                :name="item"
              />
              <label class="nhsuk-label nhsuk-checkboxes__label" :for="item">
                {{ item }}
              </label>
            </div>
          </div>
        </fieldset>
      </div>
      <div class="nhsuk-form-group">
        <button class="nhsuk-button" @click="shareFilter">Share Filter</button>
        <button
          class="nhsuk-button nhsuk-button__secondary"
          @click="clearFilters"
        >
          Clear Filters
        </button>
      </div>
      <hr />
    </div>
    <div v-else>
      <p>
        You are currently viewing a custom curated list of resources, so the
        filter options are disabled.
      </p>
      <div class="nhsuk-form-group">
        <button class="nhsuk-button nhsuk-button__secondary" @click="hideList">
          Return to filters
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'nuxt-property-decorator'
import { IResource, IFilter } from '~/interfaces'

@Component
export default class Picker extends Vue {
  @Prop({ required: true }) readonly resources!: IResource[]
  @Prop({ required: true }) readonly filter!: IFilter[]
  @Prop() readonly viewingList!: boolean
  results = 0
  status = ''

  indexFilter: IFilter = JSON.parse(JSON.stringify(this.filter))

  searchWeighting = {
    title: 10,
    keyword: 5,
    description: 1,
    objective: 1,
  }

  durationPresets = [5, 15, 30, 0]

  setDuration(d: number) {
    this.indexFilter.duration = d
  }

  mounted() {
    this.$root.$on('addKeywordToFilter', (keyword: string) => {
      if (
        !this.indexFilter.text.toLowerCase().includes(keyword.toLowerCase())
      ) {
        this.indexFilter.text = [this.indexFilter.text, keyword]
          .join(' ')
          .trim()
      }
    })
  }

  hideList() {
    this.$emit('update:viewing-list', false)
  }

  getFormats() {
    return [...new Set(this.resources.map((resource) => resource.format))]
      .filter((a) => a)
      .sort()
  }

  getStaff() {
    return [...new Set(this.resources.flatMap((resource) => resource.staff))]
      .filter((a) => a)
      .sort()
  }

  getCareSettings() {
    return [
      ...new Set(this.resources.flatMap((resource) => resource.care_level)),
    ]
      .filter((a) => a)
      .sort()
  }

  clearFilters() {
    this.$emit('clearFilters')
  }

  shareFilter() {
    this.$emit('update:is-sharing-filter', true)
    this.$emit('update:share-modal', true)
  }

  textToArray(text: string) {
    return text.toLowerCase().split(' ')
  }

  getLinks() {
    this.$emit('update:filter', this.indexFilter)

    const ranked = this.resources
      .map((r) => {
        let points = 0

        if (this.indexFilter.text.trim().length > 0) {
          const textArr = this.indexFilter.text
            .trim()
            .toLowerCase()
            .split(' ')
            .filter((w) => w !== '' && w !== ' ')

          const wordsMatched = r.title
            .toLowerCase()
            .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '')
            .split(' ')
            .filter((w) => {
              return w !== '' && textArr.includes(w)
            }).length

          points += wordsMatched * this.searchWeighting.title

          const keywordsMatched = r.keywords
            .join(' ')
            .toLowerCase()
            .split(' ')
            .filter((w) => {
              return textArr.includes(w)
            }).length

          points += keywordsMatched * this.searchWeighting.keyword

          const partialMatched = r.search
            .toLowerCase()
            .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '')
            .split(' ')
            .filter((w) => {
              return textArr.every((v) => w.includes(v))
            }).length

          points += partialMatched * this.searchWeighting.description
        } else {
          points += 1
        }

        return { ...r, points }
      })
      .filter((resource) => {
        return resource.points > 0
      })
      .sort(
        (a, b) =>
          b.points - a.points ||
          Date.parse(b.upload_date.toString()) -
            Date.parse(a.upload_date.toString())
      )

    let resource = this.resources
      .filter((r) => ranked.map((m) => m.id).includes(r.id))
      .sort((a, b) => {
        return (
          ranked.findIndex((ranked) => a.id === ranked.id) -
          ranked.findIndex((ranked) => b.id === ranked.id)
        )
      })

    if (this.indexFilter.staff !== '') {
      resource = resource.filter((resource) => {
        return resource.staff.includes(this.indexFilter.staff)
      })
    }

    if (this.indexFilter.duration > 0) {
      resource = resource.filter((resource) => {
        return resource.duration <= this.indexFilter.duration
      })
    }

    if (this.indexFilter.caresetting.length > 0) {
      resource = resource.filter((resource) => {
        return this.indexFilter.caresetting.includes(resource.care_level)
      })
    }

    if (this.indexFilter.formats.length > 0) {
      resource = resource.filter((resource) => {
        return this.indexFilter.formats.includes(resource.format)
      })
    }

    this.$emit('changeFilterDescription', this.changeFilterDescription())

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

  getFilter() {
    const currentFilter = this.indexFilter
    return currentFilter
  }

  changeFilterDescription() {
    let desc = ''
    if (this.indexFilter.text !== '') {
      desc += ', searching for ' + this.indexFilter.text
    }
    if (this.indexFilter.duration > 0) {
      desc +=
        ' with a maximum time of ' +
        this.indexFilter.duration.toString() +
        ' minutes'
    }
    if (this.indexFilter.staff !== '' || this.indexFilter.caresetting !== '') {
      desc += ', appropriate for '
      if (this.indexFilter.staff !== '') {
        desc += this.indexFilter.staff + ' '
      }
      desc += 'staff'
      if (this.indexFilter.caresetting !== '') {
        desc += ' working within ' + this.indexFilter.caresetting
      }
    }

    return desc
  }

  @Watch('indexFilter.text')
  onSearchChanged() {
    this.$emit('clear')
    this.results = 0
    this.$emit('changeModel', this.getLinks())
  }

  @Watch('indexFilter.staff')
  onStaffChanged() {
    this.$emit('clear')
    this.results = 0
    this.$emit('changeModel', this.getLinks())
  }

  @Watch('indexFilter.duration')
  onDurationChanged() {
    this.$emit('clear')
    this.results = 0
    this.$emit('changeModel', this.getLinks())
  }

  @Watch('indexFilter.caresetting')
  onCareSettingChanged() {
    this.$emit('clear')
    this.results = 0
    this.$emit('changeModel', this.getLinks())
  }

  @Watch('indexFilter.formats')
  onFormatChanged() {
    this.$emit('clear')
    this.results = 0
    this.$emit('changeModel', this.getLinks())
  }

  @Watch('filter')
  onFilterUpdated() {
    this.indexFilter = Object.assign(this.indexFilter, this.filter)
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
@import 'assets/scss/small-checkboxes';

.nhsuk-checkboxes.ltlc-filter__formats {
  display: flex;
  flex-wrap: wrap;

  .nhsuk-checkboxes__item {
    margin-right: 20px;
  }
}

.nhsuk-tag {
  margin-right: 2px;
}

.nhsuk-fieldset__legend .nhsuk-fieldset__heading {
  font-weight: 600;
}
</style>
