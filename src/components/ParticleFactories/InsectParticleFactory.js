import { calc, easing } from 'popmotion'
import ParticleFactory from './ParticleFactory'
import { generateRandomNumberInRange } from '../../utils/randomUtils'
import { insectImageArray } from '../../svg/insects'

const colorList = ['Black', '#261d1d', '#330505', '#302828']
const imageList = insectImageArray
const particleRangeSettings = {
  heightRange: { min: 10, max: 50 },
  colorList: colorList,
  easing: easing.easeIn,
  imageList: imageList,
  opacityRange: { min: 1, max: 1 },
  originRangeX: { min: 0, max: 0 },
  originRangeY: { min: 0, max: 0 },
  particleType: 'insect',
  rotationRange: { min: 0, max: 0 },
  rotationRangeY: { min: 0, max: 45 },
  flip: 0
}

/**
 * A Particle Factory that will generate insect particles
 * @class InsectParticleFactory
 * @extends {ParticleFactory}
 *
*/
class InsectParticleFactory extends ParticleFactory {
  constructor(viewerSettings) {
    super(viewerSettings, particleRangeSettings)
  }

  /**
   * Generates a new insect particle based on the particle range settings and 
   * overridden animation property setters
   * @override
   * @param {object} props any additional properties that affect the animation
   * @returns a new insect particle including a popmotion animation object with playback functions
   * @memberof InsectParticleFactory
   */
  generateParticle(props) {
    // set the image in the props for use in animation property getter overrides
    props.image = super.getImage(props)
    // set the frames in the props for use in animation property getter overrides
    props.frames = super.generateAnimationFrames(props)
    const particle = super.generateParticle(props)
    // pass animations through a pipe to compensate for the svgs appearing to face the direction of -90 degrees
    particle.animation = particle.animation.pipe((props) => {
      props.rotate = props.rotate + 90
      return props
    })
    return particle
  }

  /**
   * Generates default animation frames with frames that are only rotation
   * to face the next point in the animation
   * @param {array} { frames }
   * @returns animation keyframes
   * @memberof InsectParticleFactory
   */
  generateAnimationFrames({ frames }) {
    return this.insertRotationFrames(frames)
  }

  /**
   * Calculates the rotation angle for each particle to appear that it is facing
   * the direction of movement, and then inserts additional rotation frames to accomplish this effect 
   *
   * @param {array} frames
   * @returns an array of frames with updated rotations and inserted rotation-only frames
   * @memberof InsectParticleFactory
   */
  insertRotationFrames(frames) {
    // the start frame is always added to the new frame if available
    const newFrames = frames.length ? [frames[0]] : []
    // create a rotation frame after each frame (except the last)
    for (let i = 0; i < frames.length - 1; i++) {
      const currentFrame = frames[i]
      const nextFrame = frames[i + 1]
      // calculate the rotation between the current frame and the next frame
      nextFrame.rotate = calc.angle(
        { x: currentFrame.x, y: currentFrame.y },
        { x: nextFrame.x, y: nextFrame.y }
      )
      // use all props from the current frame and the rotate of the next frame
      const rotationFrame = { ...currentFrame, rotate: nextFrame.rotate }
      // add the new rotation frame, and the frame with the next movement coordinates
      newFrames.push(rotationFrame)
      newFrames.push(nextFrame)
    }
    return newFrames
  }

  /**
   * Generates a start frame at a position on one of the sides of the viewer
   * @override
   * @param {object} props any additional properties that affect the animation
   * @returns
   * @memberof InsectParticleFactory
   */
  generateStartFrame(props) {
    return super.generateStartFrame(props, this.getRandomViewerSide())
  }

  /**
   * Generates an end frame at a position on one of the sides of the viewer
   * @override
   * @param {object} props any additional properties that affect the animation
   * @returns
   * @memberof InsectParticleFactory
   */
  generateEndFrame(props) {
    return super.generateEndFrame(props, this.getRandomViewerSide())
  }

  /**
   * Calculates the total distance moved by the particle across all animation frames
   * @param {array} { frames } the frames in the animation
   * @returns
   * @memberof InsectParticleFactory
   */
  getTotalDistance({ frames }) {
    const accumulatedDistance = frames.reduce(
      (accumulator, frame) => {
        const distance = calc.distance(
          { x: accumulator.previousFrame.x, y: accumulator.previousFrame.y },
          { x: frame.x, y: frame.y }
        )
        // the accumulator holds the distance, but also the previousFrame which is needed to calculate the next distance
        return { distance: accumulator.distance + distance, previousFrame: frame }
      }
      , { distance: 0, previousFrame: frames[0] })
    return accumulatedDistance.distance
  }

  /**
   * Calculates the duration of the animation relative to the total distance, intensity, and area of the viewer settings
   * @override
   * @param {object} props any additional properties that affect the animation
   * @returns the total duration of the animation
   * @memberof InsectParticleFactory
   */
  getDuration(props) {
    return this.getTotalDistance(props) * props.intensity * this.viewerSettings.height * this.viewerSettings.width /
      generateRandomNumberInRange(910000, 900000)
  }

  /**
   * @override
   * @returns the total number of animation frames
   * @memberof InsectParticleFactory
   */
  getNumberOfAnimationFrames() {
    return generateRandomNumberInRange(6, 2)
  }

  /**
   * @override
   * @param {object} {image} the image to use for the particle
   * @returns the image to use for the particle
   * @memberof InsectParticleFactory
   */
  getImage({ image }) {
    return { image }
  }

  /**
   * @override
   * @param {object} { image } the image being used for the current particle
   * @returns an origin point in the horizontal center of the image
   * @memberof InsectParticleFactory
   */
  getOriginX({ image }) {
    return image.width / 2
  }

  /**
   * @override
   * @param {object} { image } the image being used for the current particle
   * @returns an origin point in the vertical center of the image
   * @memberof InsectParticleFactory
   */
  getOriginY({ image }) {
    return image.height / 2
  }

  /**
   * Gets a side of the viewer that can be used by super.generateBoundaryLocation
   * @returns a string representing a random side of the viewer
   * @memberof InsectParticleFactory
   */
  getRandomViewerSide() {
    const sideArray = ['bottom', 'left', 'right', 'top']
    return sideArray[generateRandomNumberInRange(3)]
  }
}

export default InsectParticleFactory