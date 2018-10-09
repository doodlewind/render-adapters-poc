import * as PIXI from 'pixi.js'
import React from 'react'
import { ReactPixi } from './adapter/react-pixi'
import { App } from './components'

const pixiApp = new PIXI.Application({
  width: 640,
  height: 480,
  backgroundColor: 0x2a2a2a,
  view: document.getElementById('canvas'),
  autoStart: false
})

ReactPixi.render(<App app={pixiApp} />, pixiApp.stage)
