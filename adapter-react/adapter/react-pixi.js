
import { Renderer } from './renderer'
export * from './components'

let container

export const ReactPixi = {
  render (element, pixiContainer) {
    if (!container) {
      container = Renderer.createContainer(pixiContainer)
    }

    Renderer.updateContainer(element, container, null)
  }
}
