<template>
  <ul class="nhsuk-grid-row nhsuk-card-group">
    <li
      v-for="resource in links"
      :key="resource.id"
      class="nhsuk-grid-column-full nhsuk-card-group__item"
    >
      <div class="nhsuk-card">
        <div class="nhsuk-card__content ltlc-card__content">
          <div class="nhsuk-card__content-frame">
            <h3 class="nhsuk-card__heading nhsuk-heading-s">
              <a :href="resource.url" target="_blank">
                {{ resource.title }}
              </a>
            </h3>
            <p
              class="nhsuk-card__description nhsuk-body-s"
              :title="resource.description"
            >
              {{ resource.description | trimDescription }}
            </p>
            <div
              v-if="resource.mapped_skills.length > 0"
              class="ltlc-objectives"
            >
              <p>This resource meets the following learning objectives:</p>
              <ul class="">
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
            <ul class="ltlc-keywords">
              <li
                v-for="keyword in resource.keywords"
                :key="keyword"
                class="nhsuk-tag nhsuk-tag--blue"
              >
                {{ keyword }}
              </li>
            </ul>
          </div>
          <dl class="ltlc-resource-details">
            <div v-if="resource.format != ''" class="ltlc-details__format">
              <dt>Format</dt>
              <dd>
                <FontAwesome
                  v-if="resource.format == 'Video'"
                  icon="video"
                  size="2x"
                />
                <FontAwesome
                  v-if="resource.format == 'Audio'"
                  icon="file-audio"
                  size="2x"
                />
                <FontAwesome
                  v-if="resource.format == 'Infographic'"
                  icon="file-pdf"
                  size="2x"
                />
                <FontAwesome
                  v-if="resource.format == 'Text'"
                  icon="file-alt"
                  size="2x"
                />
                <FontAwesome
                  v-if="resource.format == 'Slides'"
                  icon="file-powerpoint"
                  size="2x"
                />
                <FontAwesome
                  v-if="resource.format == 'Website'"
                  icon="external-link-square-alt"
                  size="2x"
                />
                <FontAwesome
                  v-if="resource.format == 'Interactive'"
                  icon="hand-paper"
                  size="2x"
                />
                {{ resource.format }}
              </dd>
            </div>
            <div v-if="resource.duration > 0" class="ltlc-details__duration">
              <dt>Duration</dt>
              <dd>
                <strong class="nhsuk-u-font-size-32">
                  {{ resource.duration }}
                </strong>
                minutes
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </li>
  </ul>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import { library, config } from '@fortawesome/fontawesome-svg-core'
import {
  faVideo,
  faFileAudio,
  faFilePdf,
  faFilePowerpoint,
  faFileAlt,
  faExternalLinkSquareAlt,
  faHandPaper,
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
  faHandPaper
)

Vue.component('FontAwesome', FontAwesomeIcon)

@Component
export default class Resources extends Vue {
  @Prop({ required: true }) readonly links!: IResource[]
}

Vue.filter('trimDescription', (desc: string) => {
  if (desc != null && desc.length > 0) {
    return desc.substring(0, 150).trim() + (desc.length > 150 ? '...' : '')
  }
  return ''
})
</script>

<style lang="scss">
@import 'node_modules/nhsuk-frontend/packages/components/button/button';
@import 'node_modules/nhsuk-frontend/packages/components/card/card';
@import 'node_modules/nhsuk-frontend/packages/components/tag/tag';

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

.nhsuk-tag {
  margin-right: 2px;
  margin-bottom: 0;
  font-size: 0.75em;
}

.ltlc-keywords {
  text-align: right;
}

.ltlc-card__content {
  display: flex;
  justify-content: space-between;
}

.nhsuk-card__content-frame {
  flex-grow: 1;
}

.ltlc-resource-details {
  float: right;
  display: flex;
  flex-direction: column;
  margin-left: 16px;

  dt {
    display: none;
  }

  dd {
    text-align: right;
    padding: 8px;
    color: #fff;
    white-space: nowrap;

    strong {
      color: #fff;
    }
  }

  > div {
    margin-bottom: 4px;
  }

  .ltlc-details__format {
    background-color: $color_nhsuk-dark-pink;
  }

  .ltlc-details__duration {
    background-color: $color_nhsuk-grey-1;
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
</style>
