export default {
  inject: ['EventBus', 'PIXIWrapper'],
  props: ['x', 'y', 'content'],

  data () {
    return {
      text: null
    }
  },

  render (h) { return h() },

  created () {
    this.text = new this.PIXIWrapper.PIXI.Text(this.content, { fill: 0xFF0000 })
    this.text.x = this.x
    this.text.y = this.y

    this.text.on('pointerdown', () => this.$emit('pointerdown', this.text))

    this.EventBus.$on('ready', () => {
      if (this.$parent.container) {
        this.$parent.container.addChild(this.text)
      } else {
        this.PIXIWrapper.PIXIApp.stage.addChild(this.text)
      }

      this.PIXIWrapper.PIXIApp.ticker.add(delta => {
        this.$emit('tick', this.text, delta)
      })
    })
  }
}
