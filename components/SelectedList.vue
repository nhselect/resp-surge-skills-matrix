<template>
  <details
    class="nhsuk-details nhsuk-expander selectedList"
    :open="editingList"
  >
    <summary class="nhsuk-details__summary">
      <span class="nhsuk-details__summary-text">
        <strong v-if="viewList">Edit this list</strong>
        <strong v-else>Create a shareable list</strong>
        ({{ selected.length }} resources)
      </span>
    </summary>
    <div class="nhsuk-details__text selectedList">
      <div v-if="selected.length > 0 && !viewList" class="nhsuk-form-group">
        <label class="nhsuk-label" for="share-title"> Name your list: </label>
        <input
          id="share-title"
          v-model="shareTitleField"
          class="nhsuk-input"
          name="share-title"
          type="text"
        />
      </div>
      <ul v-if="selected.length > 0" class="nhsuk-list">
        <li
          v-for="(item, index) in selected"
          :key="item.id"
          role="row"
          class="selectedList-item"
        >
          <div class="selectedList-item__title">
            {{ item.title }}
            <span class="nhsuk-tag nhsuk-tag--grey">
              {{ item.format
              }}{{ item.duration ? ' - ' + item.duration + ' min' : '' }}
            </span>
          </div>
          <span v-if="!viewList" class="selectedList-item__buttons">
            <button
              v-if="index > 0"
              class="nhsuk-button nhsuk-button--secondary"
              @click="moveUp(item)"
            >
              <FontAwesome icon="arrow-up" />
            </button>
            <button
              v-if="index < selected.length - 1"
              class="nhsuk-button nhsuk-button--secondary"
              @click="moveDown(item)"
            >
              <FontAwesome icon="arrow-down" />
            </button>
            <button
              class="nhsuk-button nhsuk-button--delete"
              @click="removeItem(item)"
            >
              <FontAwesome icon="trash-alt" />
            </button>
          </span>
        </li>
      </ul>
      <div v-if="selected.length > 0" class="selectedList__actions">
        <div class="selectedList__buttons">
          <button
            class="nhsuk-button nhsuk-button--primary"
            @click="shareList()"
          >
            <FontAwesome icon="share-alt" /> Share
          </button>
          <button
            v-if="selected.length > 0"
            class="nhsuk-button nhsuk-button--secondary"
            @click="ToggleList()"
          >
            <FontAwesome v-if="viewList" icon="pencil-alt" />
            <FontAwesome v-if="!viewList" icon="eye" />
            {{ viewList ? 'Edit' : 'Preview' }}
          </button>
          <button
            class="nhsuk-button nhsuk-button--delete"
            @click="clearList()"
          >
            <FontAwesome icon="trash-alt" /> Clear
          </button>
        </div>
      </div>
      <div v-else>
        <p>
          You don't have any resources selected yet. To start building a
          shareable list:
        </p>
        <ol>
          <li>
            use the filters on the left to find resources from our programme
          </li>
          <li>
            select the <strong>Add item to list</strong> checkbox on each
            resource you'd like to add
          </li>
          <li>
            come back here, where you can adjust the order of the resources in
            the list, and then get a shareable link and printable QR code.
          </li>
        </ol>
      </div>
    </div>
  </details>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'nuxt-property-decorator'
import { library, config } from '@fortawesome/fontawesome-svg-core'
import {
  faArrowUp,
  faArrowDown,
  faTrashAlt,
  faEye,
  faPencilAlt,
  faShareAlt,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { IResource } from '~/interfaces'

config.autoAddCss = false

library.add(faArrowUp, faArrowDown, faTrashAlt, faEye, faPencilAlt, faShareAlt)

Vue.component('FontAwesome', FontAwesomeIcon)

@Component
export default class SelectedList extends Vue {
  @Prop({ required: true }) readonly selected!: IResource[]
  @Prop({ required: true }) readonly viewList!: boolean
  @Prop({ required: true }) readonly editingList!: boolean
  @Prop({ required: true }) readonly shareTitle!: string

  shareTitleField = ''

  removeItem(item: IResource) {
    this.$emit('update:editing-list', true)
    const newList = this.selected.filter((i) => {
      return i !== item
    })
    this.$emit('update:selected', newList)
  }

  moveUp(item: IResource) {
    const i = this.selected.indexOf(item)
    this.moveItem(i, i - 1)
  }

  moveDown(item: IResource) {
    const i = this.selected.indexOf(item)
    this.moveItem(i, i + 1)
  }

  moveItem(oldIndex: number, newIndex: number) {
    this.$emit('update:editing-list', true)
    const arr = this.selected

    if (newIndex < arr.length && newIndex >= 0) {
      const newArray = arr.splice(newIndex, 0, arr.splice(oldIndex, 1)[0])
      this.$emit('update:selected', newArray)
    }
  }

  @Watch('shareTitleField')
  onShareTitleChanged() {
    this.$emit('update:share-title', this.shareTitleField)
  }

  @Watch('shareTitle')
  onShareTitleChanged2() {
    this.shareTitleField = this.shareTitle
  }

  clearList() {
    this.$emit('update:editing-list', false)
    this.$emit('update:view-list', false)
    this.$emit('update:selected', [])
  }

  shareList() {
    this.$emit('update:editing-list', false)
    this.$emit('update:is-sharing-filter', false)
    this.$emit('update:share-modal', true)
  }

  ToggleList() {
    this.$emit('update:editing-list', false)
    this.$emit('update:view-list', !this.viewList)
  }
}
</script>

<style lang="scss">
@import 'node_modules/nhsuk-frontend/packages/components/details/details';
@import 'node_modules/nhsuk-frontend/packages/components/button/button';
@import 'node_modules/nhsuk-frontend/packages/components/summary-list/summary-list';

.selectedList {
  &-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid $color_nhsuk-grey-4;
    font-size: 0.8em;
    padding-bottom: 8px;

    &__title {
      .nhsuk-tag {
        font-size: 0.7em;
      }
    }

    &__buttons {
      flex-shrink: 0;
      margin-left: 10px;

      button.nhsuk-button {
        font-size: 16px;
        padding: 6px 6px;
        margin-bottom: 10px;
      }
    }
  }

  &__buttons {
    display: flex;
    justify-content: right;
    align-items: center;
    align-content: center;

    button.nhsuk-button {
      font-size: 0.8em;
      padding: 8px 12px;
      margin-left: 0;
      margin-bottom: 0 !important;
      margin-right: 8px;
    }

    a {
      color: $color_nhsuk-red;
      display: block;
      font-size: 0.8em;
      font-weight: $nhsuk-font-bold;
    }
  }

  .nhsuk-button--delete {
    background-color: $color_nhsuk-red;

    &:hover {
      background-color: darken($color_nhsuk-red, 10%);
    }
  }
}
</style>
