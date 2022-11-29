<template>
  <ul class="nhsuk-grid-row nhsuk-card-group">
    <li
      v-for="resource in links"
      :key="resource.id"
      class="nhsuk-grid-column-full nhsuk-card-group__item"
    >
      <div
        class="nhsuk-card nhsuk-u-margin-bottom-2"
        :class="{
          selected: isSelected(resource.id) && !isList,
        }"
      >
        <div
          class="nhsuk-card__content ltlc-card__content nhsuk-u-padding-4 nhsuk-u-padding-bottom-0"
        >
          <div class="nhsuk-card__content-frame">
            <h3 class="nhsuk-card__heading nhsuk-heading-s">
              <a :href="resource.url" target="_blank">
                {{ resource.title }}
              </a>
            </h3>
            <p
              v-if="resource.attribution"
              class="nhsuk-body-s ltlc-attribution nhsuk-u-margin-bottom-2"
            >
              <FontAwesome icon="user-edit" size="1x" />
              <strong>
                {{ resource.attribution }}
              </strong>
            </p>
            <p
              class="nhsuk-card__description nhsuk-body-s nhsuk-u-reading-width nhsuk-u-margin-bottom-2"
              :title="resource.description"
            >
              {{ resource.description | trimDescription }}
            </p>
            <ul
              v-if="showTags"
              class="ltlc-keywords nhsuk-body-s nhsuk-u-margin-0"
            >
              <li v-for="keyword in resource.keywords" :key="keyword" class="">
                <a href="#" @click="addKeywordToFilter(keyword)">
                  {{ keyword }}
                </a>
              </li>
            </ul>
            <!--
            <details
              v-if="resource.mapped_skills.length > 0"
              class="nhsuk-details ltlc-objectives nhsuk-body-s"
            >
              <summary class="nhsuk-details__summary">
                <span class="nhsuk-details__summary-text">
                  This resource is mapped to
                  {{ resource.mapped_skills.length }} learning objective{{
                    resource.mapped_skills.length > 1 ? 's' : ''
                  }}
                </span>
              </summary>
              <div class="nhsuk-details__text">
                <ul class="nhsuk-list">
                  <li
                    v-for="objective in resource.mapped_skills"
                    :key="objective.id"
                    class="nhsuk-list ltlc-objective__item"
                  >
                    <strong>{{ objective.value }}</strong>
                    {{ objective.objective }}
                  </li>
                </ul>
              </div>
            </details>
            -->
            <ul class="ltlc-staff">
              <li
                v-for="s in resource.staff"
                :key="s"
                class="nhsuk-tag nhsuk-tag--green"
              >
                {{ s }}
              </li>
            </ul>
          </div>
          <dl class="ltlc-resource-details">
            <div v-if="resource.upload_date" class="ltlc-details__dateadded">
              <dt>Date added</dt>
              <dd class="nhsuk-tag nhsuk-tag--aqua-green">
                <FontAwesome icon="calendar-plus" />
                {{ formatDate(resource.upload_date) }}
              </dd>
            </div>
            <div v-if="resource.format != ''" class="ltlc-details__format">
              <dt>Format</dt>
              <dd class="nhsuk-tag nhsuk-tag--blue">
                <FontAwesome v-if="resource.format == 'Video'" icon="video" />
                <FontAwesome
                  v-if="resource.format == 'Audio'"
                  icon="file-audio"
                />
                <FontAwesome
                  v-if="resource.format == 'Infographic'"
                  icon="file-pdf"
                />
                <FontAwesome v-if="resource.format == 'Text'" icon="file-alt" />
                <FontAwesome
                  v-if="resource.format == 'Slides'"
                  icon="file-powerpoint"
                />
                <FontAwesome
                  v-if="resource.format == 'Website'"
                  icon="external-link-square-alt"
                />
                <FontAwesome
                  v-if="resource.format == 'Interactive'"
                  icon="hand-paper"
                />
                {{ resource.format }}
              </dd>
            </div>
            <div v-if="resource.duration > 0" class="ltlc-details__duration">
              <dt>Estimated duration</dt>
              <dd class="nhsuk-tag nhsuk-tag--grey">
                <FontAwesome icon="clock" />
                {{ resource.duration }} min
              </dd>
            </div>
          </dl>
          <QrCode v-if="createQr" :share-url="resource.url" />
        </div>
        <div v-if="!isList" class="ltlc__select-item">
          <div>
            <label
              class="nhsuk-button"
              :class="isSelected(resource.id) ? 'nhsuk-button--selected' : ''"
              :for="resource.id.toString()"
            >
              <input
                :id="resource.id.toString()"
                v-model="selectedItems"
                type="checkbox"
                :label="resource.id"
                :value="resource"
                :name="resource.id.toString()"
                hidden
              />
              <span v-if="isSelected(resource.id)">Remove item</span>
              <span v-else>Add item to list</span>
            </label>
          </div>
        </div>
      </div>
    </li>
  </ul>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'nuxt-property-decorator'
import { library, config } from '@fortawesome/fontawesome-svg-core'
import {
  faVideo,
  faFileAudio,
  faFilePdf,
  faFilePowerpoint,
  faFileAlt,
  faExternalLinkSquareAlt,
  faHandPaper,
  faStar,
  faClock,
  faGraduationCap,
  faBookReader,
  faUserCircle,
  faUserEdit,
  faCalendarPlus,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { IResource } from '~/interfaces'

config.autoAddCss = false

library.add(
  faVideo,
  faFileAudio,
  faFilePdf,
  faFilePowerpoint,
  faFileAlt,
  faExternalLinkSquareAlt,
  faHandPaper,
  faStar,
  faClock,
  faGraduationCap,
  faBookReader,
  faUserCircle,
  faUserEdit,
  faCalendarPlus
)

Vue.component('FontAwesome', FontAwesomeIcon)

@Component
export default class Resources extends Vue {
  @Prop({ required: true }) readonly links!: IResource[]
  @Prop({ required: true }) readonly selected!: IResource[]
  @Prop({ required: true }) readonly isList!: boolean
  @Prop({ required: false, default: false }) readonly createQr!: boolean
  @Prop({ required: false, default: true }) readonly showTags!: boolean

  selectedItems: IResource[] = []

  isSelected(id: number) {
    return this.selected.map((s) => s.id).includes(id)
  }

  addKeywordToFilter(keyword: string) {
    this.$root.$emit('addKeywordToFilter', keyword)
  }

  formatDate(dateToFormat: Date) {
    const formattedDate = new Date(
      Date.parse(dateToFormat.toString())
    ).toLocaleDateString()
    return formattedDate
  }

  @Watch('selectedItems')
  onSelectedItemsChanged() {
    this.$emit('update:selected', this.selectedItems)
  }

  @Watch('selected')
  onSelectedChanged() {
    this.selectedItems = this.selected
  }
}

Vue.filter('trimDescription', (desc: string) => {
  if (desc != null && desc.length > 0) {
    return desc.substring(0, 350).trim() + (desc.length > 350 ? '...' : '')
  }
  return ''
})
</script>

<style lang="scss">
@import 'node_modules/nhsuk-frontend/packages/components/button/button';
@import 'node_modules/nhsuk-frontend/packages/components/card/card';
@import 'node_modules/nhsuk-frontend/packages/components/tag/tag';
@import 'node_modules/nhsuk-frontend/packages/components/details/details';
@import 'node_modules/nhsuk-frontend/packages/components/fieldset/fieldset';
@import 'node_modules/nhsuk-frontend/packages/components/checkboxes/checkboxes';
@import 'assets/scss/small-checkboxes';

.ltlc-resources {
  .nhsuk-grid-column-full {
    padding-left: 0;
  }
}

h3.nhsuk-heading-s {
  margin-bottom: 8px;
}

.nhsuk-card-group__item .nhsuk-card {
  margin-bottom: 16px;
}

.nhsuk-card__heading > small {
  font-weight: normal;
}

.nhsuk-header {
  border-bottom: 10px solid $color_nhsuk-pink;
}

.resource__starred {
  position: absolute;
  left: -5px;
  top: -6px;
  color: $color_nhsuk-orange;
}

.nhsuk-card.starred {
  border: 1px solid $color_nhsuk-orange;
}

.nhsuk-card.selected {
  border: 1px solid $color_nhsuk-blue;
  background-color: lighten($color_nhsuk-blue, 60%);
}

.ltlc-keywords {
  list-style: none;
  padding: 0;
  font-weight: $nhsuk-font-bold;

  li {
    display: inline-block;
    margin-right: 12px;
    margin-bottom: 2px;
  }
}

.ltlc-card__content {
  display: flex;
  justify-content: space-between;
  padding-bottom: 0 !important;
}

.nhsuk-card__content-frame {
  flex-grow: 1;
}

.ltlc-resource-details {
  float: right;
  display: flex;
  align-items: flex-end;
  flex-direction: column;
  margin-left: 16px;
  margin-right: -40px;
  white-space: nowrap;

  dt {
    display: none;
  }

  > div {
    margin-bottom: 4px;
  }
}

.ltlc-objectives {
  p {
    font-weight: bold;
    font-size: 0.8em;
    margin-bottom: 8px;
  }

  li {
    font-size: 0.8em;
    margin-bottom: 8px;
  }
}

.ltlc-attribution {
  color: $color_nhsuk-grey-2;
}

.ltlc__select-item {
  @include nhsuk-responsive-padding(4);

  padding-top: 0 !important;
  float: right;

  .nhsuk-button {
    @include nhsuk-responsive-padding(2);

    margin-bottom: 0;
    font-size: 0.8em;
    background-color: $nhsuk-secondary-button-color;
    box-shadow: 0 $button-shadow-size 0 $nhsuk-secondary-button-shadow-color;

    &:hover {
      background-color: darken($nhsuk-secondary-button-color, 10%);
    }

    &:focus {
      background: $nhsuk-focus-color;
      box-shadow: 0 $button-shadow-size 0 $nhsuk-focus-text-color;
      color: $nhsuk-focus-text-color;
      outline: $nhsuk-focus-width solid transparent;
    }

    &:active {
      background: $nhsuk-secondary-button-active-color;
      box-shadow: none;
      color: $nhsuk-button-text-color;
      top: $button-shadow-size;
    }

    &.nhsuk-button--disabled {
      background-color: $nhsuk-secondary-button-color;
    }
  }
}
</style>
