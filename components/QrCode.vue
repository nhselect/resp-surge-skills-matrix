<template>
  <div class="printed-qr-code">
    <QrcodeVue
      :value="shareUrl"
      size="100"
      render-as="canvas"
      class="nhsuk-image__img"
    />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import QrcodeVue from 'qrcode.vue'

Vue.component('QrcodeVue', QrcodeVue)

@Component
export default class QrCode extends Vue {
  @Prop({ required: true }) readonly shareUrl!: string
}
</script>

<style lang="scss">
@import 'node_modules/nhsuk-frontend/packages/components/images/images';

.printed-qr-code {
  display: none;
}

@media print {
  .printed-qr-code {
    padding-left: 12px;
    display: block;
  }
}
</style>
