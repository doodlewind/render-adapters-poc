import React, { Component } from 'react'
import { Container, Text } from '../adapter/react-pixi'

export class App extends Component {
  componentDidMount () {
    this.props.app.render()
  }

  render () {
    return (
      <Container>
        <Text text='hello world' style={{ fill: 0xFF0000 }} x={10} y={10} />
      </Container>
    )
  }
}
