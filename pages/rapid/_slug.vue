<template>
  <div>
    <div class="nhsuk-grid-row">
      <div class="nhsuk-grid-column-two-thirds">
        <div class="nhsuk-back-link">
          <NuxtLink class="nhsuk-back-link__link" to="/">
            <svg
              class="nhsuk-icon nhsuk-icon__chevron-left"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              aria-hidden="true"
              height="24"
              width="24"
            >
              <path
                d="M8.5 12c0-.3.1-.5.3-.7l5-5c.4-.4 1-.4 1.4 0s.4 1 0 1.4L10.9 12l4.3 4.3c.4.4.4 1 0 1.4s-1 .4-1.4 0l-5-5c-.2-.2-.3-.4-.3-.7z"
              ></path>
            </svg>
            Find more resources in the index
          </NuxtLink>
        </div>
        <h1 class="nhsuk-heading-m">Respiratory Surge in Children</h1>
        <h2 class="nhsuk-heading-xl">
          <span class="nhsuk-caption-xl">Rapid Access List</span>
          {{ rapid.title }}
        </h2>
      </div>
      <div class="nhsuk-grid-column-one-third">
        <div class="nhsuk-inset-text">
          <p>
            Rapidly gets you to an area of interest, learning pathway, or
            experience-appropriate content
          </p>
        </div>
      </div>
    </div>
    <div class="nhsuk-u-reading-width">
      <div v-if="rapid.profile && rapid.profile.body.children.length > 0">
        <h3>Profile:</h3>
        <nuxt-content :document="rapid.profile" />
      </div>
      <div v-if="rapid.body && rapid.body.children.length > 0">
        <h3>About this list:</h3>
        <nuxt-content :document="rapid" />
      </div>
      <hr />
      <h3 class="nhsuk-heading-l">Primary resources:</h3>
      <p class="nhsuk-u-font-size-24">
        Duration:
        <span class="nhsuk-tag nhsuk-tag--blue nhsuk-u-font-size-24">
          {{ readableDuration }}
        </span>
      </p>
    </div>
    <Resources
      :links="items"
      :is-list="true"
      :create-qr="true"
      :selected="[]"
      :show-tags="false"
      class="nhsuk-u-reading-width"
    />
    <div v-if="rapid.additionalResources">
      <hr />
      <div
        v-for="(section, index) in rapid.additionalResources"
        :key="section.title"
      >
        <h3>{{ section.title }}</h3>

        <p class="nhsuk-u-font-size-20">
          Duration:
          <span class="nhsuk-tag nhsuk-tag--blue nhsuk-u-font-size-20">
            {{ additionalDurations[index] }}
          </span>
        </p>

        <nuxt-content
          :document="section.description"
          class="nhsuk-u-reading-width"
        />
        <Resources
          :links="additionalItems[index]"
          :is-list="true"
          :create-qr="true"
          :selected="[]"
          :show-tags="false"
          class="nhsuk-u-reading-width"
        />
        <hr />
      </div>
    </div>
    <div v-if="rapid.definitions">
      <h3>What is:</h3>
      <dl class="nhsuk-summary-list nhsuk-summary-list--no-border">
        <div
          v-for="def in rapid.definitions"
          :key="def.title"
          class="nhsuk-summary-list__row"
        >
          <dt class="nhsuk-summary-list__key">
            <a :href="def.url" target="_blank">{{ def.title }}</a>
          </dt>
          <dd class="nhsuk-summary-list__value">
            {{ def.definition }}
          </dd>
        </div>
      </dl>
      <hr />
    </div>
  </div>
</template>

<script>
import Resources from '../../components/Resources.vue'
export default {
  components: { Resources },
  async asyncData({ params, $content, $toReadableTime }) {
    const slug = params.slug || 'testy'
    let items
    const additionalItems = []
    let rapid
    let duration = 0
    let readableDuration = ''
    const additionalDurations = []
    if (slug !== '') {
      rapid = await $content('rapid-access/' + slug).fetch()
      if (rapid.primaryResources && rapid.primaryResources.length > 0) {
        // const ids = rapid.primaryResources.map(r=>parseInt(r))
        const itemSet = await $content('resources').where({}).fetch()
        if (itemSet) {
          items = itemSet.items
            .filter((i) => rapid.primaryResources.includes(i.id))
            .sort((a, b) => {
              return (
                rapid.primaryResources.indexOf(a.id) -
                rapid.primaryResources.indexOf(b.id)
              )
            })

          duration = items
            .map((r) => r.duration)
            .reduce((t, c) => {
              return t + c
            }, 0)

          readableDuration = $toReadableTime(duration)

          if (rapid.additionalResources) {
            for (let i = 0; i < rapid.additionalResources.length; i++) {
              const ids = rapid.additionalResources[i].resources
              const sectionItems = itemSet.items
                .filter((r) => ids.includes(r.id))
                .sort((a, b) => {
                  return ids.indexOf(a.id) - ids.indexOf(b.id)
                })
              additionalItems[i] = sectionItems
              const dur = sectionItems
                .map((r) => r.duration)
                .reduce((t, c) => {
                  return t + c
                }, 0)
              additionalDurations[i] = $toReadableTime(dur)
            }
          }
        }
      }
    }
    return {
      rapid,
      items,
      additionalItems,
      additionalDurations,
      duration,
      readableDuration,
    }
  },
}
</script>

<style lang="scss">
@import 'node_modules/nhsuk-frontend/packages/components/inset-text/inset-text';
@import 'node_modules/nhsuk-frontend/packages/components/back-link/back-link';
@import 'node_modules/nhsuk-frontend/packages/components/tag/tag';

@media print {
  html,
  body {
    background: none;
  }

  #maincontent.nhsuk-main-wrapper {
    padding-top: 24px;
  }

  ul.ltlc-staff {
    display: none;
  }

  .nhsuk-back-link {
    display: none;
  }

  h1.nhsuk-heading-m {
    font-size: 1rem;
  }

  h2.nhsuk-heading-xl {
    font-size: 2rem;
    margin-bottom: 24px;
  }

  .nhsuk-inset-text {
    margin-top: 12px;
    margin-bottom: 24px;
    padding: 12px;
  }

  p,
  li {
    font-size: 12pt;
  }

  h3 {
    font-size: 14pt;
    margin-bottom: 12px;
  }

  h3.nhsuk-heading-l {
    font-size: 16pt;
  }

  .nhsuk-u-font-size-24 {
    font-size: 14pt !important;
  }

  .nhsuk-card-group {
    display: block;
    float: none;
  }

  .nhsuk-card-group__item {
    break-after: always;
    page-break-after: always;
    -webkit-column-break-after: always;
    page-break-inside: avoid;
    display: block;
    float: none;
  }

  .nhsuk-card {
    border: 0;
    border-bottom: 1px solid $color_nhsuk-grey-5;
    margin-bottom: 16px;
    background: none;

    &.starred {
      border: 0;
      border-bottom: 1px solid $color_nhsuk-grey-5;
    }
  }

  .nhsuk-card__content {
    padding-top: 0 !important;
    padding-left: 0 !important;
    padding-right: 0 !important;
    padding-bottom: 8px !important;

    h3.nhsuk-card__heading.nhsuk-heading-s {
      font-size: 14pt;

      a {
        text-decoration: none;

        &::after {
          font-size: 12pt;
        }
      }
    }

    .nhsuk-card__content-frame {
      p {
        font-size: 11pt;
      }
    }

    p.ltlc-attribution {
      font-size: 10pt !important;
    }

    dl.ltlc-resource-details {
      margin-right: 0;

      div,
      dt,
      dd {
        font-size: 10pt;
      }
    }
  }

  .resource__starred {
    display: none;
  }

  hr {
    display: none;
  }

  .email-contact,
  .install-instructions,
  .programme-list {
    display: none;
  }
}
</style>
