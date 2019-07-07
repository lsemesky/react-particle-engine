import { generateRandomNumberInRange, getRandomElementFromList } from '../utils/randomUtils'
import particleTypeSettings from '../ParticleTypeSettings'

const getParticleTypeSetting = (particleType, settingName) => {
  const particleTypeSetting = particleTypeSettings[particleType] || particleTypeSettings.DEFAULT
  return particleTypeSetting[settingName]
}

const getYStartPosition = (particleType, viewerHeight, viewerYOffset) => {
  const yStartPositionFunction = getParticleTypeSetting(particleType, 'yStartPositionFunction')
  return yStartPositionFunction(viewerHeight, viewerYOffset)
}

const getYEndPosition = (particleType, startYPosition, viewerHeight, viewerYOffset) => {
  const yEndPositionFunction = getParticleTypeSetting(particleType, 'yEndPositionFunction')
  return yEndPositionFunction(startYPosition, viewerHeight, viewerYOffset)
}

const getXStartPosition = (particleType, viewerWidth, viewerXOffset) => {
  const xStartPositionFunction = getParticleTypeSetting(particleType, 'xStartPositionFunction')
  return xStartPositionFunction(viewerWidth, viewerXOffset)
}

const getXEndPosition = (particleType, startXPosition, viewerWidth, viewerXOffset) => {
  const xEndPositionFunction = getParticleTypeSetting(particleType, 'xEndPositionFunction')
  return xEndPositionFunction(startXPosition, viewerWidth, viewerXOffset)
}

const getRandomColor = (particleType) => {
  const colorList = getParticleTypeSetting(particleType, 'colorList')
  return getRandomElementFromList(colorList)
}

const getRandomImage = (particleType) => {
  const imageList = getParticleTypeSetting(particleType, 'imageList')
  return getRandomElementFromList(imageList)
}

const getRandomRotation = (particleType, intensity) => {
  const { calculateMin, calculateMax } = getParticleTypeSetting(particleType, 'rotation')
  return generateRandomNumberInRange(calculateMax(intensity), calculateMin(intensity))
}

const getRandomYRotation = (particleType, intensity) => {
  const { calculateMin, calculateMax } = getParticleTypeSetting(particleType, 'yRotation')
  return generateRandomNumberInRange(calculateMax(intensity), calculateMin(intensity))
}

const getRandomDuration = (particleType, intensity, xDistance, yDistance) => {
  const { calculateMin, calculateMax } = getParticleTypeSetting(particleType, 'durationMultiplier')
  const distance = Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2))
  return distance * generateRandomNumberInRange(calculateMax(intensity), calculateMin(intensity))

}
const getRandomHeight = (particleType) => {
  const { minHeight, maxHeight } = getParticleTypeSetting(particleType, 'sizeRange')
  return generateRandomNumberInRange(maxHeight, minHeight)
}

const getRandomOriginX = (particleType, intensity, width) => {
  const originXPositionFunction = getParticleTypeSetting(particleType, 'originX')
  return originXPositionFunction(intensity, width)
}

const getRandomOriginY = (particleType, intensity, height) => {
  const originYPositionFunction = getParticleTypeSetting(particleType, 'originY')
  return originYPositionFunction(intensity, height)
}

const getParticleFlip = (particleType) => {
  return getParticleTypeSetting(particleType, 'flip')
}

export {
  getParticleFlip,
  getRandomColor,
  getRandomDuration,
  getRandomElementFromList,
  getRandomHeight,
  getRandomImage,
  getRandomOriginX,
  getRandomOriginY,
  getRandomRotation,
  getRandomYRotation,
  getXEndPosition,
  getXStartPosition,
  getYEndPosition,
  getYStartPosition,
}


