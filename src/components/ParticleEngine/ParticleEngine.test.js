import ParticleEngine from './ParticleEngine'
import React from 'react'
import { mount } from 'enzyme'


beforeEach(() => {
  jest.useFakeTimers()
})

it('does not create new particles when paused', () => {
  let wrapper = mount(<ParticleEngine intensity={10} volume={1} particleType="DEFAULT" paused={true} />)
  expect(wrapper.state().particleArray).toHaveLength(0)
  jest.runOnlyPendingTimers()
  expect(wrapper.state().particleArray).toHaveLength(0)
  jest.runOnlyPendingTimers()
  expect(wrapper.state().particleArray).toHaveLength(0)
  wrapper.update()
})

it('creates new particles when unpaused', () => {
  let wrapper = mount(<ParticleEngine intensity={10} volume={1} particleType="DEFAULT" paused={true} />)
  expect(wrapper.state().particleArray).toHaveLength(0)
  jest.runOnlyPendingTimers()
  expect(wrapper.state().particleArray).toHaveLength(0)
  jest.runOnlyPendingTimers()
  expect(wrapper.state().particleArray).toHaveLength(0)
  wrapper.setProps({ paused: false })
  jest.runOnlyPendingTimers()
  expect(wrapper.state().particleArray).toHaveLength(1)
})

it('creates a new particle on each timer update', () => {
  let wrapper = mount(<ParticleEngine intensity={10} volume={1} particleType="DEFAULT" paused={false} />)
  for (let i = 0; i < 5; i++) {
    expect(wrapper.state().particleArray).toHaveLength(i)
    jest.runOnlyPendingTimers()
  }
})