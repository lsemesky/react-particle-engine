import React, { memo } from 'react'
import PropTypes from 'prop-types'

/*
 * Particle is the component that contains the svg image and sets the appropriate style on it
 */
const Particle = ({ color = 'black', height = '100', image }) => {
  const style = {
    fill: color,
    height: height,
    index: 1,
  }
  const Image = image
  return <Image style={style} />
}

Particle.propTypes = {
  color: PropTypes.string,
  height: PropTypes.number,
  image: PropTypes.func.isRequired
}

export default memo(Particle)