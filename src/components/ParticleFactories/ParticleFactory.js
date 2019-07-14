import { easing, keyframes } from 'popmotion'
import { generateRandomNumberInRange, getRandomElementFromList } from '../../utils/randomUtils'
import { insectImageArray } from '../../svg/insects'
import { leafImageArray } from '../../svg/leaves'


const defaultParticleRangeSettings = {
  heightRange: { min: 10, max: 20 },
  colorList: ['black'],
  easing: easing.linear,
  imageList: insectImageArray.concat(leafImageArray),
  opacityRange: { min: 1, max: 1 },
  originRangeX: { min: 0, max: 0 },
  originRangeY: { min: 0, max: 0 },
  particleType: 'default',
  rotationRange: { min: 0, max: 0 },
  rotationRangeY: { min: 0, max: 0 },
  flip: 0,
}
/**
 * A Particle Factory that will generate particles based on viewer settings and default 
 * particle range settings
 * call @generateParticle({intensity}) to create a new particle 
 * @class ParticleFactory
 */
class ParticleFactory {
  constructor(viewerSettings, particleRangeSettings) {
    //overwrite any defaults with passed-in values
    this.particleRangeSettings = { ...defaultParticleRangeSettings, ...particleRangeSettings }
    this.viewerSettings = viewerSettings
    this.particleIndex = 0
  }

  /**
   * Generates a new default particle based on the particle range properties and default animation
   * property getters
   * @param {object} props any additional properties that affect the animation
   * @returns a new particle including a popmotion animation object with playback functions
   * @memberof ParticleFactory
   */
  generateParticle(props) {
    const frames = this.generateAnimationFrames(props)
    const particle = {
      x: frames[0].x,
      y: frames[0].y,
      key: `particle-${this.particleRangeSettings.particleType}-${this.particleIndex}`,
      color: this.getColor(props),
      height: this.getHeight(props),
      image: this.getImage(props),
      ref: null,
      animation: keyframes({
        values: frames,
        duration: this.getDuration(props),
        easings: this.getEasing(props),
        flip: this.getFlip(props)
      })
    }

    // to create a unique particle index we assume there can be no more than max particles
    this.particleIndex = (this.particleIndex + 1) % (this.viewerSettings.MAX_PARTICLES || 999999)
    return particle
  }

  /**
   * @param {object} props any additional properties that affect the animation
   * @returns an array of keyframes
   * @memberof ParticleFactory
   */
  generateAnimationFrames(props) {
    const numberOfFrames = this.getNumberOfAnimationFrames(props)
    let previousFrame = this.generateStartFrame(props)
    const frames = [previousFrame]
    for (let i = 0; i < numberOfFrames - 2; i++) {
      const newFrame = this.generateIntermediateFrame(props, previousFrame)
      frames.push(newFrame)
      previousFrame = newFrame
    }
    frames.push(this.generateEndFrame(props))
    return frames
  }

  /**
   * @returns a random color in the particle setting's color list 
   * @memberof ParticleFactory
   */
  getColor() {
    return getRandomElementFromList(this.particleRangeSettings.colorList)
  }

  /**
   * @param {object} props any additional properties that affect the animation
   * @returns the total duration of the animation which scales based on the intensity, viewer height, and viewer width
   * @memberof ParticleFactory
   */
  getDuration(props = { intensity: 1 }) {
    return this.viewerSettings.height * this.viewerSettings.width * props.intensity / 1000
  }

  /**
   * @returns a function representing easing see https://popmotion.io/api/easing/
   * @memberof ParticleFactory
   */
  getEasing() {
    return this.particleRangeSettings.easing
  }

  /**
   * @returns how many times the particle animation should flip see https://popmotion.io/api/timeline/#timeline-props-flip
   * @memberof ParticleFactory
   */
  getFlip() {
    return this.particleRangeSettings.flip
  }

  /**
   * @returns a height value between the min and max values defined in the particle setting's height range
   * @memberof ParticleFactory
   */
  getHeight() {
    const { min, max } = this.particleRangeSettings.heightRange
    return generateRandomNumberInRange(min, max)
  }

  /**
   * @returns a random image from the particle setting's image list
   * @memberof ParticleFactory
   */
  getImage() {
    return getRandomElementFromList(this.particleRangeSettings.imageList)
  }

  /**
   * @returns the total number of animation frames
   * @memberof ParticleFactory
   */
  getNumberOfAnimationFrames() {
    return 2
  }
  /**
   * @returns an opacity between the values defined in the particle setting's opacity range
   * @memberof ParticleFactory
   */
  getOpacity() {
    const { min, max } = this.particleRangeSettings.opacityRange
    return generateRandomNumberInRange(min, max)
  }

  /**
   * @returns an x origin between the values defined in the particle setting's x origin range
   * @memberof ParticleFactory
   */
  getOriginX() {
    const { min, max } = this.particleRangeSettings.originRangeX
    return generateRandomNumberInRange(min, max)
  }
  /**
   * @returns an y origin between the values defined in the particle setting's y origin range
   * @memberof ParticleFactory
   */
  getOriginY() {
    const { min, max } = this.particleRangeSettings.originRangeY
    return generateRandomNumberInRange(min, max)
  }

  /**
   * @returns a rotation (in degrees) within the range defined by the particle range setting's rotation range
   * @memberof ParticleFactory
   */
  getRotation() {
    const { min, max } = this.particleRangeSettings.rotationRange
    return generateRandomNumberInRange(max, min)
  }

  /**
   * @returns a y rotation (in degrees) within the range defined by the particle range setting's y rotation range
   * @memberof ParticleFactory
   */
  getYRotation() {
    const { min, max } = this.particleRangeSettings.rotationRangeY
    return generateRandomNumberInRange(max, min)
  }

  /**
   * @returns the x value of a random point within the viewer
   * @memberof ParticleFactory
   */
  getXPosition() {
    const { xOffset, width } = this.viewerSettings
    return generateRandomNumberInRange(xOffset + width, xOffset)
  }


  /**
   * @returns the y value of a random point within the viewer
   * @memberof ParticleFactory
   */
  getYPosition() {
    const { height, yOffset } = this.viewerSettings
    return generateRandomNumberInRange(yOffset + height, yOffset)
  }

  /**

   * @param {string} location 'bottom', 'left', 'right', or 'top' - which side of the viewer the location should be on.
   * @returns a location on the side of the viewer designated by the location parameter
   * @memberof ParticleFactory
   */
  generateBoundaryLocation(location) {
    const { height, width, xOffset, yOffset } = this.viewerSettings
    switch (location) {
      case 'bottom':
        return {
          x: generateRandomNumberInRange(xOffset, xOffset + width),
          y: height + yOffset
        }
      case 'left':
        return {
          x: xOffset,
          y: generateRandomNumberInRange(yOffset, height + yOffset)
        }
      case 'right':
        return {
          x: xOffset + height,
          y: generateRandomNumberInRange(yOffset, height + yOffset)
        }
      case 'top':
        return {
          x: generateRandomNumberInRange(xOffset, xOffset + width),
          y: yOffset
        }
      default:
        return {
          x: 0,
          y: 0
        }
    }
  }

  /**
   * @param {object} props any additional properties that affect the animation
   * @param {string} [exitSide='bottom'] the side of the viewer the particle will exit to
   * @returns an animation frame representing the end properties of the animation
   * @memberof ParticleFactory
   */
  generateEndFrame(props, exitSide = 'bottom') {
    const endingPoint = this.generateBoundaryLocation(exitSide)
    return {
      ...endingPoint,
      rotate: this.getRotation(props),
      rotateY: this.getYRotation(props),
      originX: this.getOriginX(props),
      originY: this.getOriginY(props),
      opacity: this.getOpacity(props)
    }
  }

  /**
   * @param {object} props any additional properties that affect the animation
   * @param {string} [enterSide='top'] the side of the viewer the particle will enter from
   * @returns an animation frame representing the start properties of the animation
   * @memberof ParticleFactory
   */
  generateStartFrame(props, enterSide = 'top') {
    const startingPoint = this.generateBoundaryLocation(enterSide)
    return {
      ...startingPoint,
      rotate: this.getRotation(props),
      rotateY: this.getYRotation(props),
      originX: this.getOriginX(props),
      originY: this.getOriginY(props),
      opacity: this.getOpacity(props)
    }
  }

  /**
   * @param {object} props any additional properties that affect the animation
   * @returns an animation frame representing intermediate properties of the animation
   * @memberof ParticleFactory
   */
  generateIntermediateFrame(props) {
    // default particle intermediate positions exist somewhere inside of the viewer
    return {
      x: this.getXPosition(props),
      y: this.getYPosition(props),
      rotate: this.getRotation(props),
      rotateY: this.getYRotation(props),
      originX: this.getOriginX(props),
      originY: this.getOriginY(props),
      opacity: this.getOpacity(props)
    }
  }
}
export default ParticleFactory