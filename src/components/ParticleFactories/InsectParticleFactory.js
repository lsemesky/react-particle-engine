import { Insect1, Insect2, Insect3 } from '../../svg/insects'
import { calc, keyframes } from 'popmotion'
import ParticleFactory from './ParticleFactory'
import { generateRandomNumberInRange } from '../../utils/randomUtils'

const colorList = ['Black', '#261d1d', '#330505', '#302828']
const imageList = [Insect1, Insect2, Insect3]
const particleSettings = {
  heightRange: { min: 10, max: 50 },
  colorList: colorList,
  imageList: imageList,
  opacityRangeEnd: { min: 1, max: 1 },
  opacityRangeStart: { min: 1, max: 1 },
  particleType: 'insect',
  rotationRangeStart: { min: 0, max: 0 },
  rotationRangeYStart: { min: 0, max: 45 },
  flip: 0
}
class InsectParticleFactory extends ParticleFactory {
  constructor(viewerSettings) {
    super(viewerSettings, particleSettings)
  }
  generateParticle(intensity) {
    // the side the particle enters from
    // 1= left, 2=top, 3=right, 4=bottom
    this.enterSide = generateRandomNumberInRange(4, 1)
    // the side the particle leaves from
    // 1= left, 2=top, 3=right, 4=bottom
    this.exitSide = generateRandomNumberInRange(4, 1)
    return super.generateParticle(intensity)
  }

  generateRotationFrame(frame1, frame2) {
    const frame = {
      x: frame1.x,
      y: frame1.y,
      rotate: frame2.rotate,
      opacity: 1
    }
    return frame
  }
  generateMovementFrame(targetX = this.getXInRange(), targetY = this.getYInRange()) {
    const frame = {
      x: targetX,
      y: targetY,
      opacity: 1
    }
    return frame
  }

  generateTween() {
    const keyframeValues = []
    const firstFrame = this.generateMovementFrame(this.endX, this.endY)
    firstFrame.rotate = 0
    let currentMovementFrame = firstFrame
    const maxI = generateRandomNumberInRange(1, 4)
    for (let i = 0; i <= maxI; i++) {
      //if last frame
      const nextMovementFrame = i === maxI ?
        this.generateMovementFrame(this.endX, this.endY) : this.generateMovementFrame()
      nextMovementFrame.rotate = 90 + calc.angle(
        { x: currentMovementFrame.x, y: currentMovementFrame.y },
        { x: nextMovementFrame.x, y: nextMovementFrame.y }
      )
      const rotationFrame = this.generateRotationFrame(currentMovementFrame, nextMovementFrame)
      keyframeValues.push(rotationFrame, nextMovementFrame)
      currentMovementFrame = nextMovementFrame
    }

    this.setTotalDistance(keyframeValues)
    console.log(this.totalDistance)

    return keyframes({
      values: keyframeValues,
      duration: this.getDuration(),
      easings: (p) => .5 * (Math.pow(2 * p - 1, 3) + 1)
    }).pipe((props) => {
      const rotation = props.rotate
      let newRotation = (rotation - 90) % 360
      //make sure particle is rotating least possible distance
      return { rotate: newRotation, ...props }
    })
  }
  setTotalDistance(frames) {
    const accumulatedDistance = frames.reduce(
      (accumulator, frame) => {
        const distance = calc.distance(
          { x: accumulator.previousFrame.x, y: accumulator.previousFrame.y },
          { x: frame.x, y: frame.y }
        )
        return { distance: accumulator.distance + distance, previousFrame: frame }
      }
      , { distance: 0, previousFrame: frames[0] })
    this.totalDistance = accumulatedDistance.distance
  }
  getDuration() {
    return this.totalDistance * this.intensity * this.viewerSettings.height * this.viewerSettings.width /
      generateRandomNumberInRange(600000, 600000)
  }

  getOriginX() {
    return this.image.width / 2
  }
  getOriginY() {
    return this.image.height / 2
  }
  // getYRotationEnd() {
  //  // return generateRandomNumberInRange(180)
  // }
  // getYRotationStart() {
  //  // return generateRandomNumberInRange(180)
  // }
  getXStartPosition() {
    const { xOffset, width } = this.viewerSettings
    switch (this.enterSide) {
      // left side
      case 1: return 0
      // top side
      case 2: return generateRandomNumberInRange(width + xOffset)
      // right side
      case 3: return (xOffset + width)
      // bottom side
      case 4: return generateRandomNumberInRange(width + xOffset)
    }
  }
  getXEndPosition() {
    const { xOffset, width } = this.viewerSettings
    switch (this.exitSide) {
      // left side
      case 1: return 0
      // top side
      case 2: return generateRandomNumberInRange(width + xOffset)
      // right side
      case 3: return (xOffset + width)
      // bottom side
      case 4: return generateRandomNumberInRange(width + xOffset)
    }
  }
  getXInRange() {
    const { xOffset, width } = this.viewerSettings
    return generateRandomNumberInRange(xOffset + width, xOffset)
  }
  getYInRange() {
    const { yOffset, height } = this.viewerSettings
    return generateRandomNumberInRange(yOffset + height, yOffset)
  }
  getYStartPosition() {
    const { yOffset, height } = this.viewerSettings
    switch (this.enterSide) {
      // left side
      case 1: return generateRandomNumberInRange(height + yOffset)
      // top side
      case 2: return 0
      // right side
      case 3: return generateRandomNumberInRange(height + yOffset)
      // bottom side
      case 4: return height + yOffset
    }
  }
  getYEndPosition() {
    const { yOffset, height } = this.viewerSettings
    switch (this.exitSide) {
      // left side
      case 1: return generateRandomNumberInRange(height + yOffset)
      // top side
      case 2: return 0
      // right side
      case 3: return generateRandomNumberInRange(height + yOffset)
      // bottom side
      case 4: return height + yOffset
    }
  }
}

export default InsectParticleFactory