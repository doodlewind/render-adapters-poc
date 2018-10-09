import * as PIXI from 'pixi.js'
import ReactFiberReconciler from 'react-reconciler'

import { createElement } from './elements'
import {
  prepPropChanges,

  applyPayload
} from './props'

const rootHostContext = {}
const childHostContext = {}

const appendChild = (parentInstance, child) => {
  // console.log('adding child', child.constructor.name)
  if (parentInstance.children.indexOf(child) !== -1) {
    parentInstance.removeChild(child)
  }
  parentInstance.addChild(child)
}

const removeChild = (parentInstance, child) => {
  // console.log('removing child', child.constructor.name)
  parentInstance.removeChild(child)
}

const insertBefore = (parentInstance, child, beforeChild) => {
  // console.log('swapping child', parentInstance.constructor.name, child.constructor.name)

  if (child !== beforeChild) {
    const index = parentInstance.children.indexOf(child)
    if (index !== -1) {
      parentInstance.children.splice(index, 1)
    }
    const beforeIndex = parentInstance.children.indexOf(beforeChild)
    parentInstance.children.splice(beforeIndex, 0, child)
  }
}

export const Renderer = ReactFiberReconciler({
  createInstance (
    type,
    props,
    rootContainerInstance,
    hostContext,
    internalInstanceHandle
  ) {
    const instance = createElement(type, props, rootContainerInstance)
    return instance
  },

  now: Date.now,

  // Parent/Child Tree Updates
  appendInitialChild: (parentInstance, child) => {
    parentInstance.addChild(child)
  },
  appendChild: appendChild,
  appendChildToContainer: appendChild,
  insertBefore: insertBefore,
  insertInContainerBefore: insertBefore,
  removeChild: removeChild,
  removeChildFromContainer: removeChild,

  finalizeInitialChildren (testElement, type, props, rootContainerInstance) {
    // Give certain children last-minute updates (e.g. to auto-focus)
    return false
  },

  // TODO better prop change diff handler
  prepareUpdate: prepPropChanges,

  commitUpdate (instance, updatePayload, type, oldProps, newProps, rootContainerInstance, internalInstanceHandle) {
    applyPayload(type)(instance)(updatePayload)
  },

  commitMount () {
    console.log('commit mount')
  },

  shouldDeprioritizeSubtree () {
    return false
  },

  prepareForCommit () {},

  resetAfterCommit () {},

  shouldSetTextContent (props) {
    return (
      typeof props.children === 'string' || typeof props.children === 'number'
    )
  },

  resetTextContent (instance) {
    instance.text = ''
  },

  createTextInstance (text, rootContainerInstance, hostContext, internalInstanceHandle) {
    return new PIXI.Text(text)
  },

  commitTextUpdate (textInstance, oldText, newText) {
    textInstance.text = newText
  },

  getPublicInstance (inst) {
    return inst
  },

  // Handle low-priority work
  scheduleDeferredCallback (fn) {
    if (window.requestIdleCallback) {
      (window.requestIdleCallback(fn))
    } else {
      // not a great polyfill
      setTimeout(fn, 0, { timeRemaining: Infinity })
    }
  },

  getRootHostContext (rootContainerInstance) {
    return rootHostContext
  },

  getChildHostContext (parentHostContext) {
    return childHostContext
  },

  supportsMutation: true,
  // TODO
  // useSyncScheduling: true
})
