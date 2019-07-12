import Particle from '../Particle/Particle'
import ParticleFactoryFactory from '../ParticleFactories/ParticleFactoryFactory'
import PropTypes from 'prop-types'
import React from 'react'
import { styler } from 'popmotion'

// ParticleEngine is responsible for using Particle Factories to generate
// particles based on prop types, and controlling the playback of particle
// animations
class ParticleEngine extends React.Component {
  constructor(props) {
    super(props)
    this.state = { particleArray: [] }
  }

  componentDidMount() {
    const {
      maxParticles = 500,
      width = 400,
      xOffset = 0,
      height = 400,
      yOffset = -100,
      intensity,
      volume
    } = this.props
    const viewerSettings = {
      height: height,
      width: width,
      xOffset: xOffset,
      yOffset: yOffset
    }
    const particleFactoryFactory = new ParticleFactoryFactory()
    var myFunction = () => {
      const { volume, intensity, particleType, paused = false } = this.props
      const particleFactory = particleFactoryFactory.getParticleFactory(particleType, viewerSettings)
      let particleArray = this.state.particleArray || []
      // only generate new particles when the window is in focus and the animation is not paused
      if (!paused && particleArray.length < maxParticles && !document.hidden) {
        const newParticle = particleFactory.generateParticle({ intensity })
        // creating a react reference for the particle so that the animations
        // have something to manipulate
        newParticle.ref = React.createRef()
        newParticle.animationStarted = false
        particleArray.push(newParticle)
      }
      particleArray.forEach((particle) => {
        if (particle.ref.current && !particle.animationStarted) {
          particle.animationStarted = true
          particle.animation = particle.animation.start({
            update: styler(particle.ref.current).set,
            complete: () => particleArray.splice(particleArray.indexOf(particle), 1),
          })
        }
      }, particleArray)
      this.setState({ particleArray: particleArray })
      //in order to dynamically change how quickly particles appear, we need
      //to have a nested timer in the callback function
      const time = Math.floor(((intensity + 1) / volume) * 300)
      this.timer = setTimeout(myFunction, time)
    }
    this.timer = setTimeout(myFunction, Math.floor(((intensity + 1) / volume) * 300))
  }

  componentWillUnmount() {
    // remove timer when component unmounts!
    if (this.timer)
      clearTimeout(this.timer)
  }

  componentDidUpdate(prevProps) {
    const { particleArray = [] } = this.state
    const { paused, particleType } = this.props
    //if particle type changes, remove all the previous particles
    if (particleType !== prevProps.particleType) {
      this.setState({ particleArray: [] })
    }
    particleArray.forEach((particle) => {
      if (particle.animationStarted) {
        if (paused)
          particle.animation.pause()
        else if (paused !== prevProps.paused)
          particle.animation.resume()
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
            style={{ position: 'absolute', y: v.y, x: v.x, opacity: 0 }}
            ref={v.ref}>

            <Particle
              particleType={particleType}
              color={v.color}
              height={v.height}
              image={v.image}
            />
          </div>
        )
        : null)

  }
}

ParticleEngine.propTypes = {
  particleType: PropTypes.string.isRequired,
  paused: PropTypes.bool,
  volume: PropTypes.number,
  width: PropTypes.number,
  xOffset: PropTypes.number,
  intensity: PropTypes.number,
  height: PropTypes.number,
  yOffset: PropTypes.number,
  maxParticles: PropTypes.number
}

export default ParticleEngine