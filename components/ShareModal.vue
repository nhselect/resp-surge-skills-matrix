<template>
  <div class="modal-mask">
    <div class="modal-wrapper">
      <div class="nhsuk-card modal-container">
        <div class="nhsuk-card__content">
          <h3 class="nhsuk-card__heading">
            Share your custom {{ sharingType }} with colleagues, or just save it
            for yourself:
          </h3>
          <p>
            <input
              id="shareUrl"
              class="nhsuk-input"
              name="shareable-url"
              type="text"
              :value="shareUrl"
              readonly
              @click="copyUrl"
            />
          </p>
          <figure class="nhsuk-image">
            <QrcodeVue
              :value="shareUrl"
              size="160"
              render-as="canvas"
              class="nhsuk-image__img"
            />
            <figcaption class="nhsuk-image__caption">
              You can save this QR code for printing by right clicking and
              choosing 'Save image as'
            </figcaption>
          </figure>
          <button class="nhsuk-button close-button" @click="closeModal">
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import QrcodeVue from 'qrcode.vue'

Vue.component('QrcodeVue', QrcodeVue)

@Component
export default class ShareModal extends Vue {
  @Prop() readonly shareUrl!: string
  @Prop() readonly isSharingFilter!: boolean

  sharingType = this.isSharingFilter ? 'filter' : 'list'

  closeModal() {
    this.$emit('update:share-modal', false)
  }

  copyToClipboard(text: string) {
    const sampleTextarea = document.createElement('textarea')
    document.body.appendChild(sampleTextarea)
    sampleTextarea.value = text
    sampleTextarea.select()
    document.execCommand('copy')
    document.body.removeChild(sampleTextarea)
  }

  copyUrl() {
    const copyText = this.shareUrl
    this.copyToClipboard(copyText)
  }

  get urlEmail() {
    let string = 'mailto:'
    string =
      '?subject=View my custom ' +
      this.sharingType +
      ' on the CYPMH programme' +
      '&body='
    return string
  }
}
</script>

<style lang="scss">
@import 'node_modules/nhsuk-frontend/packages/components/card/card';
@import 'node_modules/nhsuk-frontend/packages/components/button/button';
@import 'node_modules/nhsuk-frontend/packages/components/images/images';
@import 'node_modules/nhsuk-frontend/packages/components/input/input';

.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;

  .modal-wrapper {
    display: table-cell;
    vertical-align: middle;
  }

  .modal-container {
    width: 50%;
    min-width: 400px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    transition: all 0.3s ease;
    margin: 0 auto;
  }

  figure.nhsuk-image {
    display: flex;
  }

  .close-button {
    position: absolute;
    bottom: 10px;
    right: 10px;
  }
}
</style>
