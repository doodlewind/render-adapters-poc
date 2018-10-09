
import Vue from 'vue'
import * as PIXI from 'pixi.js'

const template = (`
  <div class="pixi-renderer">
    <canvas ref="renderCanvas"></canvas>
    <slot></slot>
  </div>
`)

export default {
  template,
  data () {
    return {
      PIXIWrapper: {
        PIXI,
        PIXIApp: null
      },
      EventBus: new Vue()
    }
  },
  provide () {
    return {
      PIXIWrapper: this.PIXIWrapper,
      EventBus: this.EventBus
    }
  },

  mounted () {
    const renderCanvas = this.$refs.renderCanvas
    const w = renderCanvas.offsetWidth
    const h = renderCanvas.offsetHeight

    this.PIXIWrapper.PIXIApp = new PIXI.Application(w, h, {
      view: renderCanvas,
      width: 640,
      height: 480,
      backgroundColor: 0x2a2a2a
    })

    this.EventBus.$emit('ready')
  }
}
