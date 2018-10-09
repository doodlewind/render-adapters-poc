import Vue from 'vue/dist/vue.js'
import PixiRenderer from './renderer'
import PixiText from './text'
import Container from './container'

const template = (`
  <div id="app">
  <pixi-renderer>
    <container @tick="tickInfo" @pointerdown="scaleObject">
      <pixi-text :x="10" :y="10" content="hello world"/>
    </container>
  </pixi-renderer>
  </div>
`)

void new Vue({
  el: '#app',
  template,
  components: {
    PixiRenderer,
    PixiText,
    Container
  },
  methods: {
    scaleObject (container) {
      container.scale.x *= 0.75
      container.scale.y *= 0.75
    },

    tickInfo (container, delta) {
      // console.log(`Tick delta: ${delta}`)
    }
  }
})
