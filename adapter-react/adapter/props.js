const TRANSFORM_KEYS = ['x', 'y', 'width', 'height', 'rotation']

const TYPE_KEYS = {
  container: [].concat(TRANSFORM_KEYS),
  text: ['text', 'style'].concat(TRANSFORM_KEYS),
  sprite: ['texture'].concat(TRANSFORM_KEYS)
}

export const filterPropKey = (type) => (key) => {
  return TYPE_KEYS[type].indexOf(key) !== -1
}

export const prepPropChanges = (testElement, type, oldProps, newProps, hostContext) => {
  // console.log(newProps)
  const keyFilter = filterPropKey(type)

  const keysToChange = Object.keys(newProps).filter(keyFilter)

  if (keysToChange.length) {
    const retObj = {}
    keysToChange.forEach(key => {
      retObj[key] = newProps[key]
    })
    return retObj
  }

  return false
}

export const applyPayload = type => instance => payload => {
  Object.keys(payload).forEach(key => {
    instance[key] = payload[key]
  })
}
