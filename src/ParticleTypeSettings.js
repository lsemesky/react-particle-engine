/* eslint-disable no-unused-vars */

import { Leaf1, Leaf10, Leaf11, Leaf12, Leaf13, Leaf14, Leaf15, Leaf16, Leaf2, Leaf3, Leaf4, Leaf5, Leaf6, Leaf7, Leaf8, Leaf9 } from './svg/leaves'
import { Insect1, //Insect2, Insect3, Insect4, Insect5, Insect6, Insect7, Insect8, Insect9, Insect10, Insect11, Insect12, Insect13, Insect14, Insect15, Insect16 
} from './svg/insects'
import { generateRandomNumberInRange } from './utils/randomUtils'

const ParticleTypeSettings = {
  LEAF: {
    colorList: ['Goldenrod', 'DarkGoldenrod', 'Peru', 'Chocolate', 'SaddleBrown', 'Sienna', 'Brown', 'Maroon', 'Olive', 'Darkred', 'Firebrick', 'Gold'],
    imageList: [Leaf1, Leaf2, Leaf3, Leaf4, Leaf5, Leaf6, Leaf7, Leaf8, Leaf9, Leaf10, Leaf11, Leaf12, Leaf13, Leaf14, Leaf15, Leaf16],
    sizeRange: {
      ratio: 1,
      minHeight: 20,
      maxHeight: 35,
    },
    rotation: {
      calculateMin: (intensity)=>500-intensity*4,
      calculateMax: (intensity)=>-500+intensity*4,
    },
    yRotation: {
      calculateMin: (intensity)=>500-intensity*4,
      calculateMax: (intensity)=>-500+intensity*4,
    },
    xStartPositionFunction: (viewerWidth, viewerXOffset) => generateRandomNumberInRange(viewerXOffset, viewerWidth),
    xEndPositionFunction: (startXPosition, viewerWidth, viewerXOffset) => startXPosition,
    yStartPositionFunction: (viewerHeight, viewerYOffset) => viewerYOffset,
    yEndPositionFunction: (startYPosition, viewerHeight, viewerYOffset) => viewerHeight + viewerYOffset,
    flip: 0
  },
  DEFAULT: {
    colorList: ['Black'],
    imageList: [Leaf4],
    sizeRange: {
      ratio: 1,
      minHeight: 10,
      maxHeight: 15,
    },
    rotation: {
      calculateMin: ()=>0,
      calculateMax: ()=>0,
    },
    yRotation: {
      calculateMin: ()=>0,
      calculateMax: ()=>0,
    },
    xStartPositionFunction: (viewerWidth, viewerXOffset) => generateRandomNumberInRange(viewerXOffset, viewerWidth + viewerXOffset),
    xEndPositionFunction: (startXPosition, viewerWidth, viewerXOffset) => generateRandomNumberInRange(viewerXOffset, viewerWidth + viewerXOffset),
    yStartPositionFunction: (viewerHeight, viewerYOffset) => viewerYOffset,
    yEndPositionFunction: (startYPosition, viewerHeight, viewerYOffset) => startYPosition,
    flip: 0
  },
  INSECT: {
    colorList: ['Black','Grey'],
    imageList: [Insect1],
    sizeRange: {
      ratio: 1,
      minHeight: 10,
      maxHeight: 15,
    },
    rotation: {
      calculateMin: (intensity)=>intensity * 0,
      calculateMax: (intensity)=>intensity,
    },
    yRotation: {
      calculateMin: (intensity)=> intensity * 0,
      calculateMax: (intensity)=> intensity,
    },
    xStartPositionFunction: (viewerWidth, viewerXOffset) => viewerXOffset,
    xEndPositionFunction: (xStartPosition, viewerWidth, viewerXOffset) => viewerXOffset + viewerWidth,
    yStartPositionFunction: (viewerHeight, viewerYOffset) => generateRandomNumberInRange(viewerYOffset, viewerHeight + viewerYOffset),
    yEndPositionFunction: (yStartPosition, viewerHeight, viewerYOffset) => yStartPosition,
    flip: Infinity
  }
}
export default ParticleTypeSettings