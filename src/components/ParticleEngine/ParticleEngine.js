import Particle from '../Particle/Particle'
import ParticleFactoryFactory from '../ParticleFactories/ParticleFactoryFactory'
import PropTypes from 'prop-types'
import React from 'react'
import { styler } from 'popmotion'

/**
 * ParticleEngine is responsible for using Particle Factories to generate
 * particles based on react props passed in, and controlling the playback
 * of particle animations
 *
 * @class ParticleEngine
 * @extends {React.Component}
 */
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
      yOffset = 0,
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
    // add new particles in proportion to the intensity and volume properties
    var animationLoopFunction = () => {
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
        // make sure the ref is valid because sometimes a race condition can occur
        if (particle.ref.current && !particle.animationStarted) {
          particle.animationStarted = true
          // use the popmotion to start the animation 
          particle.animation = particle.animation.start({
            update: styler(particle.ref.current).set,
            // remove the particle once it's done with its animation
            complete: () => particleArray.splice(particleArray.indexOf(particle), 1),
          })
        }
      }, particleArray)
      this.setState({ particleArray: particleArray })
      // in order to dynamically change how quickly particles appear, we need
      // to have a nested timer in the callback function
      const time = Math.floor(((intensity + 1) / volume) * 300)
      this.timer = setTimeout(animationLoopFunction, time)
    }
    this.timer = setTimeout(animationLoopFunction, Math.floor(((intensity + 1) / volume) * 300))
  }

  componentWillUnmount() {
    // remove timer when component unmounts!
    if (this.timer)
      clearTimeout(this.timer)
  }

  componentDidUpdate(prevProps) {
    const { particleArray = [] } = this.state
    const { paused, particleType } = this.props
    // if particle type changes, remove all the previous particles
    if (particleType !== prevProps.particleType) {
      this.setState({ particleArray: [] })
    }
    particleArray.forEach((particle) => {
      // for particles that have had their animation started, pause or resume as appropriate
      if (particle.animationStarted) {
        if (paused)
          particle.animation.pause()
        else
          particle.animation.resume()
      }
    })
  }

  render() {
    const { particleArray } = this.state
    // create elements for each particle in the particle array
    return particleArray.map((particle) =>
      particle ?
        (
          <div
            key={particle.key}
            style={{ position: 'absolute', opacity: 0 }}
            ref={particle.ref}>

            <Particle
              color={particle.color}
              height={particle.height}
              image={particle.image}
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