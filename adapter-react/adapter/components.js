import { createElement } from 'react'

const c = name => props => createElement(name, props)
export const Container = c('container')
export const Text = c('text')
export const Sprite = c('sprite')
