
import {
  getParticleFlip,
  getRandomColor,
  getRandomHeight,
  getRandomImage,
  getRandomRotation,
  getRandomYRotation,
  getXEndPosition,
  getXStartPosition,
  getYEndPosition,
  getYStartPosition,
} from '../../utils/particleUtils'
import { styler, tween } from 'popmotion'
import Particle from '../Particle/Particle'
import PropTypes from 'prop-types'
import React from 'react'


class ParticleEngine extends React.Component {
  constructor(props) {
    super(props)
    this.state = { particleArray: [], isVisible: true }
  }

  componentDidMount() {

    const me = this

    var myFunction = function() {
      const {volume, width, widthOffset = 0, intensity, particleType, paused = false, height=500, heightOffset=100 } = me.props

      let particleArray= me.state.particleArray || []
      const startX = getXStartPosition(particleType, width, widthOffset)
      const endX = getXEndPosition(particleType, startX, width, widthOffset) 
      const startY = getYStartPosition(particleType, height, heightOffset)
      const endY = getYEndPosition(particleType, startY, height, heightOffset)
      if (!paused) {
        const newParticle = {
          x: startX,
          key: `particle-${Math.random()}-${Math.random()}`,
          color: getRandomColor(particleType),
          height: getRandomHeight(particleType),
          image: getRandomImage(particleType),
          ref: React.createRef(),
          tween: null
        }
        particleArray.push(newParticle)
      }
      particleArray.forEach((particle, index) => {
        if (particle.ref.current && !particle.tween) {
          particleArray[index].tween = 
            tween({
              from: {
                x: startX,
                y: startY,
                rotate: 0,
                rotateY: 0,
                // originX: 20-generateRandomNumberInRange(intensity),
                // originY: 20-generateRandomNumberInRange(intensity),
                opacity: 1,
              },
              to: {
                x: endX,
                y: endY,
                rotate: getRandomRotation(particleType, intensity),
                rotateY: getRandomYRotation(particleType, intensity),
                // originX: 20-generateRandomNumberInRange(intensity),
                // originY: 20-generateRandomNumberInRange(intensity),
                opacity: 1,
              },
              duration: height * intensity * 3,
              flip: getParticleFlip(particleType)

            }

            )
              .while(v => v.y < height)
              .start({
                update: styler(particle.ref.current).set,
                complete: ()=>particleArray.splice(particleArray.indexOf(particle),1),
              })
        }
      }, particleArray) 

      me.setState({particleArray: particleArray})
      const timer = Math.floor(((intensity +1)/volume)*200)
      me.timer = setTimeout(myFunction, timer)
    }
    this.timer = setTimeout(myFunction, Math.floor(((me.props.intensity +1)/me.props.volume)*200))
  }

  componentWillUnmount() {
    if(this.timer)
      clearTimeout(this.timer)
  }

  componentDidUpdate() {
    const {particleArray = []} = this.state
    const {paused} = this.props
    particleArray.forEach((particle) => {
      if(particle.tween) {
        if (paused)
          particle.tween.pause()
        else
          particle.tween.resume()
      }
    })
  }

  render() {
    const { particleType } = this.props
    const { particleArray } = this.state
    return particleArray.map((v) =>
      v ? 
        (
          <div 
            key={v.key}
            style={{position: 'absolute', y: -50, x: v.x, opacity: 0}} 
            ref={v.ref}>

            <Particle
            
              particleType={particleType}
              color={v.color}
              height={v.height}
              image={v.image}
            />
          </div>
        ) 
        : null )

  }
}

ParticleEngine.propTypes = {
  particleType: PropTypes.string.isRequired,
  paused: PropTypes.bool,
  volume: PropTypes.number,
  width: PropTypes.number,
  widthOffset:PropTypes.number,
  intensity: PropTypes.number,
  height: PropTypes.number,
  heightOffset: PropTypes.number
}

export default ParticleEngine