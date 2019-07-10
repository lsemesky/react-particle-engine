import { easing, tween } from 'popmotion'
import { generateRandomNumberInRange, getRandomElementFromList } from '../../utils/randomUtils'
class ParticleFactory {
  constructor(viewerSettings,
    {
      heightRange = { min: 10, max: 20 },
      colorList = ['black'],
      easing,
      imageList = [],
      opacityRangeEnd = { min: 1, max: 1 },
      opacityRangeStart = { min: 1, max: 1 },
      originRangeX = { min: 0, max: 0 },
      originRangeY = { min: 0, max: 0 },
      particleType = 'default',
      rotationRangeEnd = { min: 0, max: 0 },
      rotationRangeStart = { min: 0, max: 0 },
      rotationRangeYEnd = { min: 0, max: 0 },
      rotationRangeYStart = { min: 0, max: 0 },
      flip = 0,
    }) {

    this.colorList = colorList
    this.easing = easing
    this.flip = flip
    this.heightRange = heightRange
    this.imageList = imageList
    this.opacityRangeEnd = opacityRangeEnd
    this.opacityRangeStart = opacityRangeStart
    this.originRangeX = originRangeX
    this.originRangeY = originRangeY
    this.particleType = particleType
    this.particleIndex = 0
    this.rotationRangeEnd = rotationRangeEnd
    this.rotationRangeStart = rotationRangeStart
    this.rotationRangeYEnd = rotationRangeYEnd
    this.rotationRangeYStart = rotationRangeYStart
    this.viewerSettings = viewerSettings
  }
  generateParticle(intensity) {
    this.intensity = intensity
    //particleSettings
    this.startX = this.getXStartPosition()
    this.startY = this.getYStartPosition()
    this.endX = this.getXEndPosition()
    this.endY = this.getYEndPosition()
    this.color = this.getColor()
    this.height = this.getHeight()
    this.image = this.getImage()
    this.opacityStart = this.getOpacityStart()
    this.opacityEnd = this.getOpacityEnd()
    this.originX = this.getOriginX()
    this.originY = this.getOriginY()
    this.rotateStart = this.getRotationStart()
    this.rotateEnd = this.getRotationEnd()
    this.rotateYStart = this.getYRotationStart()
    this.rotateYEnd = this.getYRotationEnd()
    this.duration = this.getDuration()
    this.particleEasing = this.getEasing()
    this.particleFlip = this.getFlip()

    const particle = {
      x: this.startX,
      y: this.startY,
      key: `particle-${this.particleType}-${this.particleIndex}`,
      color: this.color,
      height: this.height,
      image: this.image,
      ref: null,
      tween: this.generateTween()
    }
    this.particleIndex = this.particleIndex + 1 % 9999999
    return particle
  }
  generateTween() {
    const tweenParams = {
      from: {
        x: this.startX,
        y: this.startY,
        rotate: this.rotateStart,
        rotateY: this.rotateYStart,
        originX: this.originX,
        originY: this.originY,
        opacity: this.opacityStart,
      },
      to: {
        x: this.endX,
        y: this.endY,
        rotate: this.rotateEnd,
        rotateY: this.rotateYEnd,
        originX: this.originX,
        originY: this.originY,
        opacity: this.opacityEnd,
      },
      duration: this.duration,
      easing: this.particleEasing,
      flip: this.particleFlip
    }
    return tween(tweenParams)
  }
  getColor() {
    return getRandomElementFromList(this.colorList)
  }
  getDuration() {
    return this.viewerSettings.height * this.intensity * 2
  }
  getEasing() {
    return (this.easing || easing.linear)
  }
  getFlip() {
    return this.flip
  }
  getHeight() {
    const { min, max } = this.heightRange
    return generateRandomNumberInRange(min, max)
  }

  getImage() {
    return getRandomElementFromList(this.imageList)
  }
  getOpacityEnd() {
    const { min, max } = this.opacityRangeEnd
    return generateRandomNumberInRange(min, max)
  }
  getOpacityStart() {
    const { min, max } = this.opacityRangeStart
    return generateRandomNumberInRange(min, max)
  }
  getOriginX() {
    const { min, max } = this.originRangeX
    return generateRandomNumberInRange(min, max)
  }
  getOriginY() {
    const { min, max } = this.originRangeY
    return generateRandomNumberInRange(min, max)
  }
  getRotationEnd() {
    const { min, max } = this.rotationRangeEnd
    return generateRandomNumberInRange(max, min)
  }
  getRotationStart() {
    const { min, max } = this.rotationRangeStart
    return generateRandomNumberInRange(max, min)
  }
  getYRotationEnd() {
    const { min, max } = this.rotationRangeYEnd
    return generateRandomNumberInRange(max, min)
  }
  getYRotationStart() {
    const { min, max } = this.rotationRangeYStart
    return generateRandomNumberInRange(max, min)
  }
  // The default particle travels the height of the viewer panel
  getXStartPosition() {
    const { xOffset, width } = this.viewerSettings
    return generateRandomNumberInRange(xOffset + width, xOffset)
  }
  getXEndPosition() {
    const { xOffset, width } = this.viewerSettings
    return generateRandomNumberInRange(xOffset + width, xOffset)
  }
  getYStartPosition() {
    const { yOffset } = this.viewerSettings
    return yOffset
  }
  getYEndPosition() {
    const { yOffset, height } = this.viewerSettings
    return yOffset + height
  }
}
export default ParticleFactory