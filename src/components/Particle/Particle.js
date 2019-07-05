import React, {memo} from 'react'
import {Leaf1} from '../../svg/leaves'
import PropTypes from 'prop-types'

const Particle = ({color='black', height='100', image=Leaf1}) => {
  const style = {
    fill: color,
    height: `${height}px`,
    index: 1,
  }
  const Image = image
  return <Image style={style} />
}

Particle.propTypes = {
  color: PropTypes.string,
  height: PropTypes.number,
  image: PropTypes.object
} 

export default memo(Particle)