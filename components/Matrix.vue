<template>
  <div class="nhsuk-grid-row">
    <div
      v-if="resources.length > 0"
      class="nhsuk-grid-column-one-third ltlc-picker"
    >
      <Picker
        id="picker"
        :resources="resources"
        :filter.sync="indexFilter"
        :viewing-list.sync="viewingList"
        :share-modal.sync="shareModal"
        :is-sharing-filter.sync="isSharingFilter"
        @changeModel="links = $event"
        @changeFilterDescription="filterDescription = $event"
        @clear="links = resources"
        @clearFilters="clearFilters"
      />
    </div>
    <div class="nhsuk-grid-column-two-thirds">
      <SelectedList
        :selected.sync="selected"
        :view-list.sync="viewingList"
        :share-modal.sync="shareModal"
        :share-title.sync="shareTitle"
        :is-sharing-filter.sync="isSharingFilter"
        :editing-list.sync="editingList"
        :resources="resources"
      />
      <div id="resources" class="ltlc-resources">
        <div class="">
          <h2 v-if="viewingList" class="nhsuk-heading-xl">
            <span v-if="shareTitle" class="nhsuk-caption-xl">
              Shared List
            </span>
            {{ shareTitle ? shareTitle : 'Shared List' }}
          </h2>
          <h2 v-else>Resources</h2>
          <p v-if="viewingList">
            This is a list of <strong>{{ selected.length }}</strong> selected
            resources.
          </p>
          <p v-else-if="links.length == resources.length">
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
          <Resources
            :links="viewingList ? selected : links"
            :selected.sync="selected"
            :is-list="viewingList"
          />
        </div>
      </div>
    </div>
    <ShareModal
      v-if="shareModal"
      :key="shareUrl"
      :share-url="shareUrl"
      :share-title="shareTitle"
      :is-sharing-filter="isSharingFilter"
      :share-modal.sync="shareModal"
    />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'nuxt-property-decorator'
import Picker from '@/components/Picker.vue'
import Resources from '@/components/Resources.vue'
import SelectedList from '@/components/SelectedList.vue'
import ShareModal from '~/components/ShareModal.vue'
import { IResource, IObjective, IFilter } from '~/interfaces'

@Component({
  components: { Picker, Resources, SelectedList, ShareModal },
})
export default class Matrix extends Vue {
  resources: IResource[] = []
  objectives: IObjective[] = []
  links: IResource[] = []
  selected: IResource[] = []
  selectedItems: IResource[] = []
  indexFilter: IFilter = {
    text: '',
    duration: 0,
    formats: [],
    caresetting: '',
    staff: '',
  }

  // default cleared filter values
  readonly clearFilter: IFilter = {
    text: '',
    duration: 0,
    formats: [],
    caresetting: '',
    staff: '',
  }

  viewingList = false
  editingList = false
  shareUrl = ''
  shareModal = false
  isSharingFilter = false
  indexFilterUrl = ''
  shareTitle = ''

  filterDescription: string = ''

  mounted() {
    let urlFilter = this.$route.query.filter || ''
    let urlList = this.$route.query.list || ''
    const urlTitle = this.$route.query.t || ''

    if (Array.isArray(urlFilter)) {
      urlFilter = urlFilter[0] || ''
    }
    if (Array.isArray(urlList)) {
      urlList = urlList[0] || ''
    }

    if (urlFilter !== '') {
      const filter = this.decodeString(urlFilter)

      try {
        const filterObject = JSON.parse(filter) as IFilter
        this.indexFilter = filterObject
      } catch (e) {
        this.clearFilters()
      }
    } else if (urlList !== '') {
      const listString = this.decodeString(urlList)
      const listIdArray = listString.split('|')
      if (listIdArray.length > 0) {
        const resources = listIdArray.map((i) => {
          const resource = this.resources.filter((r) => {
            return r.id === parseInt(i)
          })
          return resource[0]
        })

        if (urlTitle.length > 0) {
          const title = this.decodeString(urlTitle.toString())
          this.shareTitle = title
        }

        this.selected = resources
        this.viewingList = true
        this.editingList = false
      }
    }
  }

  clearFilters() {
    this.indexFilter = Object.assign(this.indexFilter, this.clearFilter)
  }

  async fetch(): Promise<void> {
    const resources = (await this.$content('resources').fetch()) as any
    if (Array.isArray(resources)) {
      this.resources = resources
    } else {
      this.resources = resources.items
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
      .sort((a, b) => {
        return (
          Date.parse(b.upload_date.toString()) -
          Date.parse(a.upload_date.toString())
        )
      })

    this.links = this.resources
  }

  @Watch('selected')
  onSelectedChanged() {
    this.selectedItems = this.selected
    if (this.selected.length === 0) {
      this.viewingList = false
    }
  }

  @Watch('shareModal')
  onShareChanged() {
    this.shareUrl = this.setShareUrl()
  }

  setShareUrl() {
    const type = this.isSharingFilter ? 'filter' : 'list'
    let string
    if (type === 'filter') {
      string = this.setFilterUrl(this.indexFilter)
    } else {
      string = this.setListUrl()
    }
    const url = window.location.href.split('?')[0]
    return url + string
  }

  // encode the filter object in URL safe base64
  encodeString(rawString: string) {
    const filterStringEncoded = Buffer.from(rawString).toString('base64')
    return filterStringEncoded
  }

  // decode filter from URL param
  decodeString(encodedString: string) {
    const filterStringDecoded = Buffer.from(encodedString, 'base64').toString(
      'utf-8'
    )
    return filterStringDecoded
  }

  setListUrl() {
    if (this.selected.length > 0) {
      const listString = this.selected
        .map((s) => {
          return s.id
        })
        .join('|')
      const encodedListString = this.encodeString(listString)
      const title = this.shareTitle
        ? '&t=' + this.encodeString(this.shareTitle.trim())
        : ''
      return '?list=' + encodedListString.toString() + title.toString()
    }
    return ''
  }

  // add filter to the url
  setFilterUrl(filter: IFilter) {
    if (JSON.stringify(filter) !== JSON.stringify(this.clearFilter)) {
      const encodedFilter = this.encodeString(JSON.stringify(filter))
      return '?filter=' + encodedFilter
    }
    return ''
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
  z-index: 999;
  background-color: $color_nhsuk-grey-5;
  padding-top: 20px;
}
</style>
