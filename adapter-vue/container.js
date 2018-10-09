export default {
  inject: ['EventBus', 'PIXIWrapper'],
  props: ['x', 'y'],

  data () {
    return {
      container: null
    }
  },

  render (h) {
    return h('template', this.$slots.default)
  },

  created () {
    this.container = new this.PIXIWrapper.PIXI.Container()
    this.container.interactive = true

    this.container.on('pointerdown', () => {
      this.$emit('pointerdown', this.container)
    })

    this.EventBus.$on('ready', () => {
      if (this.$parent.container) {
        this.$parent.container.addChild(this.container)
      } else {
        this.PIXIWrapper.PIXIApp.stage.addChild(this.container)
      }

      this.PIXIWrapper.PIXIApp.ticker.add(delta => {
        this.$emit('tick', this.container, delta)
      })
    })
  }
}
