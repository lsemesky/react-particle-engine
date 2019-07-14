import ParticleFactory from './ParticleFactory'
import { generateRandomNumberInRange } from '../../utils/randomUtils'
import { leafImageArray } from '../../svg/leaves'

const colorList = ['Goldenrod', 'DarkGoldenrod', 'Peru', 'Chocolate', 'SaddleBrown', 'Sienna', 'Brown', 'Maroon', 'Olive', 'Darkred', 'Firebrick', 'Gold']
const imageList = leafImageArray
const particleRangeSettings = {
  heightRange: { min: 25, max: 30 },
  colorList: colorList,
  imageList: imageList,
  opacityRange: { min: 1, max: 1 },
  particleType: 'leaf',
  rotationRange: { min: 0, max: 0 },
  rotationRangeY: { min: 0, max: 0 },
  flip: 0
}
/**
 * A factory for creating leaf particles
 * @class LeafParticleFactory
 * @extends {ParticleFactory}
 */
class LeafParticleFactory extends ParticleFactory {
  constructor(viewerSettings) {
    super(viewerSettings, particleRangeSettings)
  }

  /**
   * @override
   * @param {object} { intensity } the intensity of the animation
   * @returns a number representing the x origin of the leaf particle proportional to the intensity
   * @memberof LeafParticleFactory
   */
  getOriginX({ intensity }) {
    return generateRandomNumberInRange(intensity) / intensity
  }

  /**
   * @override
   * @param {object} { intensity } the intensity of the animation
   * @returns a number representing the y origin of the leaf particle proportional to the intensity
   * @memberof LeafParticleFactory
   */
  getOriginY({ intensity }) {
    return generateRandomNumberInRange(intensity) / intensity
  }

  /**
   * @override
   * @param {object} { intensity } the intensity of the animation
   * @returns a number representing the rotation of the particle (in degrees) proportional to the intensity
   * @memberof LeafParticleFactory
   */
  getRotation({ intensity }) {
    return generateRandomNumberInRange(-500 + intensity * 4, 500 - intensity * 4)
  }

  /**
   * @override
   * @param {object} { intensity } the intensity of the animation
   * @returns a number representing the rotation of the particle (in degrees) proportional to the intensity
   * @memberof LeafParticleFactory
   */
  getYRotation({ intensity }) {
    return generateRandomNumberInRange(-500 + intensity * 4, 500 - intensity * 4)
  }
}


export default LeafParticleFactory