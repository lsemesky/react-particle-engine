import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { leafImageArray } from '../../svg/leaves'

const Particle = ({ color = 'black', height = '100', image = leafImageArray[0] }) => {
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
  image: PropTypes.func
}

export default memo(Particle)