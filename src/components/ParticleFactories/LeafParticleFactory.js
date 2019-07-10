import { Leaf1, Leaf10, Leaf11, Leaf12, Leaf13, Leaf14, Leaf15, Leaf16, Leaf2, Leaf3, Leaf4, Leaf5, Leaf6, Leaf7, Leaf8, Leaf9 } from '../../svg/leaves'
import ParticleFactory from './ParticleFactory'
import { generateRandomNumberInRange } from '../../utils/randomUtils'

const colorList = ['Goldenrod', 'DarkGoldenrod', 'Peru', 'Chocolate', 'SaddleBrown', 'Sienna', 'Brown', 'Maroon', 'Olive', 'Darkred', 'Firebrick', 'Gold']
const imageList = [Leaf1, Leaf2, Leaf3, Leaf4, Leaf5, Leaf6, Leaf7, Leaf8, Leaf9, Leaf10, Leaf11, Leaf12, Leaf13, Leaf14, Leaf15, Leaf16]
const particleSettings = {
  heightRange: { min: 25, max: 30 },
  colorList: colorList,
  imageList: imageList,
  opacityRangeEnd: { min: 1, max: 1 },
  opacityRangeStart: { min: 1, max: 1 },
  particleType: 'leaf',
  rotationRangeStart: { min: 0, max: 0 },
  rotationRangeYStart: { min: 0, max: 0 },
  flip: 0
}
class LeafParticleFactory extends ParticleFactory {
  constructor(viewerSettings) {
    super(viewerSettings, particleSettings)
  }

  getOriginX() {
    return generateRandomNumberInRange(this.intensity) / this.intensity
  }
  getOriginY() {
    return generateRandomNumberInRange(this.intensity) / this.intensity
  }

  getRotationStart() {
    return generateRandomNumberInRange(-500 + this.intensity * 4, 500 - this.intensity * 4)
  }
  getYRotationEnd() {
    return generateRandomNumberInRange(-500 + this.intensity * 4, 500 - this.intensity * 4)
  }
  getYRotationStart() {
    return generateRandomNumberInRange(-500 + this.intensity * 4, 500 - this.intensity * 4)
  }
}


export default LeafParticleFactory