import Particle from './Particle'
import React from 'react'
import { shallow } from 'enzyme'

it('renders without crashing', () => {
  shallow(<Particle />)
})

it('changes the svg style based on the height property', () => {
  let customHeight = 23
  let wrapper = shallow(<Particle height={customHeight} />)
  expect(wrapper.props().style.height).toBe(customHeight + 'px')

  customHeight = 99
  wrapper = shallow(<Particle height={customHeight} />)
  expect(wrapper.props().style.height).toBe(customHeight + 'px')
})

it('changes the svg fill style based on the color property', () => {
  let customColor = 'RebeccaPurple'
  let wrapper = shallow(<Particle color={customColor} />)
  expect(wrapper.props().style.fill).toBe(customColor)

  customColor = '#123456'
  wrapper = shallow(<Particle color={customColor} />)
  expect(wrapper.props().style.fill).toBe(customColor)
})
