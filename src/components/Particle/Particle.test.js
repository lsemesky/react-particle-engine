import Particle from './Particle'
import React from 'react'
import { leafImageArray } from '../../svg/leaves'
import { shallow } from 'enzyme'

const image = leafImageArray[0]
it('renders without crashing', () => {
  shallow(<Particle image={image} />)
})

it('changes the svg style based on the height property', () => {
  let customHeight = 23
  let wrapper = shallow(<Particle height={customHeight} image={image} />)
  expect(wrapper.props().style.height).toBe(customHeight)

  customHeight = 99
  wrapper = shallow(<Particle height={customHeight} image={image} />)
  expect(wrapper.props().style.height).toBe(customHeight)
})

it('changes the svg fill style based on the color property', () => {
  let customColor = 'RebeccaPurple'
  let wrapper = shallow(<Particle color={customColor} image={image} />)
  expect(wrapper.props().style.fill).toBe(customColor)

  customColor = '#123456'
  wrapper = shallow(<Particle color={customColor} image={image} />)
  expect(wrapper.props().style.fill).toBe(customColor)
})
